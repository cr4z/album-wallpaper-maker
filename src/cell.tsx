import React, { useState } from "react";

type Props = {};
export default function Cell({}: Props) {
  const [src, setSrc] = useState<string>(`https://picsum.photos/seed/${Math.random()}/1000`);

  return (
    <div className={"cell"} onClick={() => {}}>
      {src && <img src={src} alt="random pic" />}
    </div>
  );
}
