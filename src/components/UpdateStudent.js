// src/components/UpdateStudent.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";

const UpdateStudent = () => {
  const { student_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ firstname: "", lastname: "", gender: "" });
  const [message, setMessage] = useState({ type: '', content: '' });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("access_token");
        const res = await axios.get(`http://localhost:4000/api/getStudent/${student_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(res.data);
      } catch (err) {
        setMessage({ type: 'error', content: 'Failed to load student data.' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [student_id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = sessionStorage.getItem("access_token");
      await axios.patch(`http://localhost:4000/api/updateStudent/${student_id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMessage({ type: 'success', content: 'Student updated successfully!' });
      setTimeout(() => navigate("/getstudents"), 1500);
    } catch (err) {
      setMessage({ type: 'error', content: 'Update failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: "peachpuff",
        }}
      >
        <Typography variant="h5" mb={2} align="center" fontWeight="bold">
          Edit Student
        </Typography>

        {message.content && <Alert severity={message.type}>{message.content}</Alert>}

        {loading ? (
          <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
        ) : (
          <form onSubmit={handleUpdate}>
            <TextField
              label="First Name"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Last Name"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Gender"
              name="gender"
              value={data.gender}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "peru",
                color: "white",
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#a0522d',
                },
                py: 1.5,
              }}
            >
              Update
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default UpdateStudent;