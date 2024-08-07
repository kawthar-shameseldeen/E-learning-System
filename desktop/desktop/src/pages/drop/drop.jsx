import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingDropRequests,
  setDropRequests,
  approvingDropRequest,
  rejectingDropRequest,
  dropRequestApproved,
  dropRequestRejected,
  dropRequestError,
  dropSelector,
} from '../../data-store/redux/dropSlice';
import axios from 'axios';
import Navbar from '../../components/navbar/navbar';
import './drop.css';

const DropRequests = () => {
  const dispatch = useDispatch();
  const { dropRequests, dropLoading, dropError } = useSelector(dropSelector);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDropRequests();
  }, []);

  const fetchDropRequests = async () => {
    dispatch(fetchingDropRequests());
    try {
      const response = await axios.get('http://localhost:3030/api/drops', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(setDropRequests(response.data));
    } catch (error) {
      dispatch(dropRequestError('Failed to fetch drop requests'));
    }
  };

  const approveDropRequest = async (id) => {
    dispatch(approvingDropRequest());
    try {
      await axios.put(
        `http://localhost:3030/api/drops/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(dropRequestApproved(id));
    } catch (error) {
      dispatch(dropRequestError('Failed to approve drop request'));
    }
  };

  const rejectDropRequest = async (id) => {
    dispatch(rejectingDropRequest());
    try {
      await axios.put(
        `http://localhost:3030/api/drops/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(dropRequestRejected(id));
    } catch (error) {
      dispatch(dropRequestError('Failed to reject drop request'));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="drop-main-container">
        <h2>Drop Requests</h2>
        {dropLoading ? <p>Loading...</p> : null}
        {dropError ? <p className="error">{dropError}</p> : null}
        <div className="drop-requests-container">
          {dropRequests.map((request) => (
            <div key={request._id} className="drop-request-box">
              <p>Course: {request.class.title}</p>
              <p>Reason: {request.reason}</p>
              <p>Student ID: {request.student._id}</p>
              <div className="button-group">
                <button
                  className="approve-button"
                  onClick={() => approveDropRequest(request._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-button"
                  onClick={() => rejectDropRequest(request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropRequests;
