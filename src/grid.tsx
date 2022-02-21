import React, { useEffect, useState } from "react";
import Cell from "./cell";

type IProps = { cols: number; rows: number };
export default function Grid({ cols, rows }: IProps) {
  // JSX.Element[] is an anti-pattern, so this instead:
  const [srcs, setSrcs] = useState<string[]>([]);

  useEffect(() => {
    //* init srcs on render

    const _srcs: string[] = [];
    for (let i = 0; i < cols * rows; i++) {
      _srcs.push(`https://picsum.photos/seed/${Math.random()}/1000`);
    }

    setSrcs(_srcs);
  }, []);

  const gridStyle = {
    gridTemplateColumns: `repeat(${cols}, auto)`,
  };

  return (
    <div className="grid" style={gridStyle}>
      {/* {cells.map(i => (
        <Cell key={i} initSrc={} />
      ))} */}
    </div>
  );
}

// ``
