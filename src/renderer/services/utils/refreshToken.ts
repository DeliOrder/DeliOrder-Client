import axios from "axios";

interface TokenType {
  newDeliOrderToken: string;
}

const refreshToken = async () => {
  try {
    const deliOrderUserId = window.localStorage.getItem("deliOrderUserId");
    if (deliOrderUserId) {
      const { newDeliOrderToken }: TokenType = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/token/refresh`,
        { deliOrderUserId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      window.localStorage.setItem("deliOrderToken", newDeliOrderToken);
    }
  } catch (error) {
    console.error("토큰 재발급 불가", error);
    window.localStorage.clear();
    window.location.href = "/login";
  }
};

export default refreshToken;
