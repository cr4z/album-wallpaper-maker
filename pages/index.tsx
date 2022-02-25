import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { downloadCanvas, generateCanvas } from "../src/canvas";
import Controls from "../src/controls";
import AlbumPickerModal from "../src/modal";

const Home: NextPage = () => {
  const [srcs, setSrcs] = useState<string[]>(
    Array.from({ length: 60 }, () => `https://picsum.photos/seed/${Math.random()}/1000`)
  );
  const [cols, setCols] = useState<number>(3);
  const [rows, setRows] = useState<number>(6);

  const [feedback, setFeedback] = useState<string>("");
  const [downloadInProgress, setDownloadInProgress] = useState<boolean>();

  const columnStyle = {
    gridTemplateColumns: `repeat(${cols}, auto)`,
  };

  function openModal(i: number) {
    setTargetCell(i);
    setModalOpen(true);
  }
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [targetCell, setTargetCell] = useState<number>(0);

  return (
    <>
      <AlbumPickerModal
        modalOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        onSrcSelected={(src: string) => {
          const _srcs = Array.from(srcs);
          _srcs[targetCell] = src;
          setSrcs(_srcs);
        }}
      />

      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Album Wallpaper Maker</h1>
        <p className="description">
          Ever wanted to make a personalized collage of albums for your wallpaper? Now you can.
        </p>

        <Controls onNewCols={(x: number) => setCols(x)} onNewRows={(x: number) => setRows(x)} />

        <div className="grid" style={columnStyle}>
          {srcs.slice(0, rows * cols).map((src, i) => (
            <>
              <div
                className={"cell"}
                onClick={() => {
                  openModal(i);
                }}
              >
                {src && <img src={src} alt="random pic" />}
              </div>
            </>
          ))}
        </div>

        <div className="download-btn">
          <button
            disabled={downloadInProgress}
            onClick={async () => {
              setDownloadInProgress(true);
              const canvas = await generateCanvas(srcs, cols, rows, feedback => {
                setFeedback(feedback);
              });
              downloadCanvas(
                canvas,
                feedback => {
                  setFeedback(feedback);
                },
                () => {
                  setDownloadInProgress(false);
                  setFeedback("Download complete! Enjoy :)");
                  setInterval(() => setFeedback(""), 3000);
                }
              );
            }}
            className="button-19"
          >
            download
          </button>
        </div>

        <span className="dl-feedback-container">
          <span className="dl-feedback">{feedback}</span>
          {downloadInProgress && (
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
        </span>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
