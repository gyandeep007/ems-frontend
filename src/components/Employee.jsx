import React, { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const pageTitle = id ? "Update Employee" : "Add Employee";
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => console.log(error));
    }
  }, id);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const saveEmployee = (event) => {
    event.preventDefault();
    console.log("submit called");
    if (validateFormData()) {
      const employee = { firstName, lastName, email };
      if (id) {
        employee.id = id;
        updateEmployee(employee);
      } else {
        addEmployee(employee).then((response) => {
          console.log(response.data);
        });
      }
      navigator("/employees");
    }
  };
  const validateFormData = () => {
    let valid = true;
    const errorCopy = { ...errors };
    if (firstName.trim()) {
      errorCopy.firstName = "";
    } else {
      errorCopy.firstName = "First Name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorCopy.lastName = "";
    } else {
      errorCopy.lastName = "Last Name is required";
      valid = false;
    }
    if (email.trim()) {
      errorCopy.email = "";
    } else {
      errorCopy.email = "Email  is required";
      valid = false;
    }
    setErrors(errorCopy);
    return valid;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="card">
          <h2 className="text-center">{pageTitle}</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={handleFirstName}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={handleLastName}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={handleEmail}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button className="btn btn-success" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
