import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import GetStudents from "./components/GetStudents";
import UpdateStudent from "./components/UpdateStudent";
import AddStudent from "./components/AddStudent";
import DeleteStudent from "./components/DeleteStudent";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/getstudents"
            element={
              <PrivateRoute>
                <GetStudents />
              </PrivateRoute>
            }
          />
          <Route
            path="/addstudent"
            element={
              <PrivateRoute>
                <AddStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/deletestudent"
            element={
              <PrivateRoute>
                <DeleteStudent />
              </PrivateRoute>
            }
          />
          <Route
            path="/UpdateStudent/:student_id"
            element={
              <PrivateRoute>
                <UpdateStudent />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
