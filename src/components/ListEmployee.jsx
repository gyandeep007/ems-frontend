import { useEffect, useState } from "react";
import { listEmployees } from "../services/EmployeeService";
const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <table className="table table-striped table-bordered">
        <thead className="header">
          <tr>
            <td>Id</td>
            <td>firstName</td>
            <td>lastName</td>
            <td>email</td>
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default ListEmployee;
