import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AssetList = () => {
  const [initialData, setInitialData] = useState([]);

  const [listAsset, setListAsset] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [assetTypeFilter, setAssetTypeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://asset-management-system-server-xi.vercel.app/assetAdd")
      .then((res) => res.json())
      .then((data) => setInitialData(data));
  }, []);

  useEffect(() => {
    setListAsset(initialData);
  }, [initialData]);

  const filteredList = listAsset
    .filter((asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (asset) =>
        stockFilter === "all" || asset.stock.toLowerCase() === stockFilter
    )
    .filter(
      (asset) =>
        assetTypeFilter === "all" ||
        asset.assetType.toLowerCase() === assetTypeFilter
    );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStockFilter = (e) => {
    setStockFilter(e.target.value);
  };

  const handleAssetTypeFilter = (e) => {
    setAssetTypeFilter(e.target.value);
  };

  const handleSortByQuantity = () => {
    const sortedList = [...listAsset].sort((a, b) => {
      const orderMultiplier = sortOrder === "asc" ? 1 : -1;
      return (
        orderMultiplier *
        (parseInt(a.productQuantity) - parseInt(b.productQuantity))
      );
    });

    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setListAsset([...sortedList]);
  };

  const handleDeleted = async (id) => {
    try {
      const assetToDelete = filteredList.find((asset) => asset._id === id);

      const result = await Swal.fire({
        title: "Are you sure?",
        text: `You are about to delete "${assetToDelete.name}". This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `https://asset-management-system-server-xi.vercel.app
/assetAdd/${id}`,
          {
            method: "DELETE",
          }
        );

        const data = await response.json();

        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your Product has been Deleted.", "success");

          // remove the asset from the UI
          const remainingAssets = initialData.filter(
            (asset) => asset?._id !== id
          );
          setInitialData(remainingAssets);
        }
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
      // Handle or log the error appropriately
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin || AssetList</title>
      </Helmet>
      <div className=" mb-20">
        <div className="mt-10 mb-10">
          <div className=" flex gap-5 items-center justify-center">
            <div className="form-control  mb-5">
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Search Product Name
                </span>
              </label>
              <input
                className="w-full p-2 border-2 rounded"
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className=" flex gap-10 justify-center py-5">
              <div>
                <label className=" text-lg font-semibold">Stock Status:</label>
                <select value={stockFilter} onChange={handleStockFilter}>
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="out-of stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="text-lg font-semibold">Asset Type:</label>
                <select
                  value={assetTypeFilter}
                  onChange={handleAssetTypeFilter}
                >
                  <option value="all">All</option>
                  <option value="returnable">Returnable</option>
                  <option value="non-returnable">Non-Returnable</option>
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={handleSortByQuantity}
                className=" text-lg font-semibold"
              >
                Sort by Quantity {sortOrder === "asc" ? "(Asc)" : "(Desc)"}
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Product Type</th>
                <th>Product Quantity</th>
                <th>Date</th>
                <th>Stock Status</th>
                <th>Asset Type</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((asset, index) => (
                <tr key={asset._id}>
                  <th>{index + 1}</th>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>{asset.productQuantity}</td>
                  <td>{asset.date}</td>
                  <td>{asset.stock}</td>
                  <td>{asset.assetType}</td>
                  <td>
                    <Link to={`/assetListUpdate/${asset._id}`}>
                      <button className="btn btn-sm">Update</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleted(asset._id)}
                      className="btn btn-sm bg-red-600 text-white hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetList;
