import store from "../../../redux/store";
import axios from "axios";

import { clearAuth } from "../../../redux/authReducer";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Xử lý yêu cầu trước khi gửi
    return config;
  },
  (error) => {
    // Xử lý lỗi khi gửi yêu cầu
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi trả về từ server

    return response;
  },
  (error) => {
    // Xử lý lỗi phản hồi từ server
    if (error.response && error.response.status === 403) {
      // Xử lý lỗi 401 Unauthorized
      store.dispatch(clearAuth());
      // Ví dụ: chuyển hướng đến trang đăng nhập, hiển thị thông báo, vv.
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
