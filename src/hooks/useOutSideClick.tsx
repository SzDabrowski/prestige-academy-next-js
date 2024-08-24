import { useEffect, RefObject } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLInputElement>,
  callback: (event: MouseEvent) => void
) => {
  const listener = (event: MouseEvent) => {
    if (!ref.current || ref.current.contains(event.target as Node)) return;
    callback(event);
  };

  useEffect(() => {
    document.addEventListener("click", listener);

    return () => document.removeEventListener("click", listener);
  }, []);
};

export default useOutsideClick;
