import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  Grid,
  MenuItem,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await axios.post(
        "http://localhost:4000/api/addStudent",
        formData,
        {
          withCredentials: true,
        }
      );

      setSuccessMessage(" Student added successfully");
      setFormData({ firstname: "", lastname: "", gender: "" });
    } catch (error) {
      console.error(" Error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.error?.message || "Failed to add student."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: "#fdfdfd" }}>
        <Box textAlign="center" mb={2}>
          <PersonAddIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h5" mt={1}>
            Add New Student
          </Typography>
        </Box>

        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errorMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                fullWidth
                required
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                
              </TextField>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Add Student
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddStudent;
