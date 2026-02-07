import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout"; // ✅ Keep your path
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // ✅ FIXED: Changed Component to element
    children: [
      {
        path: "/",
        element: <Home />, // ✅ FIXED: Changed Component to element
      },
      {
        path: "/login",
        element: <Login />, // ✅ FIXED: Changed Component to element and added JSX
      },
      {
        path: "/register", // ✅ FIXED: Changed from /signup to /register
        element: <Register />, // ✅ FIXED: Changed Component to element and added JSX
      },
    ],
  },
]);

export default router;
