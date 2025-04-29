import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "@emotion/styled";
import Header from "./components/header";
import { BASEBALL, GITHUB } from "./constants";
import StyledInput from "./components/StyledInput";

function App() {
  const [selectedMode, setSelectedMode] = useState(GITHUB);
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });

  // 상위 컴포넌트에서, useState()의 set함수를 선언할 때는 handleXXX로 네이밍
  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
  };

  const getUserInfo = async (user) => {
    setUserInfo({ status: "pending", data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUserInfo({ status: "resolved", data });
    } catch {
      setUserInfo({ status: "rejected", data: null });
    }
  };
  // console.log(userInfo);

  return (
    <Container>
      <GlobalStyles />
      {/* Header 등 컴포넌트가 렌더되기 전에만 호출되면, 그 뒤에 컴포넌트에 스타일이 주입됨 */}
      <Header selectedMode={selectedMode} onModeChange={handleSelectMode} />

      <Main>
        <StyledInput
          placeholder={
            selectedMode === GITHUB
              ? "Github 프로필을 검색해보세요."
              : "3자리 숫자를 입력해주세요."
          }
        />

        <button onClick={() => getUserInfo("m2na7")}>
          이 버튼을 누르면 사용자 정보를 가져옵니다.
        </button>

        {userInfo.status === "resolved" && (
          <div>
            <img src={userInfo.data.avatar_url} />
            <p>{userInfo.data.name}</p>
            <p>한 줄소개: {userInfo.data.bio}</p>
            <p>팔로워: {userInfo.data.followers}</p>
            <p>팔로잉: {userInfo.data.following}</p>

            <p>
              깃허브 프로필 링크:
              <a href={userInfo.data.html_url}>{userInfo.data.html_url}</a>
            </p>
          </div>
        )}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* viewport height, 100vh는 화면 전체 높이의 100% */
`;

const Main = styled.main`
  display: flex;
  flex-grow: 1; /* 화면 남은 공간을 가득 채우도록 설정 */
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
