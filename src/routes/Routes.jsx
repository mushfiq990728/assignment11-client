import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import RoleBasedDashboard from "../Pages/Dashboard/RoleBasedDashboard";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";

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
        element: <RoleBasedDashboard />,
      },
      {
        path: 'create-donation-request',
        element: <CreateDonationRequest />,
      },
      {
        path: 'my-donation-requests',
        element: <MyDonationRequests />,
      },
      {
        path: 'donation-request/:id',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Donation Request Details</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'edit-donation-request/:id',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Edit Donation Request</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'profile',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <p>Coming soon...</p>
        </div>,
      },
      {
        path: 'all-users',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">All Users</h1>
          <p>Coming soon in Step 6...</p>
        </div>,
      },
      {
        path: 'all-donation-requests',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">All Donation Requests</h1>
          <p>Coming soon in Step 6...</p>
        </div>,
      },
      {
        path: 'content-management',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Content Management</h1>
          <p>Coming soon in Step 7...</p>
        </div>,
      },
      {
        path: 'statistics',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Statistics</h1>
          <p>Coming soon in Step 7...</p>
        </div>,
      },
      {
        path: 'funding',
        element: <div className="bg-white rounded-xl shadow-md p-6">
          <h1 className="text-2xl font-bold">Funding</h1>
          <p>Coming soon in Step 7...</p>
        </div>,
      },
    ]
  }
]);

export default router;