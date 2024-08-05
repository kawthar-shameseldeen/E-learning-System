import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingEnroll,
  setEnrollError,
  setEnrolledClasses,
  enrollSelector,
} from "../../data-store/redux/enrollSlice";
import {
  fetchingDropRequests,
  setDropRequests,
  droppingCourse,
  dropCourseSuccess,
  dropCourseError,
  clearDropState,
  dropSelector,
} from "../../data-store/redux/dropSlice";
import Navbar from "../../components/navbar/navbar.jsx";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./enrolled.css";

const EnrolledClasses = () => {
  const user = jwtDecode(localStorage.getItem("token"));
  const id = user.id;
  const dispatch = useDispatch();
  const { enrolledClasses, enrollLoading, enrollError } =
    useSelector(enrollSelector);
  const { dropLoading, dropError, dropSuccess, dropRequests } =
    useSelector(dropSelector);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [dropReason, setDropReason] = useState("");

  useEffect(() => {
    const fetchEnrolledClasses = async (id) => {
      dispatch(fetchingEnroll());
      try {
        const response = await axios.get(
          `http://localhost:3030/api/student/${id}`
        );
        dispatch(setEnrolledClasses(response.data));
      } catch (error) {
        dispatch(setEnrollError("Failed to fetch enrolled classes"));
      }
    };

    const fetchDropRequests = async (id) => {
      dispatch(fetchingDropRequests());
      
      try {
        const response = await axios.get(
          `http://localhost:3030/api/drops/student/${id}`
        );
        dispatch(setDropRequests(response.data));
      } catch (error) {
        dispatch(setDropRequests([]));
      }
    };

    if (id) {
      fetchEnrolledClasses(id);
      fetchDropRequests(id);
    }
  }, [dispatch, id]);

  const handleDropCourse = async () => {
    if (selectedClass && dropReason) {
      dispatch(droppingCourse());
      try {
        const response = await axios.post("http://localhost:3030/api/drops", {
          student: id,
          class: selectedClass._id,
          reason: dropReason,
        });
        dispatch(dropCourseSuccess(response.data));
      } catch (error) {
        dispatch(dropCourseError("Failed to request course drop"));
      }
    }
  };

  useEffect(() => {
    if (dropSuccess) {
      dispatch(clearDropState());
      setOpenDialog(false);
      setDropReason("");
      setSelectedClass(null);
      const fetchEnrolledClasses = async (id) => {
        dispatch(fetchingEnroll());
        try {
          const response = await axios.get(
            `http://localhost:3030/api/student/${id}`
          );
          dispatch(setEnrolledClasses(response.data));
        } catch (error) {
          dispatch(setEnrollError("Failed to fetch enrolled classes"));
        }
      };
      fetchEnrolledClasses(id);
    }
  }, [dropSuccess, dispatch, id]);

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          My Enrolled Classes
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {enrollLoading ? (
            <CircularProgress />
          ) : enrollError ? (
            <Typography variant="body1" color="error">
              {enrollError}
            </Typography>
          ) : enrolledClasses.length > 0 ? (
            enrolledClasses.map((enrollment) => (
              <Card
                key={enrollment._id}
                className="class-item"
                sx={{
                  width: "300px",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {enrollment.class.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {enrollment.class.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor:{" "}
                    {enrollment.class.instructor
                      ? enrollment.class.instructor.name
                      : "N/A"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setSelectedClass(enrollment.class);
                      setOpenDialog(true);
                    }}
                  >
                    Request Drop
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1">No enrolled classes found</Typography>
          )}
        </Box>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Request Drop Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide a reason for requesting to drop this course.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Reason"
            type="text"
            fullWidth
            value={dropReason}
            onChange={(e) => setDropReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDropCourse}
            color="secondary"
            disabled={dropLoading}
          >
            {dropLoading ? "Requesting..." : "Request Drop"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnrolledClasses;
