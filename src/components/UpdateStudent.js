import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStudent = () => {
  const { id } = useParams(); // ✅ Match with route param
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/students/getStudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData({
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          gender: res.data.gender,
        });
      })
      .catch(() => {
        toast.error("Error fetching student data");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");
    setLoading(true);

    axios
      .patch(
        `http://localhost:4000/api/students/updateStudent/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        toast.success("Student updated successfully");
        navigate("/AllStudents");
      })
      .catch(() => {
        toast.error("An error occurred while updating the record");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Student
        </Typography>

        {loading ? (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={saveStudent}>
            <TextField
              fullWidth
              label="First Name"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Student
            </Button>
          </form>
        )}
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default UpdateStudent;
