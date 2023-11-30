// import { useLoaderData } from "react-router-dom";

// const MyAssets = () => {
//   const myAssetRequest=useLoaderData()
//   console.log(myAssetRequest);

//   return (
//     <div>

//     </div>
//   );
// };

// export default MyAssets;
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const MyAsset = () => {
  const initialData = useLoaderData();
  console.log(initialData);

  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    // Set initial data to updateData
    setUpdateData(initialData);
  }, [initialData]);

  const handleDelete = (_id) => {
    const URL = `http://localhost:5050/userRequest/${_id}`;
    fetch(URL, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });

          const filteredData = updateData.filter((item) => item._id !== _id);
          setUpdateData(filteredData);
        }
      });
  };

  return (
    <>
     <Helmet>
        <title>Employee || MyAsset</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Request Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {updateData.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <td>{request.name}</td>
                <td>{request.assetType}</td>
                <td>{request.requastDate}</td>
                <td>{request.approvedDate}</td>
                <td>{request.status}</td>
                <td>
                  {
                    <button
                      onClick={() => handleDelete(request._id)}
                      className="btn btn-sm"
                      disabled={
                        !(
                          request.status === "Pending" ||
                          request.status === "Reject"
                        )
                      }
                    >
                      Cancel Request
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyAsset;
