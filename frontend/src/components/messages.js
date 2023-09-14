import { API } from "@/api";
import Cookies from "js-cookie";
import { Check, CheckCheck, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Messages = ({ chatId, message, setMessage }) => {
  const checkDay = (date) => {
    const today = new Date().getDate();
    const messageDate = new Date(date).getDate();
    if (today - messageDate == 1) {
      return "Yesterday";
    } else if (today - messageDate == 0) {
      return "Today";
    } else {
      return `${date}`;
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const containerRef = useRef(null);
  const id = Cookies.get("id");
  const getMessages = async () => {
    try {
      const res = await API.getMessages(chatId);
      setMessage(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (chatId) {
      getMessages();
    }
    const container = containerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [chatId]);

  return (
    <div
      className="flex flex-col h-full w-full  bg-purple-100 overflow-y-scroll"
      ref={containerRef}
    >
      <div className=" py-3 w-full">
        {message?.map((i, index) => {
          return (
            <div key={index}>
              <div className="w-full flex justify-center">
                <div className="bg-gray-200 px-4 py-1 rounded-lg shadow-lg text-xs">
                  {checkDay(i?.date)}
                </div>
              </div>
              {i?.data?.map((j, index2) => {
                return j?.senderId != id ? (
                  <div
                    className="col-start-1 col-end-8 mt-2 rounded-lg"
                    key={index2}
                  >
                    <div className="flex flex-row items-center">
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow-lg rounded-2xl rounded-bl-none ">
                        <div>
                          <p>{j?.content}</p>
                          <div className="flex justify-end text-xs text-gray-500">
                            <p>
                              {new Date(j?.createdAt).getHours()}:
                              {new Date(j?.createdAt).getMinutes()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="col-start-6 col-end-13 mt-2 rounded-lg"
                    key={index2}
                  >
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="relative mr-3 text-sm bg-green-200 py-2 px-4 shadow-lg  rounded-br-none rounded-2xl">
                        <div className="">
                          <p>{j?.content} </p>
                          <div className="flex justify-end text-xs text-gray-500">
                            <p>
                              {new Date(j?.createdAt).getHours()}:
                              {new Date(j?.createdAt).getMinutes()}
                            </p>
                            <CheckCheck size={16} className="ml-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
