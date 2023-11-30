// // import { Link } from "react-router-dom";

// // const NavBar = () => {
// //   //    const { user, logOut } = useContext(AuthContext);
// //   //   const [cart] = UseCart();
// //   //   const [isAdmin] = useAdmin();

// //   // const handleLogOut = () => {
// //   //   logOut()
// //   //     .then((results) => {
// //   //       const user = results.user;
// //   //       console.log(user);
// //   //     })
// //   //     .catch((error) => {
// //   //       const errorMessage = error.message;
// //   //       console.log(errorMessage);
// //   //     });
// //   // };

// //   const navOption = (
// //     <>
// //       <li>
// //         <Link to={"/"}>Home</Link>
// //       </li>
// //       <li>
// //         <Link to={"/employeePage"}>Employee Page</Link>
// //       </li>
// //       <li>
// //         <Link to={"/adminPage"}>HR/Admin Page</Link>
// //       </li>
// //       {/* <li>
// //         <Link to={"/secret"}>Secret</Link>
// //       </li> */}
// //       <>
// //         {/* <span>{user?.displayName}</span> */}
// //         <button>LogOut</button>
// //       </>
// //       (
// //       <>
// //         <li>
// //           <Link to={"/login"}>Login</Link>
// //         </li>
// //       </>
// //       )
// //     </>
// //   );
// //   return (
// //     <div>
// //       <div className="navbar z-10 fixed opacity-60 text-white bg-black max-w-screen-lg mx-auto">
// //         <div className="navbar-start">
// //           <div className="dropdown">
// //             <label tabIndex={0} className="btn btn-ghost lg:hidden">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-5 w-5"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth="2"
// //                   d="M4 6h16M4 12h8m-8 6h16"
// //                 />
// //               </svg>
// //             </label>
// //             <ul
// //               tabIndex={0}
// //               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
// //             >
// //               {navOption}
// //             </ul>
// //           </div>
// //           <a className="btn btn-ghost normal-case text-xl">Bistro Boss</a>
// //         </div>
// //         <div className="navbar-center hidden lg:flex">
// //           <ul className="menu menu-horizontal px-1">{navOption}</ul>
// //         </div>
// //         <div className="navbar-end">
// //           <a className="btn">Profile</a>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NavBar;

// ///

// import { Link, NavLink } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Component/Provider/AuthProvider";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const { user, logOutUser } = useContext(AuthContext);

//   const [theme, setTheme] = useState(
//     localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
//   );
//   // const user = true;

//   //
//   const [admin, setAdmin] = useState();

//   useEffect(() => {
//     fetch("http://localhost:5050/users")
//       .then((res) => res.json())
//       .then((data) => setAdmin(data));
//   }, []);
//   console.log(admin);

//   const links = (
//     <>
//       <>
//         <li>
//           <NavLink to={"/"}>Home</NavLink>
//         </li>
//         <li>
//           <NavLink to={"/employeePage"}>Employee Page</NavLink>
//         </li>
//         <li>
//           <NavLink to={"/adminPage"}>HR/Admin Page</NavLink>
//         </li>
//       </>
//     </>
//   );

//   const loggedInLinks = (
//     <>
//       <li>
//         <NavLink to={"/"}>Home</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/team"}>My Team</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/myAssets"}>My Assets</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/requestAsset"}> Request Asset</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/customRequest"}>Make Custom Request</NavLink>
//       </li>
//       <li>
//         <NavLink to={"/profile"}>Profile</NavLink>
//       </li>
//     </>
//   );

//   const handleTheme = (event) => {
//     if (event.target.checked) {
//       setTheme("dark");
//     } else {
//       setTheme("light");
//     }
//   };
//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//     const localTheme = localStorage.getItem("theme");
//     document.querySelector("html").setAttribute("data-theme", localTheme);
//   }, [theme]);

//   // logout section

//   const handleLogOut = () => {
//     logOutUser()
//       .then(() => {
//         toast.success("LogOut Successfully");
//       })
//       .catch(() => {
//         toast.error("Authentication failed. Please try again");
//       });
//   };

//   return (
//     <div>
//       <div className="navbar">
//         <div className="navbar justify-between  lg:mx-4 lg:px-0">
//           <div className="navbar-start mt-3">
//             <div className="dropdown">
//               <label tabIndex={0} className="btn btn-ghost md:hidden">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h8m-8 6h16"
//                   />
//                 </svg>
//               </label>
//               <ul
//                 tabIndex={0}
//                 className="menu menu-sm dropdown-content  font-bold mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
//               >
//                 {user ? loggedInLinks : links}
//               </ul>
//             </div>
//             <div className="grid space-y-0 p-2">
//               {user ? (
//                 !user
//               ) : (
//                 <img
//                   className="w-[220px] h-[45px]"
//                   src="https://i.ibb.co/vDsD7SH/aegon-asset-management-logo-A1-EB33-E5-AF-seeklogo-com.png"
//                   alt=""
//                 />
//               )}

//               {!user ? (
//                 user
//               ) : (
//                 <img
//                   className="w-[160px] h-[50px]"
//                   src="https://i.ibb.co/Nx44BNC/images-removebg-preview.png"
//                   alt=""
//                 />
//               )}
//             </div>
//           </div>
//           <div className="navbar-center hidden md:flex">
//             <ul className="menu font-bold menu-horizontal px-1">
//               {user ? loggedInLinks : links}
//             </ul>
//           </div>

