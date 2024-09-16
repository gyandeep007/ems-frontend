import axios from "axios";

const REST_API_BASE_URL = "http://192.168.31.212:6365/api/employees";
let pageNo = 2;
let pageSize = 10;
export const listEmployees = () => {
  return axios.get(
    REST_API_BASE_URL + `?pageNo=${pageNo}&pageSize=${pageSize}`
  );
};

export const addEmployee = (employee) => {
  return axios.post(REST_API_BASE_URL, employee);
};

export const getEmployee = (empId) => {
  return axios.get(REST_API_BASE_URL + "/" + empId);
};

export const updateEmployee = (employee) => {
  return axios.put(REST_API_BASE_URL, employee);
};

export const deleteEmployee = (employeeId) => {
  return axios.delete(REST_API_BASE_URL + "/" + employeeId);
};
