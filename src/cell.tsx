import React, { useContext, useState } from "react";
import { IModalContext, ModalContext } from "./context";

type Props = {
  initSrc: string;
};
export default function Cell({ initSrc }: Props) {
  const context: IModalContext = useContext(ModalContext);
  const [src, setSrc] = useState<string>(initSrc);

  function myCallback(_src: string) {
    setSrc(_src);
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
