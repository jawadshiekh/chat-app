import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";
import React from "react";

const Home = () => {
  return (
    <div className="border-4  h-screen flex items-center justify-center">
      <div className="flex h-screen w-full">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
