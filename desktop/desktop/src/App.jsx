// import React from 'react';
// import { Provider } from 'react-redux';

// import store from './data-store/redux/store';

// import Login from './pages/login/login.jsx';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // const router = createBrowserRouter(
// //   createRoutesFromElements(
// //     <>
// //       <Route path="/" element={<Login />} />
// //     </>
// //   )
// // );

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="App">
//         <Login />
//         <ToastContainer position="top-right" />
//       </div>
//     </Provider>
//   );
// }

// export default App;
import React from 'react';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import store from './data-store/redux/store';

import Login from './pages/login/login.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from '././pages/admin/admin.jsx';
import DropNotifications from './pages/drop/drop.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<AdminPage />} />
      <Route path="/drop" element={<DropNotifications />} />
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
