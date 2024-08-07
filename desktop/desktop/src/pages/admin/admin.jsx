import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourse,
  coursesSelector,
  setCoursesError,
} from '../../data-store/redux/classSlice';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './admin.css';
import Navbar from '../../components/navbar/navbar';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(coursesSelector);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddCourse = async () => {
    if (!title || !description) {
      dispatch(setCoursesError('All fields are required'));
      toast.error('All fields are required');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(setCoursesError('No token found'));
      toast.error('No token found');
      return;
    }

    const decodedToken = jwtDecode(token);
    const instructorId = decodedToken.id;

    try {
      const response = await axios.post(
        'http://localhost:3030/api/classes',
        {
          title,
          description,
          instructor: instructorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addCourse(response.data));
      setTitle('');
      setDescription('');
      toast.success('Course added successfully');
    } catch (error) {
      dispatch(setCoursesError('Failed to add course'));
      toast.error('Failed to add course');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="admin-page">
        <div className="admin-content">
          <h2 className="admin-title">Admin Page - Add Course</h2>
          <div className="admin-container">
            <ToastContainer />
            <div className="admin-form">
              <input
                className="admin-input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="admin-input"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {loading ? (
                <div className="admin-loading">Loading...</div>
              ) : (
                <button className="admin-button" onClick={handleAddCourse}>
                  Add Course
                </button>
              )}
              {error && <div className="admin-error">{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
