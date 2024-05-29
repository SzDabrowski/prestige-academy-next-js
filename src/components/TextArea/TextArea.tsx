import { useEffect, useRef, useState } from "react";

import useAutosizeTextArea from "./useAutosizeTextArea";

import styles from "./TextArea.module.scss";

interface iTextArea {
  getValue: (value: string) => string;
  resetTextArea: boolean;
}

export default function TextArea(props: iTextArea) {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  useEffect(() => {
    // Reset text area value when resetTextArea prop changes
    if (props.resetTextArea) {
      setValue("");
    }
  }, [props.resetTextArea]);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
    props.getValue(val);
  };

  return (
    <div className={styles.textArea}>
      <textarea
        id="review-text"
        onChange={handleChange}
        placeholder="Napisz wiadomość..."
        ref={textAreaRef}
        rows={1}
        value={value}
      />
    </div>
  );
}
