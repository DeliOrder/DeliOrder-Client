import axios from "axios";

async function refreshToken(deliOrderUserId: string) {
  try {
    return await axios.post(
      "http://localhost:8000/auth/token/refresh",
      {
        deliOrderUserId,
      },
      {
        withCredentials: true,
      },
    );
  } catch {
    throw "토큰 발급중 오류가 발생하였습니다.";
  }
}

export default refreshToken;
