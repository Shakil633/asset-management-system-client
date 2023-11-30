import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AddAsset = () => {
  const handleAddAsset = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const type = form.type.value;
    const productQuantity = form.productQuantity.value;
    const date = form.date.value;
    const stock = form.stock.value;
    const assetType = form.assetType.value;

    const add = { name, type, productQuantity, date, stock, assetType };
    console.log(add);

    fetch("http://localhost:5050/assetAdd", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(add),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Product added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div>
      <Helmet>
        <title>Admin || AddList</title>
      </Helmet>
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
                  required
                >
                  <option disabled selected>
                    Select one
                  </option>
                  <option>available</option>
                  <option>out-of stock</option>
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
                  required
                >
                  <option disabled selected>
                    Select one
                  </option>
                  <option>returnable</option>
                  <option>non-returnable</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Add Item"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
