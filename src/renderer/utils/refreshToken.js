import axios from "axios";

const refreshToken = async () => {
  try {
    const deliOrderUserId = window.localStorage.getItem("deliOrderUserId");
    const deliOrderRefreshToken = window.localStorage.getItem(
      "deliOrderRefreshToken",
    );
    const authorization = "Bearer " + deliOrderRefreshToken;
    if (deliOrderUserId && deliOrderRefreshToken) {
      const { newDeliOrderToken, newDeliOrderRefreshToken } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/token/refresh`,
        { deliOrderRefreshToken, deliOrderUserId },
        {
          headers: {
            "Content-Type": "application/json",
            authorization,
          },
        },
      );
      window.localStorage.setItem("deliOrderToken", newDeliOrderToken);
      window.localStorage.setItem(
        "deliOrderRefreshToken",
        newDeliOrderRefreshToken,
      );
    }
  } catch (error) {
    console.error("토큰 재발급 불가", error);
    window.localStorage.clear();
    window.location.href = "/login";
  }
};

export default refreshToken;
