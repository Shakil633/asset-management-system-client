// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";



// const CustomList = () => {
//   // State variables
//   const [allData, setAllData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from the server
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5050/requestsCustom");
//       console.log("Response:", response.data);
//       setAllData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching data:", error.message);
//       setError("Error fetching data. Please try again.");
//       setLoading(false);
//     }
//   };

//   // useEffect to fetch data on component mount
//   useEffect(() => {
//     console.log("Fetching data...");
//     fetchData();
//   }, []); // Empty dependency array means this effect runs once on mount

//   // Function to handle updating the status of a request
//   const handleUpdateStatus = async (requestId, newStatus) => {
//     try {
//       let updateData = { status: newStatus };

//       // Add the approvedDate when updating to 'Approve'
//       if (newStatus === "Approve") {
//         updateData = { ...updateData, approvedDate: new Date().toISOString() };
//       }

//       console.log("Update Data:", updateData);

//       const response = await axios.put(
//         `http://localhost:5050/requestsCustom/${requestId}`,
//         updateData
//       );

//       if (!response.data) {
//         throw new Error(`Error updating status. Request not found`);
//       }

//       setAllData((prevData) =>
//         prevData.map((request) =>
//           request._id === requestId ? { ...request, ...updateData } : request
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error.message);
//     }
//   };

//   // Functions to handle approving and rejecting a request
//   const handleApprove = (requestId) => {
//     handleUpdateStatus(requestId, "Approve");
//   };

//   const handleReject = (requestId) => {
//     handleUpdateStatus(requestId, "Reject");
//   };

//   return (
//     <div>
//         <Helmet>
//         <title>Admin || CustomList</title>
//       </Helmet>
//       <div>
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error}. Please try again.</p>}
//         {!loading && !error && (
//           <div className="overflow-x-auto">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Asset Name</th>
//                   <th>Price</th>
//                   <th>Asset Type</th>
//                   <th>Asset Image</th>
//                   <th>Why you need this</th>
//                   <th>Additional information</th>
//                   <th>Approve Button</th>
//                   <th>Reject Button</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {allData.map((request, index) => (
//                   <tr key={request._id}>
//                     <th>{index + 1}</th>
//                     <td>{request.assetName}</td>
//                     <td>{request.price}</td>
//                     <td>{request.assetType}</td>
//                     <td>{request.image}</td>
//                     <td>{request.whyneed}</td>
//                     <td>{request.addInformation}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-success"
//                         onClick={() => handleApprove(request._id)}
//                       >
//                         Approve
//                       </button>
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleReject(request._id)}
//                       >
//                         Reject
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomList;

///

import axios from "axios";
import { useEffect, useState } from "react";
const CustomList = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5050/requestsCustom");
      console.log("Response:", response.data);
      setAllData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  const handleUpdateStatus = async (_id, newStatus) => {
    try {
      let updateData = { status: newStatus };

      if (newStatus === "Approve") {
        updateData = { ...updateData, approvedDate: new Date().toISOString() };
      }

      console.log("Update Data:", updateData);

      const response = await axios.put(
        `http://localhost:5050/requestsCustom/${_id}`,
        updateData
      );

      if (!response.data) {
        throw new Error(`Error updating status. Request not found`);
      }

      setAllData((prevData) =>
        prevData.map((request) =>
          request._id === _id ? { ...request, ...updateData } : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleApprove = (_id) => {
    handleUpdateStatus(_id, "Approve");
  };

  const handleReject = (_id) => {
    handleUpdateStatus(_id, "Reject");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}. Please try again.</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Asset Name</th>
                <th>Price</th>
                <th>Asset Type</th>
                <th>Asset Image</th>
                <th>Why you need this</th>
                <th>Additional information</th>
                <th>Activity</th>
                <th>Approve Button</th>
                <th>Reject Button</th>
              </tr>
            </thead>
            <tbody>
              {allData.map((request, index) => (
                <tr key={request._id}>
                  <th>{index + 1}</th>
                  <td>{request.assetName}</td>
                  <td>{request.price}</td>
                  <td>{request.assetType}</td>
                  <td>{request.image}</td>
                  <td>{request.whyneed}</td>
                  <td>{request.addInformation}</td>
                  <td>{request.status}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleApprove(request._id)}
                    >
                      Approve
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleReject(request._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomList;
