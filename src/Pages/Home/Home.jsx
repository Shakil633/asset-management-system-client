import { useContext, useEffect, useState } from "react";
import About from "./About/About";
import Banner from "./Banner/Banner";
import Packages from "./Packages/Packages";
import { AuthContext } from "../../Component/Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import LoginHome from "../LoginHome/LoginHome";
import AdminHome from "../Admin/AdminHome/AdminHome";

const Home = () => {
  const { user } = useContext(AuthContext);

  const [admin, setAdmin] = useState();
  useEffect(() => {
    fetch("https://asset-management-system-server-xi.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const adminData = data.find(
          (userData) => userData.email === user?.email
        );

        setAdmin(adminData?.role);

        console.log(adminData?.role);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>Asset || Home</title>
      </Helmet>
      <>
        {admin === "admin" ? (
          <AdminHome></AdminHome>
        ) : admin === "user" ? (
          <LoginHome></LoginHome>
        ) : (
          <>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
          </>
        )}
      </>
    </div>
  );
};

export default Home;
