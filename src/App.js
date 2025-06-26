// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AllStudents from "./components/AllStudents";
import AddStudent from "./components/AddStudent";
import DeleteStudent from "./components/DeleteStudent";
import UpdateStudent from "./components/UpdateStudent";
// import StudentDetails from "./components/StudentDetails"; // Optional

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Management */}
        <Route path="/all-students" element={<AllStudents />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/delete-student/:id" element={<DeleteStudent />} />
        <Route path="/update-student/:student_id" element={<UpdateStudent />} />

        {/* Optional Details Page */}
        {/* <Route path="/student-details/:student_id" element={<StudentDetails />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
