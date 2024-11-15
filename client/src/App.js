import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/AboutMe";
import Work from "./pages/Work";
import Resume from "./pages/Resume";
import './App.css';
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<><NavBar /><Home /><Footer /></>} />
        <Route path="/work" element={<><NavBar /><Work /><Footer /></>} />
        <Route path="/resume" element={<><NavBar /><Resume /><Footer /></>} />
      </Routes>

    </>

  );
}

export default App;
