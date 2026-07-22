import axios from "axios";

const AUTH_API_URL =
  "http://localhost/StudentInformationSystem/server/api/auth.php";

export async function login(username, password) {
  try {
    const response = await axios.post(`${AUTH_API_URL}?action=login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Unable to login. Please check your credentials.",
    };
  }
}

export async function logout(token) {
  try {
    const response = await axios.post(
      `${AUTH_API_URL}?action=logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Unable to logout.",
    };
  }
}
