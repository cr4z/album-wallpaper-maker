import React, { CSSProperties, useEffect, useRef, useState } from "react";

type Props = { onNewCols: (x: number) => void; onNewRows: (x: number) => void };
export default function Controller({ onNewCols, onNewRows }: Props) {
  const rowsInput = useRef<HTMLInputElement>(null);
  const colsInput = useRef<HTMLInputElement>(null);

  const [feedback, setFeedback] = useState<string>("");
  const [feedbackStatus, setFeedbackStatus] = useState<boolean>(false);
  const [feedbackStyle, setFeedbackStyle] = useState<CSSProperties>({});

  useEffect(() => {
    if (feedbackStatus) {
      setFeedbackStyle({ top: "70px", opacity: 1 });
    } else {
      setFeedbackStyle({ top: "0", opacity: 0 });
    }
  }, [feedbackStatus]);

  return (
    <div className="controller-container">
      <div className="controller">
        <div className="controller-item">
          <div className="input-container">
            <label>Rows</label>
            <input ref={rowsInput} type="text" />
          </div>
        </div>
        <div className="controller-item">
          <div className="input-container">
            <label>Columns</label>
            <input ref={colsInput} type="text" />
          </div>
        </div>
        <div className="controller-item">
          <button
            className="button-19"
            onClick={() => {
              // check for validity
              const rows = rowsInput.current?.value;
              const cols = colsInput.current?.value;

              setFeedbackStatus(true);

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
              console.log("asdf");
              setFeedbackStatus(false);
              onNewRows(+rows);
              onNewCols(+cols);
            }}
          >
            SET!
          </button>
        </div>
      </div>

      <div className="feedback" style={feedbackStyle ? feedbackStyle : {}}>
        {feedback}
      </div>
    </div>
  );
}
