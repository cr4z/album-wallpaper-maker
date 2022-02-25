import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getImgSrcArrayFromInput } from "./itunes";
import Paginator from "./paginator";

// import react-modal
import Modal from "react-modal";
Modal.setAppElement(":root");

const itemsPerPage = 6;

interface Props {
  modalOpen: boolean;
  onRequestClose: () => void;
  onSrcSelected: (src: string) => void;
}
export default function AlbumPickerModal({ modalOpen, onRequestClose, onSrcSelected }: Props) {
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
      isOpen={modalOpen}
      onRequestClose={() => onRequestClose()}
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
          maxWidth: "50vh",
        },
      }}
    >
      <h2>Add an album</h2>
      <div className="input-container mt">
        <input
          placeholder="Search for an artist or album..."
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              requestNewSearch(searchInput);
            }
          }}
        />
      </div>

      <div className="mt">{tags}</div>

      <div className="album-container noselect">
        <Paginator page={page} itemsPerPage={itemsPerPage}>
          {albumSrcs.map((src, i) => (
            <div
              key={i}
              className="album"
              onClick={() => {
                onSrcSelected(src);
                onRequestClose();
              }}
            >
              <img src={src}></img>
            </div>
          ))}
        </Paginator>
      </div>

      <div className="controller align-items-center">
        <button className="button-19" disabled={page <= 1} onClick={() => changePageBy(-1)}>
          👈
        </button>
        <div className="page-display noselect">{page}</div>
        <button
          className="button-19"
          disabled={page > albumSrcs.length / itemsPerPage}
          onClick={() => changePageBy(1)}
        >
          👉
        </button>
      </div>
      <div className="mt">
        <button
          className="button-19"
          color="primary"
          onClick={async () => {
            requestNewSearch(searchInput);
          }}
        >
          Search
        </button>
      </div>
    </Modal>
  );
}
