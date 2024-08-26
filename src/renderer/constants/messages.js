import { MAXIMUM_ORDER_NUMBER } from "./config";

export const VALIDATION_MESSAGES = {
  MAX_ORDER_LIMIT: `조합 최대 갯수는 ${MAXIMUM_ORDER_NUMBER}개 입니다.`,
};

export const SIGN_UP_ALERT = {
  EMAIL_VERIFICATION_SUCCESS: "이메일 중복 검사가 완료되었습니다.",
  EMAIL_ALREADY_REGISTERED: "이미 가입된 이메일 주소입니다.",
  INVALID_EMAIL_FORMAT: "유효하지 않은 이메일 형식입니다.",
  EMAIL_VERIFICATION_REQUIRED: "이메일 중복 확인이 필요합니다.",
  AGREEMENT_REQUIRED: "개인정보 처리방침에 동의하셔야 가입이 가능합니다.",
  NOT_LONG_ENOUGH: "비밀번호는 최소 8자 이상이어야 합니다.",
  DO_NOT_HAS_LETTER: "비밀번호에는 최소 하나의 영문자가 포함되어야 합니다.",
  DO_NOT_HAS_NUMBER: "비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.",
  DO_NOT_HAS_SPECIAL_CHAR:
    "비밀번호에는 최소 하나의 특수문자가 포함되어야 합니다.",
  DO_NOT_HAS_NO_WHITESPACE: "비밀번호에는 공백이 포함될 수 없습니다.",
  DO_NOT_HAS_SAME_VALUE: "비밀번호와 비밀번호 확인이 일치해야 합니다.",
};

export const SIGN_IN_ALERT = {
  CHECK_ID_OR_PASSWORD: "아이디 또는 비밀번호를 다시 확인해주세요",
};

export const GUIDE_MESSAGES = {
  COMPRESSION_NOTICE:
    "여러개의 파일이 필요할 경우 하나의 파일로 압축하여 사용해 주세요.",
  BOOKMARK_REQUIREMENT: "필수 항목을 작성해 주세요",
  REQUIRE_LOGIN: "로그인 유저 전용 기능입니다.",
  CONFIRMATION: "내용을 확인하고 진행 하시겠습니까?",
  SERVER_ERROR_TRY_AGAIN:
    "서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주시기 바랍니다.",
};
