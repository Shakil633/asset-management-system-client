import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const MyEmployeeList = () => {
  const addData = useLoaderData();
  const [assetList, setAssetList] = useState(addData);

  const handleDelete = (id) => {
    const URL = `https://asset-management-system-server-xi.vercel.app
/adminAdd/${id}`;
    fetch(URL, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "top-enter",
            icon: "success",
            title: "Data deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          const filteredData = assetList.filter((item) => item._id !== id);
          setAssetList(filteredData);
        } else {
          console.error("Failed to delete employee. Status:", res.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
      });
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-4xl text-red-700">My Employee</h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl no</th>
                  <th>Image of the member</th>
                  <th>Name of the member</th>
                  <th>Member Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {assetList.map((list, index) => (
                  <tr key={list._id}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        className="w-20 rounded-full"
                        src={list.img}
                        alt=""
                      />
                    </td>
                    <td>{list.name}</td>
                    <td>{list.role}</td>
                    <th>
                      <button
                        className="btn btn-sm bg-emerald-600 text-white"
                        onClick={() => handleDelete(list._id)}
                      >
                        Remove from team
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEmployeeList;
