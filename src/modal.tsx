import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getImgSrcArrayFromInput } from "./helpers";
import Paginator from "./paginator";

// import react-modal
import Modal from "react-modal";
Modal.setAppElement(":root");

interface Props {
  showModal: boolean;
  setShowModal: any;
  onAlbumSelectedCb: Function;
}
export default function AlbumPickerModal({ showModal, setShowModal, onAlbumSelectedCb }: Props) {
  const [searchInput, setSearchInput] = useState<string>("");
  const [tags, setTags] = useState<JSX.Element[]>([]);
  const [page, setPage] = useState<number>(1);
  const [albumSrcs, setAlbumSrcs] = useState<string[]>([]);

  const changePageBy = (x: number) => {
    setPage(page + x);
  };

  const requestNewSearch = async (input: string) => {
    // add tag from user input
    const newTag = (
      <span className="tag" key={tags.length}>
        <span className="tag-text" onClick={() => console.log("ontagsearch")}>
          {input}
        </span>
        <span onClick={() => console.log("deletetag")}>❌</span>
      </span>
    );
    setTags(tags => [...tags, newTag]);

    // set Paginator page to 1
    setPage(1);

    // get image srcs
    const imgSrcs = await getImgSrcArrayFromInput(input);

    // update results
    setAlbumSrcs(imgSrcs);
  };

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      style={{
        overlay: { zIndex: 1000, backgroundColor: "#0005" },
        content: {
          border: "0",
          bottom: "auto",
          height: "auto",
          left: "50%",
          top: "50%", // start from center
          transform: "translate(-50%,-50%)", // adjust top "up" based on height
          width: "90%",
          maxWidth: "90vh",
        },
      }}
    >
      <h1>Add an album</h1>
      <hr />
      <input
        placeholder="Search for an artist or album..."
        onChange={e => setSearchInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            requestNewSearch(searchInput);
          }
        }}
      />
      {tags}

      <div className="album-container">
        <Paginator page={page} itemsPerPage={6}>
          {albumSrcs.map((src, i) => (
            <div key={i} className="album" onClick={() => onAlbumSelectedCb(src)}>
              <img src={src}></img>
            </div>
          ))}
        </Paginator>
      </div>

      <div>
        <button disabled={page <= 1} onClick={() => changePageBy(-1)}>
          👈
        </button>
        {page}
        <button onClick={() => changePageBy(1)}>👉</button>
      </div>
      <hr />
      <button
        color="primary"
        onClick={async () => {
          requestNewSearch(searchInput);
        }}
      >
        Search
      </button>
    </Modal>
  );
}
