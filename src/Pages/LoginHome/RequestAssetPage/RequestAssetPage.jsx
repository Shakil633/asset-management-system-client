///
import { useState, useEffect, useContext } from "react";

import axios from "axios";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Component/Provider/AuthProvider";

const RequestAssetPage = () => {
  const [requestData, setRequestData] = useState([]);
  const [note, setNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://asset-management-system-server-xi.vercel.app/assetAdd")
      .then((response) => {
        setRequestData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSendAdmin = (request) => {
    const { name, assetType, stock } = request;
    const requastDate = new Date();

    axios
      .post(
        "https://asset-management-system-server-xi.vercel.app/userRequest",
        {
          name,
          assetType,
          stock,
          userEmail: user.email,
          displayName: user.displayName,
          note,
          status: selectedStatus,
          requastDate: requastDate.toISOString(),
        }
      )
      .then((response) => {
        console.log(response.data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your data added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById(`my_modal_${request._id}`).close();
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to add data");
      });
  };

  if (!requestData || requestData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Availability</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {requestData.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <th>{request.name}</th>
                <td>{request.assetType}</td>
                <td>{request.stock}</td>

                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      document
                        .getElementById(`my_modal_${request._id}`)
                        .showModal()
                    }
                  >
                    Request Asset
                  </button>
                  <dialog id={`my_modal_${request._id}`} className="modal">
                    <div className="modal-box">
                      <th>{request.name}</th>
                      <h3 className="font-bold text-lg">Additional Notes</h3>

                      <textarea
                        name="note"
                        type="note"
                        className="textarea textarea-primary"
                        placeholder="Additional Notes"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      ></textarea>
                      <div className="modal-action">
                        <form method="dialog">
                          <button
                            className="btn btn-sm bg-green-500 text-black"
                            onClick={() =>
                              document
                                .getElementById(`my_modal_${request._id}`)
                                .close()
                            }
                          >
                            Close
                          </button>
                          <button
                            onClick={() => handleSendAdmin(request)}
                            className="btn btn-sm btn-primary ml-4"
                          >
                            Submit Request
                          </button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RequestAssetPage;
