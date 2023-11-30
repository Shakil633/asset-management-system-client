import { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AllRequests = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://asset-management-system-server-xi.vercel.app/userRequest"
      );
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

  useEffect(() => {
    // Filter data based on search input
    const filtered = allData.filter(
      (request) =>
        request.displayName.toLowerCase().includes(searchInput.toLowerCase()) ||
        request.userEmail.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [allData, searchInput]);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      let updateData = { status: newStatus };

      if (newStatus === "Approve") {
        updateData = { ...updateData, approvedDate: new Date().toISOString() };
      }

      const response = await axios.put(
        `https://asset-management-system-server-xi.vercel.app/userRequest/${requestId}`,
        updateData
      );

      if (!response.data) {
        throw new Error(`Error updating status. Request not found`);
      }

      setAllData((prevData) =>
        prevData.map((request) =>
          request._id === requestId ? { ...request, ...updateData } : request
        )
      );
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const handleApprove = (requestId) => {
    handleUpdateStatus(requestId, "Approve");
  };

  const handleReject = (requestId) => {
    handleUpdateStatus(requestId, "Reject");
  };

  return (
    <div>
      <Helmet>
        <title>Admin || AllRequest</title>
      </Helmet>
      <div>
        <div className=" mb-5 px-10 mt-7">
          {/* Search bar */}
          <input
            className=" border-2 p-2 w-1/2 rounded-lg"
            type="text"
            placeholder="Search by name or email"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}. Please try again.</p>}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Asset Type</th>
                  <th>Email of Requester</th>
                  <th>Name of Requester</th>
                  <th>Request Date</th>
                  <th>Additional Note</th>
                  <th>Status</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {/* Render either allData or filteredData based on search */}
                {(searchInput ? filteredData : allData).map(
                  (request, index) => (
                    <tr key={request._id}>
                      <th>{index + 1}</th>
                      <td>{request.name}</td>
                      <td>{request.assetType}</td>
                      <td>{request.userEmail}</td>
                      <td>{request.displayName}</td>
                      <td>{request.requastDate}</td>
                      <td>{request.note}</td>
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
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequests;
