import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const AddEmployee = () => {
  const employeeList = useLoaderData([]);

  console.log("Employee List:", employeeList);

  const handleAddToTeam = async (_id) => {
    try {
      const employeeToAdd = employeeList.find(
        (employee) => employee._id === _id
      );

      if (!employeeToAdd) {
        console.error("Employee not found");
        return;
      }

      // Exclude the _id field from the data sent to MongoDB
      const { _id: omitId, ...employeeData } = employeeToAdd;

      const response = await fetch(
        "https://asset-management-system-server-xi.vercel.app/adminAdd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        }
      );

      if (response.ok) {
        toast.success("Employee added successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to add employee", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-4xl text-red-700">Add Employee</h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Sl no</th>
                  <th>Image of the member</th>
                  <th>Name of the member</th>
                  <th>Member Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee, index) => (
                  <tr key={employee._id}>
                    <th>{index + 1}</th>
                    <td>
                      <img
                        className="w-20 rounded-full"
                        src={employee.img}
                        alt=""
                      />
                    </td>
                    <td>{employee.name}</td>
                    <td>{employee.role}</td>
                    <th>
                      <button
                        className="btn btn-sm bg-emerald-600 text-white"
                        onClick={() => handleAddToTeam(employee._id)}
                      >
                        Add to team
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
