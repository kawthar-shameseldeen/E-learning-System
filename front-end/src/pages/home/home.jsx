import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingClasses,
  setClasses,
  setError,
  classSelector,
} from "../../data-store/redux/classSlice";
import {
  enrollInClass,
  enrollSelector,
  fetchingEnroll,
  setEnrollSuccess,
  setEnrollError,
} from "../../data-store/redux/enrollSlice";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.jsx";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";
import "./home.css";

const Courses = () => {
  const dispatch = useDispatch();
  const { list: classes, loading, error } = useSelector(classSelector);
  const { enrollLoading, enrollError, enrollSuccess } =
    useSelector(enrollSelector);

  useEffect(() => {
    const fetchClasses = async () => {
      dispatch(fetchingClasses());
      try {
        const response = await axios.get(
          "http://localhost:3030/api/classes/classes"
        );
        dispatch(setClasses(response.data));
        toast.success("Classes fetched successfully");
      } catch (error) {
        dispatch(setError("Classes not found"));
        toast.error("Classes not found");
      }
    };
    fetchClasses();
  }, [dispatch]);

  const handleEnroll = async (classId) => {
    dispatch(fetchingEnroll());
    try {
      const response = await axios.post(
        "http://localhost:3030/api/enrollments/enrollments",
        { classId }
      );
      dispatch(setEnrollSuccess(response.data));
      toast.success("Enrolled successfully");
    } catch (error) {
      dispatch(setEnrollError("Enrollment failed"));
      toast.error("Enrollment failed");
    }
  };

  const colors = [
    "#e3f2fd",
    "#fce4ec",
    "#f3e5f5",
    "#e8f5e9",
    "#fffde7",
    "#e0f7fa",
  ];

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Available Courses
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          Enroll your Course
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {loading ? (
            <p>Loading classes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : classes.length > 0 ? (
            classes.map((classItem, index) => (
              <Card
                key={classItem._id}
                className="class-item"
                sx={{
                  width: "300px",
                  minHeight: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  backgroundColor: colors[index % colors.length],
                  borderRadius: "10px",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {classItem.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {classItem.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor: {classItem.instructor.name}
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "8px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEnroll(classItem._id)}
                    disabled={enrollLoading}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Enroll
                  </Button>
                </Box>
              </Card>
            ))
          ) : (
            <p>No classes found</p>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Courses;
