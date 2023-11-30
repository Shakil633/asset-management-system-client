import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Packages = () => {
  const [packages, setPackage] = useState([]);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setPackage(data));
  }, []);

  console.log("dddddddddd", packages);

  return (
    <div className="mt-20 px-10 mb-20">
      <h2 className=" lg:text-4xl md:text-4xl text-xl font-bold mb-5">Packages Section:</h2>
      <div className=" grid lg:grid-cols-3 md:grid-cols-3 grid-1 gap-5">
        {packages.map((data) => (
          <div key={data.id}>
            <div className=" ">
              <div className="card bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{data.description}</h2>
                  <p className=" font-medium">Price: ${data.price}</p>
                  <div className="card-actions justify-end">
                    <Link to={'/payment'}><button className="btn font-semibold">Select Packages</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
