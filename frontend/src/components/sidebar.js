"use client";
import { dp } from "@/assets";
import {
  ListFilter,
  MessageSquare,
  MessageSquareDashed,
  MessageSquarePlus,
  MoreVertical,
  Search,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ActiveChats from "./activeChats";
import ArchievedChats from "./archievedChats";
import Me from "./me";
import { API } from "@/api";
import { useMyContext } from "./MyContext";
import { async } from "react-input-emoji";
import NewChats from "./newChats";

const Sidebar = () => {
  const { value, setValue } = useMyContext();
  const [addUsers, setAddUsers] = useState(false);
  const [users, setUsers] = useState([]);
  const [openedChat, setOpenedChat] = useState();
  const [allChat, setAllChat] = useState();

  const createNewChat = async (recipient) => {
    console.log(recipient);
    try {
      const res = await API.createNewChat(recipient.id);
      console.log(res?.data?.data?.chatId);
      recipient.chatId = res?.data?.data?.chatId;
      console.log(recipient);
      setValue(recipient);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async () => {
    try {
      const res = await API.getAllUsers();
      if (res) {
        console.log(res);
        setUsers(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
    setAddUsers(true);
  };

  return (
    <div className="flex flex-col w-64 h-full bg-white flex-shrink-0">
      <div className="flex items-center max-h-20 bg-gray-200 p-4 border-l-2">
        <Image
          src={dp}
          alt=""
          height={250}
          width={250}
          className="rounded-full h-12 w-12 hover: cursor-pointer"
        />
        <div className="flex-1 flex justify-end text-gray-500">
          <MessageSquarePlus
            className="hover:text-gray-600 cursor-pointer"
            onClick={addUser}
          />
          <MoreVertical className="ml-2 hover:text-gray-600 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center h-12 w-full p-2 text-gray-600">
        <div className="bg-gray-300 flex py-2  rounded-xl justify-center items-center w-full">
          <Search size={15} />
          <input
            className="ml-2 text-xs bg-gray-300 outline-none text-gray-600"
            placeholder="Search or start new chat"
          />
        </div>
        <ListFilter className="ml-2 hover: cursor-pointer" size={20} />
      </div>

      {/* <Me /> */}
      <div className="flex flex-col px-2">
        <ActiveChats setValue={setValue} />
        <NewChats createNewChat={createNewChat} data={users} />
        {/* <ArchievedChats /> */}
      </div>
    </div>
  );
};

export default Sidebar;
