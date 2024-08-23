import { MAXIMUM_ORDER_NUMBER } from "./config";

export const VALIDATION_MESSAGES = {
  MAX_ORDER_LIMIT: `조합 최대 갯수는 ${MAXIMUM_ORDER_NUMBER}개 입니다.`,
};

export const GUIDE_MESSAGES = {
  COMPRESSION_NOTICE:
    "여러개의 파일이 필요할 경우 하나의 파일로 압축하여 사용해 주세요.",
  BOOKMARK_REQUIREMENT: "필수 항목을 작성해 주세요",
  REQUIRE_LOGIN: "로그인 유저 전용 기능입니다.",
  CONFIRMATION: "내용을 확인하고 진행 하시겠습니까?",
};
