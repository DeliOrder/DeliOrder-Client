import DeliLogo from "../../assets/images/logo.png";

function Nav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a
          href="/"
          className="flex items-center font-semibold text-xl tracking-tight"
        >
          <img src={DeliLogo} className="logo size-10" alt="DeliOrder logo" />
          DELIORDER
        </a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"></button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            소개
          </a>
          <a
            //TODO: 추후 보내기 페이지 연결
            href="#"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            보내기
          </a>
          <a
            //TODO: 추후 받기 페이지 연결
            href="#"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            받기
          </a>
        </div>
        <div>
          <a
            //TODO: 추후 내 소포함 페이지 연결
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mr-6"
          >
            내 소포함
          </a>
          <a
            //TODO: 추후 로그인 페이지 연결 및 로그아웃 로직 구현
            href="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            로그인/로그아웃
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
