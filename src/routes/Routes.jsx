import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import DonorDashboard from "../Pages/Dashboard/DonorDashboard/DonorDashboard";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import VolunteerDashboard from "../Pages/Dashboard/VolunteerDashboard/VolunteerDashboard";
import RoleBasedDashboard from "../Pages/Dashboard/RoleBasedDashboard";

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
        index: true,
        element: <RoleBasedDashboard />, // ✅ This will render the correct dashboard based on role
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