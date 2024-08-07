// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   fetchingCourses,
//   setAvailableCourses,
//   coursesSelector,
// } from '../../data-store/redux/classSlice';
// import {
//   uploadFileStart,
//   uploadFileSuccess,
//   uploadFileFailure,
//   fetchFilesByClassStart,
//   fetchFilesByClassSuccess,
//   fetchFilesByClassFailure,
//   filesSelector,
// } from '../../data-store/redux/fileSlice';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import Navbar from '../../components/navbar/navbar';

// import {
//   Card,
//   CardContent,
//   Typography,
//   Container,
//   Box,
//   CircularProgress,
//   Button,
//   Input,
// } from '@mui/material';
// import { toast } from 'react-toastify';

// const MyCourses = () => {
//   const dispatch = useDispatch();
//   const {
//     availableCourses,
//     loading: coursesLoading,
//     error: coursesError,
//   } = useSelector(coursesSelector);
//   const {
//     files,
//     loading: filesLoading,
//     error: filesError,
//   } = useSelector(filesSelector);
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     const fetchAvailableCourses = async () => {
//       dispatch(fetchingCourses());

//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         return;
//       }

//       const decodedToken = jwtDecode(token);
//       const instructorId = decodedToken.id;

//       try {
//         const response = await axios.get(
//           `http://localhost:3030/api/classes/instructor/${instructorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         dispatch(setAvailableCourses(response.data));
//       } catch (error) {
//         console.error('Failed to fetch courses', error);
//       }
//     };

//     fetchAvailableCourses();
//   }, [dispatch]);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleFileUpload = async (classId) => {
//     if (!selectedFile) {
//       alert('Please select a file to upload.');
//       return;
//     }

//     dispatch(uploadFileStart());
//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('classId', classId);

//     const token = localStorage.getItem('token');

//     try {
//       const response = await axios.post(
//         'http://localhost:3030/api/files',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       dispatch(uploadFileSuccess(response.data));
//       toast.success('File uploaded successfuly');
//     } catch (error) {
//       dispatch(uploadFileFailure(error.response.data));
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <Container sx={{ marginTop: 8 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           My Added Courses
//         </Typography>
//         <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
//           {coursesLoading ? (
//             <CircularProgress />
//           ) : coursesError ? (
//             <Typography variant="body1" color="error">
//               {coursesError}
//             </Typography>
//           ) : availableCourses.length > 0 ? (
//             availableCourses.map((course) => (
//               <Card
//                 key={course._id}
//                 className="class-item"
//                 sx={{
//                   width: '300px',
//                   minHeight: '200px',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'space-between',
//                   marginBottom: '20px',
//                 }}
//               >
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="div">
//                     {course.title}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {course.description}
//                   </Typography>
//                   <Input
//                     type="file"
//                     onChange={handleFileChange}
//                     sx={{ marginTop: 2 }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleFileUpload(course._id)}
//                     sx={{ marginTop: 1 }}
//                     disabled={filesLoading}
//                   >
//                     Upload File
//                   </Button>
//                   {filesError && (
//                     <Typography
//                       variant="body2"
//                       color="error"
//                       sx={{ marginTop: 1 }}
//                     >
//                       {filesError}
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <Typography variant="body1" align="center">
//               No courses found.
//             </Typography>
//           )}
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default MyCourses;import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingCourses,
  setAvailableCourses,
  coursesSelector,
} from '../../data-store/redux/classSlice';
import {
  uploadFileStart,
  uploadFileSuccess,
  uploadFileFailure,
  filesSelector,
} from '../../data-store/redux/fileSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../../components/navbar/navbar';

import {
  Typography,
  Container,
  Box,
  CircularProgress,
  Button,
  Input,
} from '@mui/material';
import { toast } from 'react-toastify';
import './myCourses.css';

const MyCourses = () => {
  const dispatch = useDispatch();
  const {
    availableCourses,
    loading: coursesLoading,
    error: coursesError,
  } = useSelector(coursesSelector);
  const { loading: filesLoading, error: filesError } =
    useSelector(filesSelector);
  const [selectedFile, setSelectedFile] = useState({});

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      dispatch(fetchingCourses());

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const decodedToken = jwtDecode(token);
      const instructorId = decodedToken.id;

      try {
        const response = await axios.get(
          `http://localhost:3030/api/classes/instructor/${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(setAvailableCourses(response.data));
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchAvailableCourses();
  }, [dispatch]);

  const handleFileChange = (event, classId) => {
    setSelectedFile({ ...selectedFile, [classId]: event.target.files[0] });
  };

  const handleFileUpload = async (classId) => {
    if (!selectedFile[classId]) {
      alert('Please select a file to upload.');
      return;
    }

    dispatch(uploadFileStart());
    const formData = new FormData();
    formData.append('file', selectedFile[classId]);
    formData.append('classId', classId);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        'http://localhost:3030/api/files',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(uploadFileSuccess(response.data));
      toast.success('File uploaded successfully');
    } catch (error) {
      dispatch(uploadFileFailure(error.response.data));
    }
  };

  return (
    <div className="container">
      <Navbar />
      <Typography className="header" align="center" gutterBottom>
        My Added Courses
      </Typography>
      <div className="card-container">
        {coursesLoading ? (
          <CircularProgress />
        ) : coursesError ? (
          <Typography variant="body1" color="error">
            {coursesError}
          </Typography>
        ) : availableCourses.length > 0 ? (
          availableCourses.map((course) => (
            <div key={course._id} className="card">
              <div className="card-header">
                <Typography className="card-title">{course.title}</Typography>
              </div>
              <Typography className="card-body">
                {course.description}
              </Typography>
              <div className="card-footer">
                <Input
                  type="file"
                  onChange={(event) => handleFileChange(event, course._id)}
                  className="upload-input"
                />
                <Button
                  variant="contained"
                  onClick={() => handleFileUpload(course._id)}
                  className="upload-button"
                  disabled={filesLoading}
                >
                  Upload File
                </Button>
                {filesError && (
                  <Typography
                    variant="body2"
                    color="error"
                    className="upload-error"
                  >
                    {filesError}
                  </Typography>
                )}
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No courses found.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
