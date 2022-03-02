import Image from "next/image";
import React, { useRef, useState } from "react";
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
  const [tags, setTags] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [albumSrcs, setAlbumSrcs] = useState<string[]>([]);

  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);

  const changePageBy = (x: number) => {
    setPage(page + x);
  };

  const requestNewSearch = async (search: string) => {
    if (!tags.includes(search) && tags.length < 8) {
      setTags(tags => [...tags, search]);
    }

    // set Paginator page to 1
    setPage(1);

    const encodedSearch = encodeURIComponent(search);

    // get image srcs
    const res = await fetch(`/api/imgSrcs/?search=${encodedSearch}`);

    const imgSrcs: string[] = await res.json();

    // update results
    setAlbumSrcs(imgSrcs);
  };

  function removeTag(tag: string) {
    const _tags = Array.from(tags);
    const i = _tags.indexOf(tag);
    _tags.splice(i, 1);
    setTags(_tags);
  }

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
          value={searchInput}
          placeholder="Search for an artist or album..."
          onChange={e => setSearchInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              searchButtonRef.current?.click();
            }
          }}
        />
      </div>

      <ul className="mt tags-container">
        {tags.map((tagText, i) => {
          return (
            <li className="tag" key={i}>
              <span
                className="tag-text"
                onClick={() => {
                  setSearchInput(tagText);
                  requestNewSearch(tagText);
                }}
              >
                {tagText}
              </span>
              <span onClick={() => removeTag(tagText)}>❌</span>
            </li>
          );
        })}
      </ul>

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
          ref={searchButtonRef}
          disabled={searchInput === "" || searchInput.length > 30}
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
