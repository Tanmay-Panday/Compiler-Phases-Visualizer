import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TheoryPage from "./pages/TheoryPage";
import PracticalPage from "./pages/PracticalPage";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/practical" element={<PracticalPage />} />
      </Routes>
    </div>
  );
};

export default App;
