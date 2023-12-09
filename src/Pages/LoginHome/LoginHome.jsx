// import { useState, useEffect, useRef } from "react";
// import { Helmet } from "react-helmet-async";

// const LoginHome = () => {
//   const [requastData, setRequastData] = useState([]);
//   const [requests, setSelectedRequest] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const modalRef = useRef(null);

//   useEffect(() => {
//     fetch("https://asset-management-system-server-xi.vercel.app/requestsCustom")
//       .then((res) => res.json())
//       .then((data) => setRequastData(data));
//   }, []);

//   const openDetailView = (request) => {
//     setSelectedRequest(request);
//     setEditMode(false);
//     if (modalRef.current && !modalRef.current.open) {
//       modalRef.current.showModal();
//     }
//   };

//   const openEditMode = () => {
//     setEditMode(true);
//   };

//   const closeDetails = () => {
//     setSelectedRequest(null);
//     setEditMode(false);
//     if (modalRef.current) {
//       modalRef.current.close();
//     }
//   };

//   const saveChanges = () => {
//     // Implement logic to save changes to the server if needed
//     setEditMode(false);
//   };

//   const renderActionButton = () => {
//     if (editMode) {
//       return (
//         <>
//           <button className="btn btn-success btn-sm" onClick={saveChanges}>
//             Save
//           </button>
//           <button className="btn btn-danger btn-sm" onClick={closeDetails}>
//             Cancel
//           </button>
//         </>
//       );
//     } else {
//       return (
//         <button className="btn btn-emerald-700 btn-sm" onClick={openEditMode}>
//           Update
//         </button>
//       );
//     }
//   };

//   return (
//     <>
//       <Helmet>
//         <title>Employee || Home</title>
//       </Helmet>
//       <div className="overflow-x-auto">
//         <h2 className="text-3xl text-center font-semibold py-4 ">
//           My Custom Requests
//         </h2>
//         <table className="table table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Asset name</th>
//               <th>Price</th>
//               <th>Type</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requastData.map((requests, index) => (
//               <tr key={requests._id}>
//                 <th>{index + 1}</th>
//                 <td>{requests.assetName}</td>
//                 <td>$ {requests.price}</td>
//                 <td>{requests.assetType}</td>
//                 <td className="text-yellow-500 font-bold">{requests.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm bg-emerald-700"
//                     onClick={() => openDetailView(requests)}
//                   >
//                     View Details
//                   </button>
//                   {requests && (
//                     <dialog
//                       ref={modalRef}
//                       id="my_modal_5"
//                       className="modal modal-bottom sm:modal-middle"
//                     >
//                       <div className="modal-box">
//                         <h2>Asset name: {requests.assetName}</h2>
//                         <h2>Price: $ {requests.price}</h2>
//                         <h2>Type: {requests.assetType}</h2>
//                         <img
//                           className="w-28 mx-auto py-2"
//                           src={requests.image}
//                           alt=""
//                         />
//                         <h2>Why needed: {requests.whyneed}</h2>
//                         <h2>
//                           Additional information: {requests.addInformation}
//                         </h2>
//                         <h2>Request date: {requests.approvedDate}</h2>
//                         <h2>Status: {requests.status}</h2>
//                         {renderActionButton()}
//                       </div>
//                     </dialog>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default LoginHome;

import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

const LoginHome = () => {
  const [requastData, setRequastData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    fetch("https://asset-management-system-server-xi.vercel.app/requestsCustom")
      .then((res) => res.json())
      .then((data) => setRequastData(data));
  }, []);

  if (requastData.length === 0) {
    return (
      <>
        <Helmet>
          <title>Employee || Home</title>
        </Helmet>
        <div>No data found</div>
      </>
    );
  }

  const pendingRequests = requastData.filter(request => request.status === 'pending');

  const currentDate = new Date();
  const currentMonthRequests = requastData.filter(request => {
    const requestDate = new Date(request.approvedDate);
    return (
      requestDate.getMonth() === currentDate.getMonth() &&
      requestDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Placeholder logic for frequently requested items (replace with your actual implementation)
  const frequentlyRequestedItems = [];

  const isUserInTeam = true; // Placeholder logic to check if the user is in a team

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
        <h2 className="text-3xl text-center font-semibold py-4">
          My Custom Requests
        </h2>
        <table className="table table-zebra">
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
            {requastData.map((request, index) => (
              <tr key={request._id}>
                <th>{index + 1}</th>
                <td>{request.assetName}</td>
                <td>$ {request.price}</td>
                <td>{request.assetType}</td>
                <td className="text-yellow-500 font-bold">{request.status}</td>
                <td>
                  <button
                    className="btn btn-sm bg-emerald-700"
                    onClick={() => openDetailView(request)}
                  >
                    View Details
                  </button>
                  {request && (
                    <dialog
                      ref={modalRef}
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h2>Asset name: {request.assetName}</h2>
                        <h2>Price: $ {request.price}</h2>
                        <h2>Type: {request.assetType}</h2>
                        <img
                          className="w-28 mx-auto py-2"
                          src={request.image}
                          alt=""
                        />
                        <h2>Why needed: {request.whyneed}</h2>
                        <h2>
                          Additional information: {request.addInformation}
                        </h2>
                        <h2>Request date: {request.approvedDate}</h2>
                        <h2>Status: {request.status}</h2>
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
      <div>
        <h2>Pending Requests</h2>
        {/* Display pending requests here */}
      </div>
      <div>
        <h2>Monthly Requests</h2>
        {/* Display monthly requests here */}
      </div>
      <div>
        <h2>Frequently Requested Items</h2>
        {/* Display frequently requested items here */}
      </div>
      {!isUserInTeam && (
        <div>
          <p>Contact your HR for more information.</p>
        </div>
      )}
    </>
  );
};

export default LoginHome;

