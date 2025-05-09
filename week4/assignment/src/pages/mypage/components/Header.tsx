import { UserIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { USER_ID_KEY } from "../../../shared/constants/user";

type HeaderProps = {
  nickname: string;
};

const Header = ({ nickname }: HeaderProps) => {
  const navigate = useNavigate();

  const logout = () => {
    alert("로그아웃 합니다!");
    localStorage.removeItem(USER_ID_KEY);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full flex p-[2rem] justify-between bg-green-500 text-white text-[1.8rem]">
      <nav className="flex gap-7">
        <button type="button" onClick={() => navigate("/mypage/info")}>
          내 정보
        </button>
        <button type="button" onClick={() => navigate("/mypage/search")}>
          SOPT 회원 조회하기
        </button>
        <button type="button" onClick={logout}>
          로그아웃
        </button>
      </nav>

      <button type="button" className="flex align-baseline">
        <span>
          <UserIcon className="w-8 h-8 text-white" />
        </span>
        &nbsp;{nickname}
      </button>
    </header>
  );
};

export default Header;
