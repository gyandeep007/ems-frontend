import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  function addNewEmployee() {
    navigator("/add-employee");
  }
  const updateEmployee = (empdId) => {
    const updateEmployee = employees.filter((emp) => emp.id === empdId);
    navigator(`/edit-employee/${empdId}`);
  };

  const removeEmployee = (empdId) => {
    // const updateEmployee = employees.filter((emp) => emp.id === empdId);
    deleteEmployee(empdId).then((response) => console.log(response.data));
    const remainingEmployees = employees.filter(
      (employee) => employee.id != empdId
    );
    setEmployees(remainingEmployees);
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead className="header">
          <tr>
            <td>Id</td>
            <td>firstName</td>
            <td>lastName</td>
            <td>email</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => {
            return (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      updateEmployee(emp.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeEmployee(emp.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ListEmployee;
