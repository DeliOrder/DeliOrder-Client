import { MAXIMUM_ORDER_NUMBER } from "./config";

export const VALIDATION_MESSAGES = {
  MAX_ORDER_LIMIT: `조합 최대 갯수는 ${MAXIMUM_ORDER_NUMBER}개 입니다.`,
};

export const COMMON_ALERT = {
  INVALID_REQUEST: "비정상적인 접근입니다",
  ERROR_OCCUR: "실행중 오류가 발생하였습니다.",
  SERVER_ERROR_TRY_AGAIN:
    "서버에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주시기 바랍니다.",
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
  INVALID_REQUEST: "비정상적인 접근입니다",
};

export const GUIDE_MESSAGES = {
  COMPRESSION_NOTICE:
    "여러개의 파일이 필요할 경우 하나의 파일로 압축하여 사용해 주세요.",
  BOOKMARK_REQUIREMENT: "필수 항목(행동, 경로)을 작성해 주세요",
  REQUIRE_LOGIN: "로그인 유저 전용 기능입니다.",
  CONFIRMATION: "내용을 확인하고 진행 하시겠습니까?",
};

export const CREATE_ORDER_ALERT = {
  UNDEFINED_ACTION: "행동을 선택해 주세요.",
  UNDEFINED_ATTACHMENT: "대상 파일을 선택해 주세요.",
  UNDEFINED_EXECUTION_PATH: "명령을 수행할 최종 경로를 지정해주세요.",
  UNDEFINED_SOURCE_PATH: "이동할 파일이 있는 경로를 지정해주세요.",
  UNDEFINED_EDITING_NAME: "수정할 이름을 적어주세요.",
  UNDEFINED_EXTENSION_NAME: "확장자 이름까지 적어주세요.",
};

export const PACKAGE_PREVIEW_ALERT = {
  NO_FILE_TO_UPLOAD: "생성할 파일이 선택되지 않았습니다.",
  EMPTY_PACKAGE: "패키지가 비어 있습니다.",
  UPLOAD_FAIL_RETRY: "첨부파일 업로드에 실패하였습니다. 다시 시도해 주세요.",
};

export const RECEIVING_ALERT = {
  REQUIRE_SERIAL_NUMBER: "일련 번호를 입력해 주세요.",
};

export const PLACEHOLDER = {
  FILE_PICKER: "파일을 선택해 주세요.",
  FOLDER_PICKER: "경로를 선택해 주세요.",
  PATH_USER_DEFINE: "추가 경로 입력하기",
  FILE_USER_DEFINE: "파일명 입력하기 (예: hello.png)",
  EDITING_NAME: "변경할 파일명을 적어주세요.",
};
