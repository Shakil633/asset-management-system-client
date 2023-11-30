// UserProfile.js

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Component/Provider/AuthProvider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  const [update, setUpdate] = useState();
  useEffect(() => {
    fetch(`http://localhost:5050/userProfile/${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUpdate(data));
  }, [user?.email]);

  console.log("ffffffffffff", update);

  return (
    <div>
      <Helmet>
        <title>Employee || Profile</title>
      </Helmet>
      <div className="card w-96 mx-auto bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={update?.img} alt="" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{update?.name}</h2>
          <div className="card-actions">
            <Link to={`/userUpdate/${update?._id}`}>
              <button className="btn btn-primary">Update</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
