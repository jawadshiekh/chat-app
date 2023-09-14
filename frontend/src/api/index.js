import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token");

    config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.createNewChat = (id) => {
  return API.get(`chats/start/private/${id}`);
};

API.loginUser = (data) => {
  return API.post("users/login", data);
};

API.getAllChats = () => {
  return API.get("chats");
};

API.getAllUsers = () => {
  return API.get("users");
};

API.getMessages = (id) => {
  return API.get(`chats/${id}/messages`);
};

API.sendMessage = (id, data) => {
  return API.post(`chats/${id}/messages`, data);
};

API.updateSignal = (data, id) => {
  return API.patch(`signals/${id}`, data);
};

API.deleteSignal = (id) => {
  return API.delete(`signals/${id}`);
};

API.createImageCDN = (data) => {
  return API.post("entities", data);
};

API.getAllAdmins = () => {
  return API.get(`/users`);
};

API.createAdmin = (data) => {
  return API.post(`/users`, data);
};

API.deleteAdmin = (id) => {
  return API.delete(`/users/${id}`);
};

API.updateAdmin = (id, data) => {
  return API.patch(`/users/${id}`, data);
};

API.getAllTabs = () => {
  return API.get(`/tabs`);
};

API.createTab = (data) => {
  return API.post(`/tabs`, data);
};

API.deleteTab = (id) => {
  return API.delete(`/tabs/${id}`);
};

API.updateTab = (id, data) => {
  return API.patch(`/tabs/${id}`, data);
};

API.getAllCards = () => {
  return API.get(`/cards`);
};

//orders which do not have cards
API.getMissingCards = () => {
  return API.get(`/orders/ids?isCardAdded=false`);
};

API.getSingleCard = (id) => {
  return API.get(`/cards/${id}`); //id is orderId
};

API.createCard = (orderId, data) => {
  return API.post(`/cards/${orderId}`, data);
};

API.updateCard = (id, data) => {
  return API.patch(`/cards/${id}`, data);
};

API.updateOneTimeCard = (token, data) => {
  return API.post(`/cards/one-time-create?token=${token}`, data);
};

API.getAllOrders = () => {
  return API.get(`/orders`);
};

API.getSingleOrder = (id) => {
  return API.get(`/orders/${id}`);
};

API.updateAccess = (id, data) => {
  return API.post(`/orders/${id}/access`, data);
};

API.getAccess = (id) => {
  return API.get(`/orders/${id}/access`);
};

API.deleteAccess = (id, userId) => {
  return API.delete(`/orders/${id}/access/${userId}`);
};

API.getSMTPData = () => {
  return API.get(`/smtp`);
};

API.moveToTab = (data, tabId) => {
  return API.patch(`orders/update-orders-tab/${tabId}`, data);
};

API.updateSMTP = (data) => {
  return API.patch(`/smtp`, data);
};

API.createOrder = (data) => {
  return API.post("/orders", data);
};

API.updateOrder = (id, data) => {
  return API.patch(`/orders/${id}`, data);
};
API.updateOneTimeOrder = (token, data) => {
  return API.patch(`/orders/one-time-update?token=${token}`, data);
};

API.addComment = (id, data) => {
  return API.post(`/comments/${id}`, data);
};
API.getAllComments = (id) => {
  return API.get(`/comments/${id}`);
};

API.generateOrderLink = (id) => {
  return API.get(`/orders/generate-one-time-update-order-link/${id}`);
};

API.generateCardLink = (id) => {
  return API.get(`/cards/generate-one-time-create-card-link/${id}`);
};

export { API };
