import logo from "./logo.svg";
import "./App.css";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Register from "./pages/register/register.jsx";
import Login from "./pages/login/login.jsx";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
