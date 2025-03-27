import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from './components/Header';
import ASL from "./pages/ASL";
import ISL from "./pages/ISL";
import GetStarted from './pages/GetStarted';
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/asl" element={<ASL />} />
          <Route path="/isl" element={<ISL />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;