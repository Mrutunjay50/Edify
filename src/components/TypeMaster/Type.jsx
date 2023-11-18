import React, { useState, useEffect, useRef } from "react";
import Caret from "./caret";
import RestartButton from "./RestartButton";
import cn from "classnames";

const Type = ({ words, typedWords, restart, timeLeft }) => {
  const wordsArray = words.split("");
  const typedWordsArray = typedWords.split("");

  const [showArray, setShowArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);

  const [finalShowArray, setFinalShowArray] = useState([]);

  useEffect(() => {
    setShowArray(wordsArray.join("").split(" "));
    setTypeArray(typedWordsArray.join("").split(" "));
  }, [words, typedWords]);

  useEffect(() => {
    setFinalShowArray(showArray);
    const arr2 = [];

    for (let index = 0; index < showArray.length; index++) {
      if (showArray[index] !== undefined && typeArray[index] !== undefined) {
        const arr = [showArray[index]];
        const arr1 = [typeArray[index]];
        if (arr.length === arr1.length) {
          for (let i = 0; i < arr.length; i++) {
            arr2.push(arr[i] + arr1[i].slice(arr[i].length));
          }
        }
      } else if (showArray[index] !== null && typeArray[index] === undefined) {
        arr2.push(showArray[index]);
      }
    }
    setFinalShowArray(arr2);
  }, [showArray, typedWords]);

  console.log("finalshowarray" , finalShowArray);
  console.log("showarray" , showArray);
  console.log("typearray" , typeArray);
  console.log("wordarray" , wordsArray);
  console.log("typedWordsArray" , typedWordsArray);
  return (
      <div className="flex flex-col relative justify-center mt-[10rem] px-[20%]">
      <span className="font-mono absolute -top-32 w-[60%] font-playpen"><b>Note :</b> make sure you do not type less no. of words than the shown words below as there is a bug we are working on, will soon clear out the bug ( have a good day )</span>
      
        <div className="flex flex-row items-center justify-between h-[2rem] font-playpen">
          <span >Time: {timeLeft}</span>
          <span className="font-medium">English</span>
        </div>
        {/* {showClickToFocus && ( */}
        {/* <div
            className="bg-[#f5f5f2d3] absolute top-[3rem] z-50 h-[140px] w-[60%] text-[25px] flex justify-center items-center cursor-pointer"
            // onClick={handleMessageClick}
          >
            Click here to focus
          </div> */}
        {/* )} */}
        <div className=" relative w-[100%]  my-3 text-3xl leading-relaxed break-all">
          <div className="showWords z-10 text-[#838080] h-[135px] bg-transparent">
            {finalShowArray
              .join(" ")
              .split("")
              .map((word, index) => (
                <span key={index} className="text-[#838080]">
                  {word}
                </span>
              ))}
          </div>
          <div className="typedWords absolute z-20 top-0 text-[#516ce6] h-[135px] bg-transparent">
            {typeArray.map((string, index) => {
              return (
                <span key={index}>
                  {string.split("").map((char, i) => (
                    <span key={i} className={cn({
                      "text-[#516ce6]" : char === finalShowArray[index][i] && finalShowArray[index][i] === showArray[index][i],
                      "text-[#fa7d7d]" : char !== showArray[index][i]
                    })}>
                    {i === 0 ? " " : ""}{finalShowArray[index][i]}
                    </span>
                  ))}
                </span>
              );
            })}
            
            <Caret isTyping={true}/>
          </div>
        </div>
        <span className="w-[100%] flex items-center justify-center cursor-pointer mt-10">
          <RestartButton  onRestart={restart}/>
        </span>
      </div>
  );
};

export default Type;
