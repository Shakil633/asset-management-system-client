import { Outlet, useLoaderData } from "react-router-dom";
import NavBar from "../Shear/NavBar/NavBar";
import Footer from "../Shear/Footer/Footer";

const Main = () => {
  const dataLoad=useLoaderData()
  return (
    <div>
      <NavBar dataLoad={dataLoad}></NavBar>
      <div className=" min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Main;
