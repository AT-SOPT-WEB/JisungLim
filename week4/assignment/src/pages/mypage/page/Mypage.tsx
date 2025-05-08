import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { fetchMyNickname } from "../../../shared/apis/user";
import { useEffect, useState } from "react";

const Mypage = () => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await fetchMyNickname();
        setNickname(res.nickname);
      } catch (error) {
        console.error("닉네임 조회 실패", error);
      }
    };

    fetchNickname();
  }, []);

  return (
    <div className="">
      <Header nickname={nickname} />

      <main className="w-full h-full">
        <Outlet context={{ nickname, setNickname }}/>
      </main>
    </div>
  );
};

export default Mypage;
