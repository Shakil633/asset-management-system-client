import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../Pages/Home/Home";
import SingUp from "../Pages/FromEmployee/SingUp";
import AdminSingUp from "../Pages/FromAdmin/AdminSingUp";
import LoginPage from "../Pages/LoginPage/LoginPage";
import AddAsset from "../Pages/Admin/AddAsset/AddAsset";
import AssetList from "../Pages/Admin/AssetList/AssetList";
import AssetListUpdate from "../Pages/AssetListUpdate/AssetListUpdate";
import LoginHome from "../Pages/LoginHome/LoginHome";
import MyAssets from "../Pages/LoginHome/MyAssetsPage/MyAssets";
import RequestAssetPage from "../Pages/LoginHome/RequestAssetPage/RequestAssetPage";
import AllRequest from "../Pages/Admin/AllRequest/AllRequest";
import UserProfile from "../Pages/LoginHome/UserProfile/UserProfile";
import UserUpdateProfile from "../Pages/LoginHome/UserUpdateProfile/UserUpdateProfile";
import CustomRequest from "../Pages/LoginHome/CustomRequest/CustomRequest";
import CustomList from "../Pages/Admin/CustomList/CustomList";
import Payment from "../Pages/Admin/Payment/Payment";
import MyEmployeeList from "../Pages/Admin/MyEmployeeList/MyEmployeeList";
import AddEmployee from "../Pages/Admin/AddEmployee/AddEmployee";
import Team from "../Pages/LoginHome/Team/Team";
import PrivetRoute from "../Pages/PrivetRoute/PrivetRoute";
import AdminHome from "../Pages/Admin/AdminHome/AdminHome";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    loader: () => fetch("http://localhost:5050/users"),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/loginHome",
        element: <LoginHome></LoginHome>,
      },

      {
        path: "/myAssets",
        element: <MyAssets></MyAssets>,
        loader: () => fetch("http://localhost:5050/userRequest"),
      },
      {
        path: "/requestAsset",
        element: <RequestAssetPage></RequestAssetPage>,
        // loader: () => fetch("http://localhost:5050/assetAdd"),
      },
      {
        path: "/userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/userProfile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/userUpdate/:id",
        element: <UserUpdateProfile></UserUpdateProfile>,
        loader: ({ params }) =>
          fetch(`http://localhost:5050/users/${params.id}`),
      },
      {
        path: "/customRequest",
        element: <CustomRequest></CustomRequest>,
      },
      {
        path: "/team",
        element: <Team></Team>,
      },
      // admin route
      {
        path: "/adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "/addAsset",
        element: <AddAsset></AddAsset>,
      },
      {
        path: "/assetList",
        element: <AssetList></AssetList>,
      },
      {
        path: "/assetListUpdate/:id",
        element: <AssetListUpdate></AssetListUpdate>,
        loader: ({ params }) =>
          fetch(`http://localhost:5050/assetAdd/${params.id}`),
      },
      {
        path: "/allRequests",
        element: <AllRequest></AllRequest>,
        // loader:()=> fetch('http://localhost:5050/userRequest')
      },
      {
        path: "/customRequestsList",
        element: <CustomList></CustomList>,
      },
      {
        path: "/payment",
        element: (
          <PrivetRoute>
            <Payment></Payment>
          </PrivetRoute>
        ),
      },
      {
        path: "/myEmployeeList",
        element: <MyEmployeeList></MyEmployeeList>,
        loader: () => fetch("http://localhost:5050/adminAdd"),
      },
      {
        path: "/addEmployee",
        element: <AddEmployee></AddEmployee>,
        loader: () => fetch("http://localhost:5050/users"),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/employeePage",
    element: <SingUp></SingUp>,
  },
  {
    path: "/adminPage",
    element: <AdminSingUp></AdminSingUp>,
  },
]);

export default Route;
