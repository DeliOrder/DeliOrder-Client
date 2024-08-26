import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import Modal from "../Modal";
import { validateEmail, validatePassword } from "../../utils/validate.js";

function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [emailValidate, setEmailValidate] = useState(false);
  const [nicknameValue, setNicknameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordCheckValue, setPasswordCheckValue] = useState("");
  const [checkBoxValue, setCheckBoxValue] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const navigateToMainPage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const handleEmailValidate = async () => {
    try {
      if (!validateEmail(emailValue)) {
        throw new Error("이메일형식에 맞지 않음");
      }

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/sign-up/check-email`,
        { emailValue },
      );
      setEmailValidate(true);
      // TODO: 모달로 이메일 중복검증 성공 관련 메세지 표시
      console.log("이메일 중복검증이 완료되었습니다.");
    } catch (error) {
      console.log(
        "이메일 중복검증 실패: ",
        error.response?.data?.error || error.message,
      );
      // TODO: 모달로 이메일 중복검증 오류 관련 메세지 표시
      setEmailValidate(false);
    }
  };

  const handleEmailSignUp = async (event) => {
    event.preventDefault();
    const signUpFormValue = {
      emailValue,
      nicknameValue,
      passwordValue,
      passwordCheckValue,
      checkBoxValue,
    };

    console.log(checkBoxValue);

    if (!emailValidate) {
      console.log("이메일 중복 검증 실패");
      // TODO: 모달로 이메일 중복검증을 하고 와달라는 메세지 표시
      return;
    }

    if (!validatePassword(passwordValue, passwordCheckValue).valid) {
      console.log(validatePassword(passwordValue, passwordCheckValue).errors);
      // TODO: 모달로 비번관련 에러 메세지 표시
      return;
    }

    if (!checkBoxValue) {
      // TODO: 체크박스관련 메세지 표시
      console.log("개인정보 관련 사항에 동의하여야 가입이 가능합니다.");
      return;
    }

    // TODO: 이메일 가입 관련 유효성 로직 추가 필요
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailValue,
        passwordValue,
      );
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/sign-up/email`,
        { signUpFormValue },
      );
      openModal();
    } catch (error) {
      console.error("가입실패", error);
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
            //TODO: 추후 데이터베이스 연결 또는 firebase를 통해 아이디 중복 확인 로직 구현 필요
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
