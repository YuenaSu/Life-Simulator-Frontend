import api from "./api";

const END_POINT = "/api/v1/users";

function checkEmail(email, reverse = "") {
  // reverse is used to determine if the api should return an error if the email is already in use
  // if reverse is not an empty string, the api will return an error if the email is not found and
  // vice versa. The reason why reverse here is a string is because the boolean will be converted
  // to a string when sending the request
  return api.get(`${END_POINT}/email/${email}?reverse=${reverse}`);
}

function verifyEmail(email) {
  // Send verification email to user
  return api.post(`${END_POINT}/verify-email`, { email });
}

function verifyCode(email, code) {
  // Verify if the code matches the code sent to the user
  return api.post(`${END_POINT}/verify-code`, { email, code });
}

async function login(email, password) {
  return api.post(`${END_POINT}/login`, { email, password });
}

async function loginWithThirdParty(userInfo) {
  return api.post(`${END_POINT}/login-third-party`, userInfo);
}

async function register(email, password, username) {
  return api.post(`${END_POINT}/register`, {
    email,
    password,
    username,
  });
}

async function updateUser(user, password = undefined) {
  if (password) {
    user = {
      ...user,
      password,
    };
  }
  return api.put(`${END_POINT}/update`, { user });
}

function logout() {
  // Logout user and clear the session
  return api.post(`${END_POINT}/logout`);
}

export default {
  checkEmail,
  verifyEmail,
  verifyCode,
  login,
  loginWithThirdParty,
  register,
  updateUser,
  logout,
};
