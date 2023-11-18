import { useState,useCallback, useEffect } from "react";
import useWords from "./useWords";
import useTypings from "./useTypings";
import useCountdown from "./useCountdown";

const States = "start" | "run" | "finish";
const NUMBER_OF_WORDS = 20;
const COUNTDOWN_SECONDS = 50;

const countErrors = (actual, expected) => {
    const expectedCharacters = expected.split("");
  
    return expectedCharacters.reduce((errors, expectedChar, i) => {
      const actualChar = actual[i];
      if (actualChar !== expectedChar) {
        errors++;
      }
      return errors;
    }, 0);
  };


const useEngine = () => {
    const [state, setState] = useState("start");
    const { timeLeft, startCountdown, resetCountdown } = useCountdown(COUNTDOWN_SECONDS);
    const {words, updateWords} = useWords(NUMBER_OF_WORDS);
    const {typedWords, cursor_cadet, clearTyped, resetTotalTyped, totalTypedWords} = useTypings(state !== "finish");

    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" && cursor_cadet > 0;
    const areWordsFinished = cursor_cadet === words.length;
  
    // console.log(words);
    // console.log(typedWords);

    const restart = useCallback(() => {
      resetCountdown();
      resetTotalTyped();
      setState("start");
      setErrors(0);
      updateWords();
      clearTyped();
    }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);
  
    const sumErrors = useCallback(() => {
      const wordsReached = words.substring(0, Math.min(cursor_cadet, words.length));
      setErrors((prevErrors) => prevErrors + countErrors(typedWords, wordsReached));
    }, [typedWords, words, cursor_cadet]);
  
    // as soon the user starts typing the first letter, we start
    useEffect(() => {
      if (isStarting) {
        setState("run");
        startCountdown();
      }
    }, [isStarting, startCountdown]);
  
    // when the time is up, we've finished
    useEffect(() => {
      if (!timeLeft && state === "run") {
        setState("finish");
        sumErrors();
      }
    }, [timeLeft, state, sumErrors]);
  
    /**
     * when the current words are all filled up,
     * we generate and show another set of words
     */
    useEffect(() => {
      if (areWordsFinished) {
        sumErrors();
        updateWords();
        clearTyped();
      }
    }, [clearTyped, areWordsFinished, updateWords, sumErrors]);
  
    return {state, words, typedWords, errors, restart, timeLeft, totalTypedWords};
};

export {useEngine,States};