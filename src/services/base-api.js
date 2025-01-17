import axios from "axios";
import { notification } from "antd";

const URI = process.env.REACT_APP_API_URL;

const config = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("token") || null}`,
  "x-access-token": JSON.parse(sessionStorage.getItem("token") || null),
});

const post = async (route, data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URI}${route}`,
      data,
      headers: config(),
    });
    return res.data;
  } catch (e) {
    notification.open({
      message: "Network Error",
      description: e.response.data,
    });
  }
};

export const uploadFile = async (route, file) => {
  let formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios({
      method: "POST",
      url: `${URI}${route}`,
      data: formData,
      headers: {
        ...config(),
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    notification.open({
      message: "Network Error",
      description: e.response.data,
    });
  }
};

const put = async (route, data) => {
  try {
    const res = await axios({
      method: "PUT",
      url: `${URI}${route}`,
      data,
      headers: config(),
    });
    return res.data;
  } catch (e) {
    notification.open({
      message: "Network Error",
      description: e.response.data,
    });
  }
};

const get = async (route, params) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URI}${route}`,
      headers: config(),
      params,
    });
    return res.data;
  } catch (e) {
    notification.open({
      message: "Error Gettings Users",
      description: e.response.data,
    });
  }
};

const destroy = async (route, data) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `${URI}${route}`,
      data,
      headers: config(),
    });
    return res.data;
  } catch (e) {
    notification.open({
      message: "Error Deleting User",
      description: e.response.data,
    });
  }
};

const services = {
  post,
  get,
  destroy,
  put,
  uploadFile,
};

export default services;
