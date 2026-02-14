import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true, // ✅ FIXED: Changed from 'main' to index route
        element: <MainDashboard />,
      },
      {
        path: 'all-users',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">All Users</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'all-donation-requests',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">All Donation Requests</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'content-management',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'statistics',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Statistics</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'funding',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Funding</h1>
          <p>Coming soon...</p>
        </div>,
      },
    ]
  }
]);

export default router;