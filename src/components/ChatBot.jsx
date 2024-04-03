import React, { useState, useEffect, useRef } from "react";
import ThreeDotsWave from "./ThreeDotsWave";
import { BotPaper } from "../assets";

const ChatBot = ({ isOpen }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
      setInput("");
    }
  };

  const sendMessage = async () => {
    // Send user message to Node.js backend
    const response = await fetch("/api/dialogflow", {
      method: "POST",
      body: JSON.stringify({ text: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    // Add user message immediately
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, source: "input" },
    ]);

    setInput("");

    // Delay for 3 seconds before adding each bot response
    for (let i = 0; i < data.message.length; i++) {
      // Display loading message before adding a bot response
      setLoading(true);

      setTimeout(() => {
        // Add the bot response
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: data.message[i], source: "data.message" },
        ]);

        if (i === data.message.length - 1) {
          // Hide loading after the last message
          setLoading(false);
        }
      }, (i + 1) * 3000); // 3 seconds interval
    }
  };

  useEffect(() => {
    // Scroll to the bottom when messages change if chatContainerRef.current is not null
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className={` fixed bottom-0 right-2 h-[calc(100vh-14vh)] w-[500px] rounded-t-md  flex flex-col border-2 transition-all z-50 duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : " translate-y-[100%]"
      }`}
      style={{
        backgroundImage: `url(${BotPaper})`,
      }}
    >
      <div
        className="absolute top-0 h-[calc(100%-8%)] w-[480px] overflow-y-scroll p-[10px] "
        ref={chatContainerRef}
      >
        {messages.map((message, index) => {
          if (message.source === "input") {
            return (
              <div
                key={index}
                className={
                  "relative text-right h-[45px] max-h-[80px] flex items-center py-[2px] my-2 px-2"
                }
              >
                <span
                  className="absolute bg-[#d1d7f0] h-[45px] px-4 flex items-center rounded-t-[15px] rounded-r-[15px] right-0"
                  style={{
                    boxShadow:" 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)"
                  }}
                >
                  {message.text}
                </span>
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className={
                  "relative text-left h-[45px] max-h-[80px] flex items-center py-[2px] px-2 my-1"
                }
              >
                <span
                  style={{
                    boxShadow:" 0 1px 1px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 1px rgba(255, 255, 255, 0.1)"
                  }}
                  className="absolute bg-[#adb9e7] h-[45px] px-4 flex items-center  rounded-t-[15px] rounded-l-[15px] left-0"
                >
                  {message.text}
                </span>
              </div>
            );
          }
        })}
        {loading && (
          <div
            className={
              "relative text-left h-[45px] max-h-[80px] flex items-center py-[2px] px-2"
            }
          >
            <ThreeDotsWave
              className={
                "absolute bg-[#adb9e7] h-[45px] px-4 flex items-center  rounded-t-[15px] rounded-l-[15px] lrft-0"
              }
            />
          </div>
        )}
      </div>
      <div className="flex flex-row absolute bottom-0 justify-center py-2 items-center w-[500px]">
        <textarea
          className="p-2 rounded-md focus:outline-none text-[20px] border-2"
          cols="45"
          rows="1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatBot;
