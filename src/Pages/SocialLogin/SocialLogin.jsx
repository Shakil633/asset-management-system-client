import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Component/Provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleSingIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSingIn = () => {
    googleSingIn()
      .then(() => {
        toast.success("Login successfully");
        navigate(location?.state ? location.state : "/");

        // new user has been social login
        //  const user = { email };
        // fetch(
        //   "https://technology-and-electronics-server-beige.vercel.app/user",
        //   {
        //     method: "POST",
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //     body: JSON.stringify(res.user),
        //   }
        // )
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data);
        //   });
      })
      .catch(() => {
        toast.error("Authentication failed. Please try again.");
      });
  };

  return (
    <div>
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSingIn} className="btn  btn-neutral">
          <FaGoogle />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
