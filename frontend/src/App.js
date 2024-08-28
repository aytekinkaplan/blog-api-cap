import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogDetail from "./components/BlogDetail";
import BlogCreate from "./components/BlogCreate";
import BlogUpdate from "./components/BlogUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<BlogCreate />} />
        <Route path="/update/:id" element={<BlogUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
