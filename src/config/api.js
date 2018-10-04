import axios from "axios";
import { API_SERVER_URL, API_ID } from "@/config/constants";

export default {
  getUsers() {
    return axios.get(`${API_SERVER_URL}/${API_ID}/data/Users`);
  },
  getUser({ objectId }) {
    return axios.get(`${API_SERVER_URL}/${API_ID}/data/Users/${objectId}`);
  },
  addUser({ name, password, email }) {
    return axios.post(`${API_SERVER_URL}/${API_ID}/data/Users`, {
      password: password,
      name: name,
      email: email
    });
  },
  deleteUser({ objectId }) {
    return axios.delete(`${API_SERVER_URL}/${API_ID}/data/Users/${objectId}`);
  },
  updateUser({ name, password, email, objectId }) {
    return axios.put(`${API_SERVER_URL}/${API_ID}/data/Users/${objectId}`, {
      password: password,
      name: name,
      email: email
    });
  }
};
