import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingClasses,
  setClasses,
  setError,
  classSelector,
} from "../../data-store/redux/classSlice";
import axios from "axios";
import Navbar from "../../components/navbar/navbar.jsx";
import { toast } from "react-toastify";
import { Card, CardContent, Typography, Container, Box } from "@mui/material";
import "./home.css";

const Courses = () => {
  const dispatch = useDispatch();
  const { list: classes, loading, error } = useSelector(classSelector);

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

  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: 8 }}>
        <Box display="flex" flexWrap="wrap" gap={2}>
          {loading ? (
            <p>Loading classes...</p>
          ) : error ? (
            <p>{error}</p>
          ) : classes.length > 0 ? (
            classes.map((classItem) => (
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
                }}
              >
                <CardContent>
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
            <p>No classes found</p>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Courses;
