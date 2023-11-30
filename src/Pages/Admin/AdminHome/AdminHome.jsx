import { useEffect, useState } from "react";

const AdminHome = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/userRequest")
      .then((res) => res.json())
      .then((data) => setAdmin(data));
  }, []);

  console.log(admin);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
