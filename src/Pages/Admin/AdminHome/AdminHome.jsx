import axios from "axios";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://asset-management-system-server-xi.vercel.app/userRequest"
        );
        setAllData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pendingRequests = allData
    .filter((request) => request.status === "Pending")
    .slice(0, 5);

  const productFrequency = {};
  allData.forEach((request) => {
    const { name } = request;
    productFrequency[name] = (productFrequency[name] || 0) + 1;
  });

  const topRequestedItems = Object.keys(productFrequency)
    .sort((a, b) => productFrequency[b] - productFrequency[a])
    .slice(0, 4);

  return (
    <div>
      <div className=" mb-10">
        {loading && <p>Loading...</p>}
        {!loading && (
          <div>
            <div className="overflow-x-auto py-10">
              <h2 className="text-4xl text-center font-bold text-red-600 mb-5">
                Pending Requests
              </h2>
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
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map((request, index) => (
                    <tr key={request._id}>
                      <th>{index + 1}</th>
                      <td>{request.name}</td>
                      <td>{request.assetType}</td>
                      <td>{request.userEmail}</td>
                      <td>{request.displayName}</td>
                      <td>{request.requastDate}</td>
                      <td>{request.note}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-[500px] py-5">
              <h2 className="text-4xl text-center font-bold text-red-600 mb-5">
                Top Most Requested Items
              </h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Request Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topRequestedItems.map((name, index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{productFrequency[name]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
