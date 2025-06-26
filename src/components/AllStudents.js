// src/components/AllStudents.js
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
  const [records, setRecords] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get("http://localhost:4000/api/getStudents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch students", err);
      });
  }, []);

  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const loadEdit = () => {
    navigate(`/UpdateStudent/${selectedId}`);
    handleMenuClose();
  };

  const loadDetails = () => {
    navigate(`/StudentDetails/${selectedId}`);
    handleMenuClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        All Students Details
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Firstname</strong></TableCell>
              <TableCell><strong>Lastname</strong></TableCell>
              <TableCell><strong>Gender</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No student records found.
                </TableCell>
              </TableRow>
            ) : (
              records.map((student, i) => (
                <TableRow key={student._id || i}>
                  <TableCell>{student.firstname}</TableCell>
                  <TableCell>{student.lastname}</TableCell>
                  <TableCell>{student.gender}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, student._id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dropdown Actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={loadDetails}>Details</MenuItem>
        <MenuItem onClick={loadEdit}>Edit Student</MenuItem>
      </Menu>
    </Container>
  );
};

export default AllStudents;
