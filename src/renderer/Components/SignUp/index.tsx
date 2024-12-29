import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Modal from "../Modal";
import usePackageStore from "@renderer/store";
import {
  validateEmail,
  validatePassword,
} from "@renderer/services/utils/validate";
import { SIGN_UP_ALERT, COMMON_ALERT } from "../../constants/messages";

function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [nicknameValue, setNicknameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCheckValue, setPasswordCheckValue] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const { openInfoModal, setInfoMessage } = usePackageStore();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const navigateToMainPage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const notifyInfoMessage = (message: string | React.ReactNode) => {
    setInfoMessage(message as string);
    openInfoModal();
  };

  const handleEmailValidate = async () => {
    try {
      if (!validateEmail(emailValue)) {
        throw new Error("이메일형식에 맞지 않습니다");
      }

      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/sign-up/check-email`,
        { emailValue },
      );
      setEmailValidate(true);
      notifyInfoMessage(SIGN_UP_ALERT.EMAIL_VERIFICATION_SUCCESS);
    } catch (error) {
      console.error(
        "이메일 중복검증 실패: ",
        error instanceof AxiosError &&
          (error.response?.data?.error || error.message),
      );

      if (error instanceof AxiosError && error.response) {
        notifyInfoMessage(SIGN_UP_ALERT.EMAIL_ALREADY_REGISTERED);
      } else {
        notifyInfoMessage(SIGN_UP_ALERT.INVALID_EMAIL_FORMAT);
      }
      setEmailValidate(false);
    }
  };

  const handleEmailSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    const signUpFormValue = {
      emailValue,
      nicknameValue,
      passwordValue,
      passwordCheckValue,
      checkBoxValue,
    };

    if (!emailValidate) {
      notifyInfoMessage(SIGN_UP_ALERT.EMAIL_VERIFICATION_REQUIRED);
      return;
    }

    const passwordValidationResult = validatePassword(
      passwordValue,
      passwordCheckValue,
    );
    if (!passwordValidationResult.valid) {
      const passwordErrorList = passwordValidationResult.errors;
      notifyInfoMessage(
        <>
          {passwordErrorList!.map((errorMessage, index) => {
            let errorText;

            switch (errorMessage) {
              case "isLongEnough":
                errorText = SIGN_UP_ALERT.NOT_LONG_ENOUGH;
                break;
              case "hasLetter":
                errorText = SIGN_UP_ALERT.DO_NOT_HAS_LETTER;
                break;
              case "hasNumber":
                errorText = SIGN_UP_ALERT.DO_NOT_HAS_NUMBER;
                break;
              case "hasSpecialChar":
                errorText = SIGN_UP_ALERT.DO_NOT_HAS_SPECIAL_CHAR;
                break;
              case "hasNoWhitespace":
                errorText = SIGN_UP_ALERT.DO_NOT_HAS_NO_WHITESPACE;
                break;
              case "hasSameValue":
                errorText = SIGN_UP_ALERT.DO_NOT_HAS_SAME_VALUE;
                break;
              default:
                errorText = errorMessage;
                break;
            }

            return <div key={index}>{errorText}</div>;
          })}
        </>,
      );
      return;
    }

    if (!checkBoxValue) {
      notifyInfoMessage(SIGN_UP_ALERT.AGREEMENT_REQUIRED);
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, emailValue, passwordValue);
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/sign-up/email`,
        { signUpFormValue },
      );
      openModal();
    } catch (error) {
      console.error("가입실패", error);
      notifyInfoMessage(COMMON_ALERT.SERVER_ERROR_TRY_AGAIN);
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center p-4">
      <form
        className="m-4 w-[400px] rounded border-gray-600 bg-white p-6 shadow-md"
        onSubmit={handleEmailSignUp}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="user-mail"
          >
            이메일
          </label>
          <input
            className="h-12 w-8/12 rounded-l border p-3 leading-tight text-gray-700 shadow focus:border-gray-700"
            id="user-mail"
            name="user-mail"
            type="email"
            onChange={(event) => {
              setEmailValue(event.target.value);
              setEmailValidate(false);
            }}
          />
          <button
            className="focus:shadow-outline h-12 w-4/12 rounded-r bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500"
            type="button"
            onClick={handleEmailValidate}
          >
            중복확인
          </button>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="nickname"
          >
            닉네임
          </label>
          <input
            className="h-12 w-full rounded border p-3 leading-tight text-gray-700 shadow focus:border-gray-700"
            id="nickname"
            name="nickname"
            type="text"
            onChange={(event) => setNicknameValue(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            비밀번호
          </label>
          <input
            className="h-12 w-full rounded border p-3 leading-tight text-gray-700 shadow focus:border-gray-700"
            id="password"
            name="password"
            type="password"
            onChange={(event) => setPasswordValue(event.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="password check"
          >
            비밀번호 확인
          </label>
          <input
            className="h-12 w-full rounded border p-3 leading-tight text-gray-700 shadow focus:border-gray-700"
            id="password-check"
            name="password-check"
            type="password"
            onChange={(event) => setPasswordCheckValue(event.target.value)}
          />
        </div>
        <a
          className="m-2 inline-block text-sm font-bold text-blue-500 hover:underline"
          href="#"
        >
          개인정보 약관 보기
        </a>
        <label className="mb-3 block font-bold text-gray-500">
          <input
            className="m-2 mb-6 leading-tight"
            name="checkbox"
            type="checkbox"
            onChange={() => setCheckBoxValue(!checkBoxValue)}
          />
          <span className="text-sm">개인정보약관에 동의합니다.</span>
        </label>
        <div className="mb-2 flex items-center justify-center">
          <button
            className="focus:shadow-outline mb-4 w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="submit"
            // onClick={openModal}
            onClick={handleEmailSignUp}
          >
            가입하기
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={navigateToMainPage}>
        <h2 className="mb-4 text-xl font-semibold">DELIORDER</h2>
        <p>신규회원가입을 축하합니다!</p>
        <button
          className="focus:shadow-outline mt-4 rounded-md bg-blue-400 px-4 py-2 text-center font-bold text-white hover:bg-blue-500"
          onClick={navigateToMainPage}
        >
          메인페이지로 이동하기
        </button>
      </Modal>
    </div>
  );
}

export default SignUp;
