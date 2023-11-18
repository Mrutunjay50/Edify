import React, { useCallback, useEffect, useState, useRef } from "react";

const isKeyboardCodeAllowed = (code) => {
  return (
    code.startsWith("Key") ||
    code.startsWith("Digit") ||
    code === "Backspace" ||
    code === "Space"
  );
};

const useTypings = (enabled) => {
  const [cursor_cadet, setCursor] = useState(0);
  const [typedWords, setTypedWords] = useState("");
  const totalTypedWords = useRef(0);

  const keyDownHandler = useCallback(
    (event) => { // Include the event parameter here
        const { key, code, target } = event;
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
          setTypedWords((prev) => prev.slice(0, -1));
          setCursor(cursor_cadet - 1);
          totalTypedWords.current -= 1;
          break;

        case " ":
          // Prevent the space key from scrolling
          if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
            return;
          }
          setTypedWords((prev) => prev.concat(key));
          setCursor(cursor_cadet + 1);
          // Prevent the default space key action (scrolling)
          event.preventDefault();
          break;

        default:
          setTypedWords((prev) => prev.concat(key));
          setCursor(cursor_cadet + 1);
          totalTypedWords.current += 1;
      }
    },
    [cursor_cadet, enabled]
  );

  const clearTyped = useCallback(() => {
    setTypedWords("");
    setCursor(0);
  }, []);

  const resetTotalTyped = useCallback(() => {
    totalTypedWords.current = 0;
  }, []);

  //attach the keydown event listener to record keystrokes or keypresses
  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    //remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);
  return {
    typedWords,
    cursor_cadet,
    clearTyped,
    resetTotalTyped,
    totalTypedWords: totalTypedWords.current,
  };
};

export default useTypings;
