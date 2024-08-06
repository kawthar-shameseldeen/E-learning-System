import React from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import store from "./data-store/redux/store";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
import Courses from "./pages/home/home.jsx";
import EnrolledCourses from "./pages/enrolledClasses/enrolled.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Courses />} />
      <Route path="/myCourses" element={<EnrolledCourses />} />
    </>
  )
);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer position="top-right" />
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
