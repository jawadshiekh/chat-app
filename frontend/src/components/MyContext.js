"use client";
import React, { createContext, useContext, useState } from "react";

// Create the context
const MyContext = createContext();

// Create a provider component
export function MyProvider({ children }) {
  const [value, setValue] = useState("");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

// Custom hook to use the context
export function useMyContext() {
  return useContext(MyContext);
}
