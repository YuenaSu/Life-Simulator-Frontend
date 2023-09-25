import api from "./api";

const END_POINT = "/api/v1/admin";

function getAllUsers() {
  return api.get(`${END_POINT}/all`);
}

function deleteUser(id) {
  return api.delete(`${END_POINT}/${id}`);
}

function getLoginToday() {
  return api.get(`${END_POINT}/today-login`);
}

function getRegisterToday() {
  return api.get(`${END_POINT}/today-register`);
}

function getDailyActivity() {
  return api.get(`${END_POINT}/daily-activity`);
}

export default {
  getAllUsers,
  deleteUser,
  getLoginToday,
  getRegisterToday,
  getDailyActivity,
};
