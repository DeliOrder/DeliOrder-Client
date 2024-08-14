import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../Modal";

function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const navigateToMainPage = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="flex flex-grow items-center justify-center p-4">
      <form className="m-4 w-[400px] rounded border-gray-600 bg-white p-6 shadow-md">
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
          />
          <button
            className="focus:shadow-outline h-12 w-4/12 rounded-r bg-blue-400 px-4 py-2 font-bold text-white hover:bg-blue-500"
            type="button"
            //TODO: 추후 데이터베이스 연결 및 아이디 중복 확인 로직 구현
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
            type="password-check"
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
          />
          <span className="text-sm">개인정보약관에 동의합니다.</span>
        </label>
        <div className="mb-2 flex items-center justify-center">
          <button
            className="focus:shadow-outline mb-4 w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="button"
            //TODO: 현재 단순히 모달창을 여는 로직이며, 추후 서버와 연결하여 실제 가입 로직 구현
            onClick={openModal}
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
