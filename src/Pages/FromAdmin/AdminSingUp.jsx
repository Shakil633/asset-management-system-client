import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useContext } from "react";
import { AuthContext } from "../../Component/Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import Navbar from "../../Shear/NavBar/NavBar";

const AdminSignUp = () => {
  const { userSingUp, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const allPackage = [
    { price: 5, details: "5 members for $5", type: "Basic" },
    { price: 10, details: "10 members for $8", type: "Premium" },
    { price: 20, details: "20 members for $10", type: "Professional" },
  ];
  const handleAdminSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.fullName.value;
    const companyName = form.companyName.value;
    const companyLogo = form.companyLogo.value;
    const img = e.target.image.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const selectedPackage = form.package.value;

    const adminInfo = {
      name,
      companyName,
      companyLogo,
      email,
      img,
      password,
      dateOfBirth,
      selectedPackage: allPackage[parseInt(selectedPackage)],
      role: "admin",
      packageLimit: null,
    };
    console.log(adminInfo);

    userSingUp(email, password)
      .then(() => {
        updateUserProfile(name, img);
        fetch("https://asset-management-system-server-xi.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(adminInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            navigate("/payment");
          });
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Helmet>
          <title>Asset || Admin SingUp</title>
        </Helmet>
        <div className="join-page min-h-screen bg-base-200">
          <div className="hero-content flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-5">Join as HR/Admin Page</h1>
            </div>
            <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
              <form onSubmit={handleAdminSignUp} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Logo URL</span>
                  </label>
                  <input
                    type="url"
                    name="companyLogo"
                    placeholder="Company Logo URL"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image Url</span>
                  </label>
                  <input
                    type="text"
                    placeholder="image url"
                    className="input input-bordered"
                    name="image"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select a Package</span>
                  </label>
                  <select
                    name="package"
                    className="select select-bordered"
                    required
                  >
                    <option value="" disabled selected>
                      Select a package
                    </option>
                    <option value="0">5 Members for $5</option>
                    <option value="1">10 Members for $8</option>
                    <option value="2">20 Members for $15</option>
                  </select>
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Sign Up"
                  />
                </div>
              </form>
              <p className=" text-center">
                <small>
                  Already have an account
                  <Link className=" text-yellow-600" to="/login">
                    {" "}
                    Login
                  </Link>
                </small>
              </p>
              <div className=" text-center my-5">
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
