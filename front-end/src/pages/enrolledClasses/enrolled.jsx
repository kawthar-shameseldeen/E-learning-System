import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingEnrolledClasses,
  setEnrolledClasses,
  setEnrolledClassesError,
  enrolledClassesSelector,
} from "../../data-store/redux/enrolledClassesSlice";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.jsx";
import { toast } from "react-toastify";
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import "./home.css";

const EnrolledCourses = () => {
  const dispatch = useDispatch();
  const {
    list: enrolledClasses,
    loading,
    error,
  } = useSelector(enrolledClassesSelector);

  useEffect(() => {
    const fetchEnrolledClasses = async () => {
      dispatch(fetchingEnrolledClasses());
      try {
        const response = await axios.get(
          "http://localhost:3030/api/enrollments/user"
        );
        dispatch(setEnrolledClasses(response.data));
        toast.success("Enrolled classes fetched successfully");
      } catch (error) {
        dispatch(setEnrolledClassesError("Failed to fetch enrolled classes"));
        toast.error("Failed to fetch enrolled classes");
      }
    };
    fetchEnrolledClasses();
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Enrolled Courses
        </Typography>
        <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
          {loading ? (
            <p>Loading enrolled classes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : enrolledClasses.length > 0 ? (
            enrolledClasses.map((classItem) => (
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
                  backgroundColor: "#f0f0f0",
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
              </Card>
            ))
          ) : (
            <p>No enrolled classes found</p>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default EnrolledCourses;
