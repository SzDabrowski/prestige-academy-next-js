import { useRef, useState } from "react";

import useAutosizeTextArea from "./useAutosizeTextArea";

import styles from "./TextArea.module.scss";

export default function TextArea() {
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
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
