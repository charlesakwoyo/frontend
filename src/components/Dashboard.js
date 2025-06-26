// src/components/Dashboard.js
import React from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupIcon from "@mui/icons-material/Group";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Dashboard = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Login", icon: <LoginIcon />, path: "/login", color: "primary" },
    { label: "Register", icon: <PersonAddAltIcon />, path: "/register", color: "secondary" },
    { label: "All Students", icon: <GroupIcon />, path: "/all-students", color: "success" },
    { label: "Add Student", icon: <AddCircleIcon />, path: "/add-student", color: "info" },
    // Delete path needs an ID — use a placeholder or remove it for now
    { label: "Delete Student", icon: <DeleteIcon />, path: "/delete-student/1", color: "error" },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          p: 5,
          background: "linear-gradient(to right, #f7f7ff, #f0f4ff)",
        }}
      >
        <Box textAlign="center" mb={4}>
          <SchoolIcon color="primary" sx={{ fontSize: 50 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Student Management Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Manage student records with ease
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {actions.map((action, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Button
                variant="contained"
                color={action.color}
                fullWidth
                size="large"
                onClick={() => navigate(action.path)}
                startIcon={action.icon}
                sx={{
                  py: 1.7,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "capitalize",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 4,
                  },
                }}
              >
                {action.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Dashboard;
