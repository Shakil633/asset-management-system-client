import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

const LoginHome = () => {
  const [requastData, setRequastData] = useState([]);
  const [requests, setSelectedRequest] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5050/requestsCustom")
      .then((res) => res.json())
      .then((data) => setRequastData(data));
  }, []);

  const openDetailView = (request) => {
    setSelectedRequest(request);
    setEditMode(false);
    if (modalRef.current && !modalRef.current.open) {
      modalRef.current.showModal();
    }
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeDetails = () => {
    setSelectedRequest(null);
    setEditMode(false);
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const saveChanges = () => {
    // Implement logic to save changes to the server if needed
    setEditMode(false);
  };

  const renderActionButton = () => {
    if (editMode) {
      return (
        <>
          <button className="btn btn-success btn-sm" onClick={saveChanges}>
            Save
          </button>
          <button className="btn btn-danger btn-sm" onClick={closeDetails}>
            Cancel
          </button>
        </>
      );
    } else {
      return (
        <button className="btn btn-emerald-700 btn-sm" onClick={openEditMode}>
          Update
        </button>
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Employee || Home</title>
      </Helmet>
      <div className="overflow-x-auto">
        <h2 className="text-3xl text-center font-semibold py-4 ">
          My Custom Requests
        </h2>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Asset name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requastData.map((requests, index) => (
              <tr key={requests._id}>
                <th>{index + 1}</th>
                <td>{requests.assetName}</td>
                <td>$ {requests.price}</td>
                <td>{requests.assetType}</td>
                <td className="text-yellow-500 font-bold">{requests.status}</td>
                <td>
                  <button
                    className="btn btn-sm bg-emerald-700"
                    onClick={() => openDetailView(requests)}
                  >
                    View Details
                  </button>
                  {requests && (
                    <dialog
                      ref={modalRef}
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h2>Asset name: {requests.assetName}</h2>
                        <h2>Price: $ {requests.price}</h2>
                        <h2>Type: {requests.assetType}</h2>
                        <img
                          className="w-28 mx-auto py-2"
                          src={requests.image}
                          alt=""
                        />
                        <h2>Why needed: {requests.whyneed}</h2>
                        <h2>
                          Additional information: {requests.addInformation}
                        </h2>
                        <h2>Request date: {requests.approvedDate}</h2>
                        <h2>Status: {requests.status}</h2>
                        {renderActionButton()}
                      </div>
                    </dialog>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LoginHome;
