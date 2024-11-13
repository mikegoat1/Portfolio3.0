import React from "react";
import {  Route, Routes } from "react-router-dom";
import Home from "./pages/AboutMe";
import Work from "./pages/Work";
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
    </Routes>
  );
}

export default App;
