import api from "./api";

const END_POINT = "/api/v1/games";

function newGame() {
  return api.post(`${END_POINT}/`, {});
}

function getGame() {
  return api.get(`${END_POINT}/`);
}

function getProperties() {
  return api.get(`${END_POINT}/buy-properties`);
}

function deleteGame() {
  return api.delete(`${END_POINT}/`);
}

function nextYear() {
  return api.get(`${END_POINT}/next-year`);
}

export default {
  newGame,
  getGame,
  deleteGame,
  nextYear,
  getProperties,
};
