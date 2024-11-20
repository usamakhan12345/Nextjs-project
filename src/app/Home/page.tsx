"use client";

import React, { useState } from "react";

const Home = () => {
  const [name, setName] = useState<string>();

  const handleSetName = () => {
    setName("string");
  };
  console.log("name", name);
  return (
    <>
      <div>This is Home Page</div>
      <button onClick={handleSetName}>Add Name</button>
    </>
  );
};

export default Home;
