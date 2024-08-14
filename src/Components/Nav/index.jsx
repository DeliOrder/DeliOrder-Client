import DeliLogo from "../../assets/images/logo.png";

function Nav() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-blue-700 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <a
          href="/"
          className="flex items-center text-xl font-semibold tracking-tight"
        >
          <img src={DeliLogo} className="logo size-10" alt="DeliOrder logo" />
          DELIORDER
        </a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white"></button>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <a
            href="/"
            className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            소개
          </a>
          <a
            href="/package/new"
            className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            보내기
          </a>
          <a
            href="/package/receiving"
            className="mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            받기
          </a>
        </div>
        <div>
          <a
            //TODO: 추후 내 소포함 페이지 연결
            href="#"
            className="mr-6 mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
          >
            내 소포함
          </a>
          <a
            //TODO: 추후 로그아웃 로직 구현
            href="/login"
            className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
          >
            로그인/로그아웃
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
