import { API } from "@/api";
import { dp, dp1, dp2, dp3 } from "@/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const NewChats = ({ createNewChat, data }) => {
  const getAllChats = async () => {
    try {
      const res = await API.getAllChats();
      console.log(res?.data?.data);
      formatData(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [list, setList] = useState([]);

  const formatData = (data) => {
    if (data) {
      const arr = [];
      data.map((i) => {
        const obj = {};
        obj.src = i?.profilePicture;
        obj.name =
          i?.username?.slice(0, 1).toUpperCase() + i?.username?.slice(1);
        obj.lastSeen = "Today at 5:30 PM";
        obj.userData = i;
        arr.push(obj);
      });
      setList(arr);
    }
  };
  useEffect(() => {
    formatData(data);
  }, [data]);

  return (
    <div>
      <div className="flex flex-row items-center justify-between text-xs">
        <span className="font-bold">New Conversations</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {list.length}
        </span>
      </div>
      {list.map((i, index) => {
        return (
          <div
            className="flex flex-col justify-center space-y-1 -mx-2 overflow-y-auto"
            key={index}
          >
            <div
              className="flex flex-row items-center hover:bg-gray-100 cursor-pointer  p-2"
              onClick={() => createNewChat(i?.userData)}
            >
              <Image
                src={i?.src || dp1}
                alt=""
                height={250}
                width={250}
                className="rounded-full h-8 w-8"
              />
              <div className="flex flex-col justify-start items-start ml-2">
                <div className="flex items-center justify-between gap-16">
                  <div className="text-sm font-semibold">{i?.name}</div>
                  <div className="text-xs text-gray-600">{i?.lastSeen}</div>
                </div>
              </div>
              {/* <div className="flex-1 flex justify-end">
            <div className="h-3 w-3 bg-green-500 rounded-full self-end mr-1"></div>
          </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewChats;
