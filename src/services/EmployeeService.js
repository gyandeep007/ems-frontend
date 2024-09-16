import axios from "axios";

const REST_API_BASE_URL = "http://192.168.31.212:6365/api/employees";
let pageNo = 2;
let pageSize = 10;
export const listEmployees = () => {
  return axios.get(
    REST_API_BASE_URL + `?pageNo=${pageNo}&pageSize=${pageSize}`
  );
};
