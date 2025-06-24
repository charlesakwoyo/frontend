// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import GetStudents from "./components/GetStudents";
import AddStudent from "./components/AddStudent";
import DeleteStudent from "./components/DeleteStudent"; // You’ll create this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getstudents" element={<GetStudents />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/deletestudent" element={<DeleteStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
