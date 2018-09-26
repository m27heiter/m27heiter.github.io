import axios from "axios";
import { API_SERVER_URL } from "@/config/constants";

export default {
  getUsersData() {
    return axios.get(
      `${API_SERVER_URL}/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users`
    );
  }
};
