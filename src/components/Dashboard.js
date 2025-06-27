// src/components/Dashboard.js
import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  Divider,
  Button,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const drawerWidth = 240;

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "Get All Students", icon: <GroupIcon />, path: "/getstudents" },
    { label: "Add Student", icon: <AddCircleIcon />, path: "/addstudent" },
    { label: "Delete Student", icon: <DeleteIcon />, path: "/deletestudent" },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: "center" }}>
        <SchoolIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="h6" fontWeight="bold">
          Dashboard
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item, i) => (
          <ListItemButton key={i} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top App Bar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Student Management System
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#f4f6fb",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Page Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f9fbff", p: 3, minHeight: "100vh" }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Welcome to Student Management Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Use the side menu to manage students.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
