import googleLogo from "../../assets/images/googleLogo.svg";
import kakaoLogo from "../../assets/images/kakaoLogo.svg";

function Login() {
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
            className="w-full h-12 shadow border rounded p-3 text-gray-700 leading-tight focus:border-gray-700"
            id="user-mail"
            name="user-mail"
            type="email"
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
        <div className="flex items-center justify-center">
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-8 rounded-md focus:shadow-outline"
            type="button"
          >
            이메일 로그인
          </button>
        </div>
        <div className="border-b border-slate-300 mb-8" />
        <div className="flex flex-col items-center justify-around mb-4">
          <button
            className="flex items-center justify-center w-full bg-slate-200 hover:bg-slate-300 text-black font-bold py-2 px-4 mb-4 rounded-md focus:shadow-outline"
            type="button"
          >
            <img src={googleLogo} alt="Google Icon" className="w-6 h-6 mr-2" />
            구글 로그인
          </button>
          <button
            className="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 mb-4 rounded-md focus:shadow-outline"
            type="button"
          >
            <img src={kakaoLogo} alt="Kakao Icon" className="w-6 h-6 mr-2" />
            카카오 로그인
          </button>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold mb-2">DELIORDER가 처음이신가요?</p>
          <a
            className="inline-block m-2 font-bold text-sm text-blue-500 hover:underline"
            href="/signUp"
          >
            이메일로 가입하기
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
