import React, { useRef } from "react";

type Props = { setCols: Function; setRows: Function; setFeedback: Function };
export default function Controller({ setRows, setCols, setFeedback }: Props) {
  const rowsInput = useRef<HTMLInputElement>(null);
  const colsInput = useRef<HTMLInputElement>(null);

  return (
    <div className="controller">
      <span>
        <label>Rows</label>
        <input ref={rowsInput} />
      </span>
      <span>
        <label>Columns</label>
        <input ref={colsInput} />
      </span>
      <button
        onClick={() => {
          // check for validity
          const rows = rowsInput.current?.value;
          const cols = colsInput.current?.value;

          if (!rows) {
            setFeedback("No input given in rows");
            return;
          }
          if (!cols) {
            setFeedback("No input given in columns");
            return;
          }
          if (isNaN(+rows)) {
            setFeedback("Input rows is not a valid number");
            return;
          }
          if (isNaN(+cols)) {
            setFeedback("Input columns is not a valid number");
            return;
          }
          if (+rows * +cols > 60) {
            setFeedback("Can't exceed 60 total cells");
            return;
          }
          if (+rows * +cols <= 1) {
            setFeedback("Needs more than 1 total cell to operate");
            return;
          }
          // execute
          console.log("asdf")
          setFeedback("");
          setRows(+rows);
          setCols(+cols);
        }}
      >
        SET!
      </button>
    </div>
  );
}
