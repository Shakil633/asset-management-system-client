/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Component/Provider/AuthProvider";


const PrivetRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
  
    if (loading) {
      return (
        <div className=" flex justify-center mt-56">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    }
  
    if (!user?.email) {
      return <Navigate state={location.pathname} to={"/login"}></Navigate>;
    }
  
    return children;
}

export default PrivetRoute;