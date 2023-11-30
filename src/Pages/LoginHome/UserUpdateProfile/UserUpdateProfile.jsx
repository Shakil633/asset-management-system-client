import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UserUpdateProfile = () => {
  const dataUpdate = useLoaderData();
  const { _id, name, img, dateOfBirth, email } = dataUpdate;

  console.log(dataUpdate);

  const handleUserUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const date = form.date.value;
    const email = form.email.value;

    const updateData = {
      name: name,
      img: image,
      dateOfBirth: date,
      email,
    };
    console.log(updateData);

    fetch(`http://localhost:5050/users/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
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
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleUserUpdate} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="name"
                  defaultValue={name}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image</span>
                  </label>
                  <label className="input-group">
                    <input
                      type="text"
                      placeholder="Image"
                      defaultValue={img}
                      name="image"
                      className="input input-bordered w-full"
                    />
                  </label>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Date of birth</span>
                </label>
                <input
                  type="date"
                  name="date"
                  placeholder="date"
                  defaultValue={dateOfBirth}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  defaultValue={email}
                  className="input input-bordered"
                  readOnly
                />
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateProfile;
