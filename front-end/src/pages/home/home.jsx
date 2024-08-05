
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingCourses,
  setAvailableCourses,
  coursesSelector,
  removeCourse,
} from "../../data-store/redux/classSlice";
import {
  fetchingEnroll,
  setEnrollError,
  setEnrolledClasses,
  enrollSelector,
} from "../../data-store/redux/enrollSlice";
import Navbar from "../../components/navbar/navbar";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./home.css";
import { useEffect } from "react";

const Home = () => {
  const user = jwtDecode(localStorage.getItem("token"));
  const id = user.id;
  const dispatch = useDispatch();
  const { availableCourses, coursesLoading, coursesError } =
    useSelector(coursesSelector);
  const { enrolledClasses } = useSelector(enrollSelector);

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      dispatch(fetchingCourses());
      try {
        const response = await axios.get("http://localhost:3030/api/classes");
        dispatch(setAvailableCourses(response.data));
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchAvailableCourses();
  }, [dispatch]);

  const enrollInClass = async (classId) => {
    try {
      await axios.post("http://localhost:3030/api/enrollments", {
        student: id,
        class: classId,
      });
      dispatch(removeCourse(classId));
      fetchEnrolledClasses(id);
    } catch (error) {
      console.error("Enrollment failed", error);
    }
  };

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

  useEffect(() => {
    if (id) {
      fetchEnrolledClasses(id);
    }
  }, [dispatch, id]);

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Available Courses
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {coursesLoading ? (
            <CircularProgress />
          ) : coursesError ? (
            <Typography variant="body1" color="error">
              {coursesError}
            </Typography>
          ) : (
            availableCourses.map((course) => (
              <Card
                key={course._id}
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
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Instructor:{" "}
                    {course.instructor ? course.instructor.name : "N/A"}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => enrollInClass(course._id)}
                  >
                    Enroll
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
