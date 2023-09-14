"use client";
import { dp4 } from "@/assets";
import { MoreVertical, Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Messages from "./messages";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useMyContext } from "./MyContext";
import { API } from "@/api";

const Chat = () => {
  const { value, setValue } = useMyContext();
  console.log(value);
  const [text, setText] = useState("");
  const [row, setRow] = useState(1);
  const [scroll, setScroll] = useState();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState([]);

  const sendMessage = async () => {
    try {
      const res = await API.sendMessage(value?.chatId, { content: text });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEmojiSelect = (emoji) => {
    setText(text + emoji.native);
    // setShowEmojiPicker(false);
  };
  const handleRows = (event) => {
    setShowEmojiPicker(false);
    const newScrollHeight = event?.target?.scrollHeight;
    if (newScrollHeight !== scroll) {
      setScroll(newScrollHeight);
      if (scroll) {
        const newRow = Math.min(Math.floor(newScrollHeight / scroll) + 1, 10);
        setRow(newRow);
      }
    }
    setText(event?.target?.value);
  };
  return (
    <div className="flex flex-col overflow-hidden h-full w-full">
      {/* banner */}
      <div className="flex items-center sticky top-0 bg-gray-200 h-20 p-4 border-l-2">
        <Image
          src={dp4}
          alt=""
          height={250}
          width={250}
          className="rounded-full h-12 w-12 "
        />
        <div className="ml-4">
          <h1 className="text-lg font-bold ">
            {value?.username?.slice(0, 1)?.toUpperCase() +
              value?.username?.slice(1) || ""}{" "}
          </h1>
          <p className="text-gray-600">last seen today at 5:36 AM </p>
        </div>
        <div className="flex-1 flex justify-end text-gray-500">
          <Paperclip size={20} className="hover:text-gray-600 cursor-pointer" />
          <MoreVertical
            className="ml-8 hover:text-gray-600 cursor-pointer"
            size={20}
          />
        </div>
      </div>
      <Messages
        chatId={value?.chatId}
        setMessage={setMessage}
        message={message}
      />
      {/* chats */}
      {/* sendBox */}
      <div className="fixed" style={{ bottom: "60px", left: "265px" }}>
        {showEmojiPicker && (
          <Picker
            data={data}
            onEmojiSelect={handleEmojiSelect}
            theme={"light"}
          />
        )}
      </div>

      <div className="flex sticky bottom-0 left-0  items-center max-h-36 bg-gray-200 w-full px-4 py-2">
        <Smile
          className="hover:text-gray-600 cursor-pointer text-gray-500"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        />
        <textarea
          rows={row}
          type="text"
          value={text}
          onChange={handleRows}
          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 ml-4 px-4 py-2 resize-none"
        />

        <div
          className="flex items-center ml-4  justify-center bg-indigo-500 hover:bg-indigo-600 cursor-pointer rounded-xl text-white px-4 py-2 flex-shrink-0"
          onClick={sendMessage}
        >
          <span>Send</span>
          <span className="ml-2">
            <Send size={16} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
