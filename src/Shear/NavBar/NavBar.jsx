
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Component/Provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [admin, setAdmin] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://asset-management-system-server-xi.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const adminData = data.find((admin) => admin.email === user?.email);

        setAdmin(adminData?.role);

        console.log(adminData?.role);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [user]);

  console.log("admin admin", admin);
  const NavLinks = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/employeePage"}>Employee Page</NavLink>
      </li>
      <li>
        <NavLink to={"/adminPage"}>HR/Admin Page</NavLink>
      </li>
    </>
  );

  const hrAdminLinks = (
    <>
      {/* <li>
        <Link to={"/"}>
          <img
            className="w-10 h-10"
            src="https://i.ibb.co/J77P3Bk/Trimble-Logo.png"
            alt="Company Logo"
          />
        </Link>
      </li> */}
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/assetList"}>Asset List</NavLink>
      </li>
      <li>
        <NavLink to={"/addAsset"}>Add Asset</NavLink>
      </li>
      <li>
        <NavLink to={"/allRequests"}>All Requests</NavLink>
      </li>
      <li>
        <NavLink to={"/customRequestsList"}>Custom Requests List</NavLink>
      </li>
      <li>
        <NavLink to={"/myEmployeeList"}>My Employee List</NavLink>
      </li>
      <li>
        <NavLink to={"/addEmployee"}>Add Employee</NavLink>
      </li>
      <li>
        <NavLink to={"/userProfile"}>Profile</NavLink>
      </li>
    </>
  );

  const loginUser = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/team"}>My Team</NavLink>
      </li>
      <li>
        <NavLink to={"/myAssets"}>My Assets</NavLink>
      </li>
      <li>
        <NavLink to={"/requestAsset"}>Request Asset</NavLink>
      </li>
      <li>
        <NavLink to={"/customRequest"}>Make Custom Request</NavLink>
      </li>
      <li>
        <NavLink to={"/userProfile"}>Profile</NavLink>
      </li>
    </>
  );

  const handleTheme = (event) => {
    setTheme(event.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  // logout section

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("LogOut Successfully");
        navigate("/");
      })
      .catch(() => {
        toast.error("Authentication failed. Please try again");
      });
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbar justify-between  lg:mx-4 lg:px-0">
          <div className="navbar-start mt-3">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content  font-bold mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {user
                  ? admin === "admin"
                    ? hrAdminLinks
                    : loginUser
                  : NavLinks}
              </ul>
            </div>
            <div className="grid space-y-0 p-2">
              {user ? (
                <img
                  className="w-[90px] h-[50px]"
                  src="https://i.ibb.co/Nx44BNC/images-removebg-preview.png"
                  alt=""
                />
              ) : (
                <img
                  className="w-[220px] h-[45px]"
                  src="https://i.ibb.co/vDsD7SH/aegon-asset-management-logo-A1-EB33-E5-AF-seeklogo-com.png"
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu font-bold menu-horizontal px-1">
              {user ? (admin === "admin" ? hrAdminLinks : loginUser) : NavLinks}
            </ul>
          </div>

          {/* navbar light  */}
          <div className="navbar-end">
            <div className="flex items-center gap-3">
              <div className="pt-2">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={handleTheme}
                  />
                  <svg
                    className="swap-on fill-current w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {/* Add sun icon path here */}
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>
                </label>
              </div>
              <div>
                {user?.email ? (
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img
                          className="bg-slate-500 "
                          src={user.photoURL}
                          alt={user.displayName}
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button className="btn btn-sm ">
                          {user.displayName}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="btn btn-sm  btn-ghost font-bold text-red-500"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link to="/login">
                    <button className="btn  p-2 bg-gray-300 text-center font-bold text-green-800">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

