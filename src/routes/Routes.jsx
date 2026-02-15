import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import RoleBasedDashboard from "../Pages/Dashboard/RoleBasedDashboard";
import CreateDonationRequest from "../Pages/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/MyDonationRequests/MyDonationRequests";
import ViewDonationRequest from "../Pages/Dashboard/ViewDonationRequest/ViewDonationRequest";
import EditDonationRequest from "../Pages/Dashboard/EditDonationRequest/EditDonationRequest";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AllDonationRequestsAdmin from "../Pages/Dashboard/AllDonationRequestsAdmin/AllDonationRequestsAdmin";

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
        element: <ViewDonationRequest />,
      },
      {
        path: 'edit-donation-request/:id',
        element: <EditDonationRequest />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'all-donation-requests',
        element: <AllDonationRequestsAdmin />,
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