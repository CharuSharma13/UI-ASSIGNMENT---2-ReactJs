import React from "react";
import NewsApp from "./NewsApp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsApp />} />
      </Routes>
    </BrowserRouter>
  );
}
