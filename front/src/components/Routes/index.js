import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import LogPage from "../../pages/LogPage";
import Profil from "../../pages/Profil";
import Navbar from "../Navbar";

const index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LogPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="*" element={<LogPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
