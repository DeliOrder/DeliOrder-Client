import axios from "axios";

const refreshToken = async () => {
  try {
    const userRefreshToken = window.localStorage.getItem("refreshToken");
    const userId = window.localStorage.getItem("userId");
    const authorization = "Bearer " + userRefreshToken;
    const { jwtToken, refreshToken } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/auth/refresh/kakao`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
          authorization,
        },
      },
    );

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    localStorage.setItem("jwtToken", jwtToken);
  } catch (error) {
    console.error("토큰 재발급 중 오류 발생", error);
  }
};

export default refreshToken;
