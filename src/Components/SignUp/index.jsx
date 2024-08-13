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
    <div className="flex-grow flex items-center justify-center p-4">
      <form className="bg-white shadow-md rounded border-gray-600 p-6 m-4 w-[400px]">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="user-mail"
          >
            이메일
          </label>
          <input
            className="w-8/12 h-12 shadow border rounded-l p-3 text-gray-700 leading-tight focus:border-gray-700"
            id="user-mail"
            name="user-mail"
            type="email"
          />
          <button
            className="w-4/12 h-12 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-r focus:shadow-outline"
            type="button"
          //TODO: 추후 데이터베이스 연결 및 아이디 중복 확인 로직 구현
          >
            중복확인
          </button>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nickname"
          >
            닉네임
          </label>
          <input
            className="w-full h-12 shadow border rounded p-3 text-gray-700 leading-tight focus:border-gray-700"
            id="nickname"
            name="nickname"
            type="text"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            비밀번호
          </label>
          <input
            className="w-full h-12 shadow border rounded p-3 text-gray-700 leading-tight focus:border-gray-700"
            id="password"
            name="password"
            type="password"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password check"
          >
            비밀번호 확인
          </label>
          <input
            className="w-full h-12 shadow border rounded p-3 text-gray-700 leading-tight focus:border-gray-700"
            id="password-check"
            name="password-check"
            type="password-check"
          />
        </div>
        <a
          className="inline-block m-2 font-bold text-sm text-blue-500 hover:underline"
          href="#"
        >
          개인정보 약관 보기
        </a>
        <label className="mb-3 block text-gray-500 font-bold">
          <input className="m-2 mb-6 leading-tight" name="checkbox" type="checkbox" />
          <span className="text-sm">개인정보약관에 동의합니다.</span>
        </label>
        <div className="flex items-center justify-center mb-2">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded-md focus:shadow-outline"
            type="button"
            //TODO: 현재 단순히 모달창을 여는 로직이며, 추후 서버와 연결하여 실제 가입 로직 구현
            onClick={openModal}
          >
            가입하기
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={navigateToMainPage}>
        <h2 className="text-xl font-semibold mb-4">DELIORDER</h2>
        <p>신규회원가입을 축하합니다!</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-md focus:shadow-outline text-center"
          onClick={navigateToMainPage}
        >
          메인페이지로 이동하기
        </button>
      </Modal>
    </div>
  );
}

export default SignUp;
