import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios"; // Import axios
import { Helmet } from "react-helmet-async";

const CustomRequest = () => {
  const [formData, setFormData] = useState({
    assetName: "",
    price: "",
    assetType: "",
    image: "",
    whyneed: "",
    addInformation: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use axios directly instead of axiosSecure
      const assetRes = await axios.post(
        "http://localhost:5050/requestsCustom",
        formData
      );
      console.log(assetRes.data);

      if (assetRes.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${formData.assetName} is added to the database`,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      console.log("with addInformation url", assetRes.data);
    } catch (error) {
      console.error("Error adding asset:", error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Employee || CustomRequest</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Add Assets</h1>
          </div>
          <div className=" card shrink-0 shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={onSubmit}>
              <div className=" flex gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Asset Name</span>
                  </label>
                  <input
                    type="text"
                    name="assetName"
                    value={formData.assetName}
                    onChange={handleChange}
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Asset Type</span>
                  </label>
                  <input
                    type="text"
                    name="assetType"
                    value={formData.assetType}
                    onChange={handleChange}
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Asset Image</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
              <div className=" flex gap-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Why you need this</span>
                  </label>
                  <input
                    type="text"
                    name="whyneed"
                    value={formData.whyneed}
                    onChange={handleChange}
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Additional information</span>
                  </label>
                  <input
                    type="text"
                    name="addInformation"
                    value={formData.addInformation}
                    onChange={handleChange}
                    placeholder=""
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Add Items
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomRequest;


/////
// import  { useState, useEffect } from 'react';
// import axios from 'axios';

// const CustomRequest = () => {
//   const [allData, setAllData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5050/requestsCustom');
//       console.log('Response:', response.data);
//       setAllData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//       setError('Error fetching data. Please try again.');
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log('Fetching data...');
//     fetchData();
//   }, []);

//   const handleUpdateStatus = async (_id, newStatus) => {
//     try {
//       let updateData = { status: newStatus };

//       if (newStatus === 'Approve') {
//         updateData = { ...updateData, approvedDate: new Date().toISOString() };
//       }

//       console.log('Update Data:', updateData);

//       const response = await axios.put(`http://localhost:5050/requestsCustom/${_id}`, updateData);

//       if (!response.data) {
//         throw new Error(`Error updating status. Request not found`);
//       }

//       setAllData((prevData) =>
//         prevData.map((request) =>
//           request._id === _id ? { ...request, ...updateData } : request
//         )
//       );
//     } catch (error) {
//       console.error('Error updating status:', error.message);
//     }
//   };

//   const handleApprove = (_id) => {
//     handleUpdateStatus(_id, 'Approve');
//   };

//   const handleReject = (_id) => {
//     handleUpdateStatus(_id, 'Reject');
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search by name or email"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />

//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}. Please try again.</p>}

//       {!loading && !error && (
//         <div className="overflow-x-auto">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Asset Name</th>
//                 <th>Price</th>
//                 <th>Asset Type</th>
//                 <th>Asset Image</th>
//                 <th>Why you need this</th>
//                 <th>Additional information</th>
                
//                 <th>Approve Button</th>
//                 <th>Approve Button</th>
//                 <th>Reject Button</th>
//               </tr>
//             </thead>
//             <tbody>
//               {allData.map((request, index) => (
//                 <tr key={request._id}>
//                   <th>{index + 1}</th>
//                   <td>{request.assetName}</td>
//                   <td>{request.price}</td>
//                   <td>{request.assetType}</td>
//                   <td>{request.image}</td>
//                   <td>{request.status}</td>
//                   <td>{request.whyneed}</td>
//                   <td>{request.addInformation}</td>
//                   <td>
//                     {request.status}
//                   </td>

//                   <td>
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => handleApprove(request._id)}
//                     >
//                       Approve
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleReject(request._id)}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomRequest;