//           {/* navbar light  */}
//           <div className="navbar-end">
//             <div className="flex items-center gap-3">
//               <div className="pt-2">
//                 <label className="swap swap-rotate">
//                   {/* this hidden checkbox controls the state */}
//                   <input
//                     type="checkbox"
//                     checked={theme === "light" ? false : true}
//                     onChange={handleTheme}
//                   />

//                   {/* sun icon */}
//                   <svg
//                     className="swap-on fill-current w-10 h-10"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
//                   </svg>

//                   {/* moon icon */}
//                   <svg
//                     className="swap-off fill-current w-10 h-10"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
//                   </svg>
//                 </label>
//               </div>

//               <div>
//                 {user?.email ? (
//                   <div className="dropdown dropdown-end">
//                     <label
//                       tabIndex={0}
//                       className="btn btn-ghost btn-circle avatar"
//                     >
//                       <div className="w-10 rounded-full">
//                         <img
//                           className="bg-slate-500 "
//                           src={user.photoURL}
//                           alt={user.displayName}
//                         />
//                       </div>
//                     </label>
//                     <ul
//                       tabIndex={0}
//                       className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
//                     >
//                       <li>
//                         <button className="btn btn-sm ">
//                           {user.displayName}
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           onClick={handleLogOut}
//                           className="btn btn-sm  btn-ghost font-bold text-red-500"
//                         >
//                           Logout
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 ) : (
//                   <Link to="/login">
//                     <button className="btn  p-2 bg-gray-300 text-center font-bold text-green-800">
//                       Login
//                     </button>
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

////

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
  const navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:5050/users")
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

  // const [loginUser, setLoginUser] = useState({});
  // useEffect(() => {
  //   const data = users.find((item) => item.email === user?.email);
  //   setLoginUser(data);
  // }, [user]);

  // const [loginUser, setLoginUser] = useState({});
  // useEffect(() => {
  //   const data = admin.find((item) => item.email === user?.email);
  //   setLoginUser(data);
  // }, []);

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
        navigate('/')

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
              { user ?  (
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
              {user
                ? admin === "admin"
                  ? hrAdminLinks
                  : loginUser
                : NavLinks}
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

//////

// final kaj kam
// import { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../Component/Provider/AuthProvider";

// const NavBar = () => {
//   const { user, logOutUser } = useContext(AuthContext);

//   const [adminRole, setAdminRole] = useState();
//   useEffect(() => {
//     fetch("http://localhost:5050/users")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("admin role", data);

//         const adminData = data.find(
//           (adminRole) => adminRole.email === user?.email
//         );

//         console.log(adminData);

//         setAdminRole(adminData?.role);
//         console.log("admin role", adminData?.role);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [user]);

//   console.log("role", adminRole);

//   const handleLogOut = () => {
//     logOutUser()
//       .then(() => {})
//       .catch((error) => console.log(error));
//   };

//   const navOptions = (
//     <>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/employeePage">Join as Employee</Link>
//       </li>
//       <li>
//         <Link to="/adminPage">Join as HR/Admin</Link>
//       </li>
//       <li>
//         <Link to="/login">Login</Link>
//       </li>
//     </>
//   );

//   const hrAdminLinks = (
//     <>
//       <li>
//         <Link to="/">Admin Home</Link>
//       </li>
//       <li>
//         <Link to="/">ATeam</Link>
//       </li>
//       <li>
//         <Link to="/"> AAssets</Link>
//       </li>
//       <li>
//         <Link to="/">ARequest Asset</Link>
//       </li>
//       <li>
//         <Link to="/">AMake Custom Request</Link>
//       </li>
//       <li>
//         <Link to="/">Admin Profile</Link>
//       </li>
//       <button onClick={handleLogOut} className="btn btn-ghost">
//         LogOut
//       </button>
//     </>
//   );

//   const userLinks = (
//     <>
//       <li>
//         <Link to="">Home</Link>
//       </li>
//       <li>
//         <Link to="/">My Team</Link>
//       </li>
//       <li>
//         <Link to="/">My Assets</Link>
//       </li>
//       <li>
//         <Link to="/">Request Asset</Link>
//       </li>
//       <li>
//         <Link to="/">Make Custom Request</Link>
//       </li>
//       <li>
//         <Link to="/">Profile</Link>
//       </li>
//       <button onClick={handleLogOut} className="btn btn-ghost">
//         LogOut
//       </button>
//     </>
//   );

//   return (
//     <>
//       <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
//         <div className="navbar-start">
//           <div className="dropdown">
//             <label tabIndex={0} className="btn btn-ghost lg:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h8m-8 6h16"
//                 />
//               </svg>
//             </label>
//             <ul
//               tabIndex={0}
//               className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box"
//             >
//               {user
//                 ? adminRole === "admin"
//                   ? hrAdminLinks
//                   : userLinks
//                 : navOptions}
//             </ul>
//           </div>

//           {user ? (
//             <img
//               className="w-60"
//               src="https://www.vhv.rs/dpng/d/407-4070655_walt-disney-company-logo-png-transparent-png.png"
//               alt="Asset Management e"
//             />
//           ) : (
//             <img
//               className="w-60"
//               src="https://i.ibb.co/T4d8HVm/1.png"
//               alt="Asset Management System"
//             />
//           )}
//         </div>
//         <div className="navbar-center hidden lg:flex">
//           <ul className="menu menu-horizontal px-1">
//             {user
//               ? adminRole === "admin"
//                 ? hrAdminLinks
//                 : userLinks
//               : navOptions}
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NavBar;
