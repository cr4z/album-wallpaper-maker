import React from "react";
import Cell from "./cell";

type IProps = { cols: number; rows: number };
export default function Grid({ cols, rows }: IProps) {
  // JSX.Element[] is an anti-pattern, so this instead:
  const cells = Array.from({ length: cols * rows }, (v, i) => i);

  const gridStyle = {
    gridTemplateColumns: `repeat(${cols}, auto)`,
  };

  return (
    <div className="grid" style={gridStyle}>
      {cells.map(i => (
        <Cell key={i} />
      ))}
    </div>
  );
}
