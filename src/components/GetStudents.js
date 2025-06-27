import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Alert,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ firstname: '', lastname: '', gender: '' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const fetchStudents = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await axios.get('http://localhost:4000/api/getStudents', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Failed to fetch students', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleMenuClick = (event, studentId) => {
    setAnchorEl(event.currentTarget);
    setActiveMenuId(studentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenuId(null);
  };

  const loadEdit = async (studentId) => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await axios.get(`http://localhost:4000/api/getStudent/${studentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingId(studentId);
      setFormData(response.data);
      setMessage(null);
      handleMenuClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = sessionStorage.getItem('access_token');
      await axios.patch(`http://localhost:4000/api/updateStudent/${editingId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: 'success', text: 'Student updated successfully!' });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update student.' });
      console.error(err);
    }
  };

  const handleDetails = (id) => {
    handleMenuClose();
    navigate(`/studentdetails/${id}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        All Students
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 2 }}>
          {message.text}
        </Alert>
      )}

      {loading ? (
        <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>First Name</b></TableCell>
                <TableCell><b>Last Name</b></TableCell>
                <TableCell><b>Gender</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                <React.Fragment key={student._id}>
                  <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{student.firstname}</TableCell>
                    <TableCell>{student.lastname}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      <IconButton onClick={(e) => handleMenuClick(e, student._id)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open && activeMenuId === student._id}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleDetails(student._id)}>Details</MenuItem>
                        <MenuItem onClick={() => loadEdit(student._id)}>Edit</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>

                  {editingId === student._id && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Box component="form" sx={{ p: 2, backgroundColor: 'peachpuff', borderRadius: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>Edit Student</Typography>
                          <TextField
                            name="firstname"
                            label="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            name="lastname"
                            label="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <TextField
                            name="gender"
                            label="Gender"
                            value={formData.gender}
                            onChange={handleChange}
                            fullWidth
                            sx={{ mb: 2 }}
                          />
                          <Button
                            variant="contained"
                            onClick={handleUpdate}
                            sx={{
                              backgroundColor: 'peru',
                              fontWeight: 'bold',
                              '&:hover': { backgroundColor: '#a0522d' },
                            }}
                          >
                            Update
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default GetStudents;