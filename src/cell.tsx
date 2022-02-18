import React, { useContext, useState } from "react";
import { IModalContext, ModalContext } from "./context";

type Props = {};
export default function Cell({}: Props) {
  const context: IModalContext = useContext(ModalContext);
  const [src, setSrc] = useState<string>(`https://picsum.photos/seed/${Math.random()}/1000`);

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
