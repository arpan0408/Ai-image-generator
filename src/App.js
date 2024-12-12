import React, { useState } from "react";
import ImageGenerator from "./components/ImageGenerator";
import { RiImageAiFill } from "react-icons/ri";
import "./App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("image");

  return (
    <div className="app">
      <ImageGenerator />
    </div>
  );
};

export default App;
