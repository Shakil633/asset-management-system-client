import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const AssetListUpdate = () => {
  const updateData = useLoaderData();

  const { _id, name, type, productQuantity, date, stock, assetType } =
    updateData;

  const handleAddAsset = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const productQuantity = form.productQuantity.value;
    const date = form.date.value;
    const stock = form.stock.value;
    const assetType = form.assetType.value;

    const addUpdate = { name, type, productQuantity, date, stock, assetType };

    fetch(
      `https://asset-management-system-server-xi.vercel.app
/assetUpdate/${_id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addUpdate),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.matchedCount > 0) {
          Swal.fire({
            title: "Success",
            text: "Product Update successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleAddAsset} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={name}
                  name="name"
                  placeholder="Product Name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Type</span>
                </label>
                <input
                  type="text"
                  name="type"
                  defaultValue={type}
                  placeholder="Product Type"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Quantity</span>
                </label>
                <input
                  type="number"
                  defaultValue={productQuantity}
                  name="productQuantity"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Quantity</span>
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={date}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product stock status</span>
                </label>
                <select
                  className="select select-bordered"
                  type="text"
                  name="stock"
                  defaultValue={stock}
                  required
                >
                  <option disabled>Select one</option>
                  <option value="available">available</option>
                  <option value="out-of stock">out-of stock</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product asset type</span>
                </label>
                <select
                  className="select select-bordered"
                  type="text"
                  name="assetType"
                  defaultValue={assetType}
                  required
                >
                  <option disabled>Select one</option>
                  <option value="returnable">returnable</option>
                  <option value="non-returnable">non-returnable</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Update"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetListUpdate;
