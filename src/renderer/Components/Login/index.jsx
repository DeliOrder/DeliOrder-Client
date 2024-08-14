import googleLogo from "../../assets/images/googleLogo.svg";
import kakaoLogo from "../../assets/images/kakaoLogo.svg";

function Login() {
  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_KEY}&redirect_uri=${import.meta.env.VITE_BASE_URL}&response_type=code`;
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
            className="h-12 w-full rounded border p-3 leading-tight text-gray-700 shadow focus:border-gray-700"
            id="user-mail"
            name="user-mail"
            type="email"
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
        <div className="flex items-center justify-center">
          <button
            className="focus:shadow-outline mb-8 w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            type="button"
          >
            이메일 로그인
          </button>
        </div>
        <div className="mb-8 border-b border-slate-300" />
        <div className="mb-4 flex flex-col items-center justify-around">
          <button
            className="focus:shadow-outline mb-4 flex w-full items-center justify-center rounded-md bg-slate-200 px-4 py-2 font-bold text-black hover:bg-slate-300"
            type="button"
          >
            <img src={googleLogo} alt="Google Icon" className="mr-2 h-6 w-6" />
            구글 로그인
          </button>
          <button
            className="focus:shadow-outline mb-4 flex w-full items-center justify-center rounded-md bg-yellow-400 px-4 py-2 font-bold text-black hover:bg-yellow-500"
            type="button"
            onClick={handleKakaoLogin}
          >
            <img src={kakaoLogo} alt="Kakao Icon" className="mr-2 h-6 w-6" />
            카카오 로그인
          </button>
        </div>
        <div className="text-center">
          <p className="mb-2 text-sm font-bold">DELIORDER가 처음이신가요?</p>
          <a
            className="m-2 inline-block text-sm font-bold text-blue-500 hover:underline"
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
