import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import GetStudents from "./components/GetStudents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/get-students" element={<GetStudents />} />
        <Route path="*" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
