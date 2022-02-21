import React, { useContext, useState } from "react";
import { IModalContext, ModalContext } from "./context";

type Props = {
  initSrc: string;
  onSrcChange: (src: string) => void;
};
export default function Cell({ initSrc, onSrcChange }: Props) {
  const context: IModalContext = useContext(ModalContext);
  const [src, setSrc] = useState<string>(initSrc);

  function myCallback(newSrc: string) {
    onSrcChange(newSrc);
    setSrc(newSrc);
  }

  return (
    <div
      className={"cell"}
      onClick={() => {
        context.openModal();
        context.setCallback(myCallback);
      }}
    >
      {src && <img src={src} alt="random pic" />}
    </div>
  );
}
