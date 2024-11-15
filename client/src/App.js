import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/AboutMe";
import Work from "./pages/Work";
import Resume from "./pages/Resume";
import './App.css';
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/resume" element={<Resume />} />"
      </Routes>
      <Footer />

    </>

  );
}

export default App;
