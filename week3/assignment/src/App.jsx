import { useEffect, useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "@emotion/styled";
import Header from "./components/header";
import { BASEBALL, GITHUB, PROFILE } from "./js/constants";
import StyledInput from "./components/StyledInput";
import GithubSearchResult from "./components/GithubSearchResult";
import RecentSearch from "./components/RecentSearch";

function App() {
  const [selectedMode, setSelectedMode] = useState(GITHUB); // 깃허브 검색 / 숫자 야구
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });
  const [profile, setProfile] = useState(""); // 사용자가 검색한 Github 프로필
  const [profileList, setProfileList] = useState([]); // localStorage에서 가져온 프로필 리스트
  const [isProfileVisible, setIsProfileVisible] = useState(false); // 깃허브 프로필 X버튼 클릭 시 프로필 카드 내려감

  // 상위 컴포넌트에서, useState()의 set함수를 선언할 때는 handleXXX로 네이밍
  const handleSelectedMode = (mode) => {
    setSelectedMode(mode);
  };

  const handleProfileList = (profile) => {
    const profileList = JSON.parse(localStorage.getItem(PROFILE)) || [];
    const updatedList = profileList.filter((item) => item !== profile);
    localStorage.setItem(PROFILE, JSON.stringify(updatedList));
    setProfileList(updatedList);
  };

  const getUserInfo = async (user) => {
    setUserInfo({ status: "pending", data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUserInfo({ status: "resolved", data });
      setIsProfileVisible(true);
    } catch {
      setUserInfo({ status: "rejected", data: null });
      setIsProfileVisible(false);
    }
  };

  const loadUserProfile = () => {
    // 1. localStorage에서 프로필 데이터를 가져옴
    const profileList = JSON.parse(localStorage.getItem(PROFILE)) || [];
    // 2. 가져온 데이터를 RecentSearch에 넘김
    // 3. RecentSearch는 ForEach를 돌며 리스트 렌더링
  };

  const handleKeyDown = (e) => {
    // handleKeyDown이 onKeyDown이라는 React 이벤트 핸들러에 연결됐으므로
    // 첫 번째 파라미터로 SyntheticEvent 객체가 자동으로 넘어옴 -> 이벤트 인식 가능
    if (e.key === "Enter") {
      if (selectedMode === GITHUB) {
        const inputValue = e.target.value.trim();
        if (inputValue === "") return;
        getUserInfo(inputValue);
        setProfile("");

        // 로컬 스토리지 저장
        let profileList = JSON.parse(localStorage.getItem(PROFILE)) || [];
        profileList = [
          inputValue,
          ...profileList.filter((item) => item !== inputValue),
        ].slice(0, 6);
        // 중복 방지(filter하고 ... 으로 배열 펼침) 및 최신값 맨 앞에 추가, 최근 6개만 저장
        localStorage.setItem(PROFILE, JSON.stringify(profileList));

        // 변경상태 반영
        setProfileList(profileList);
      }
      // else if (selectedMode === BASEBALL) {
      // }
    }
  };

  useEffect(() => {
    const profileList = JSON.parse(localStorage.getItem(PROFILE) || []);
    setProfileList(profileList);
  }, []);

  return (
    <Container>
      <GlobalStyles />{" "}
      {/* Header 등 컴포넌트가 렌더되기 전에만 호출되면, 그 뒤에 컴포넌트에 스타일이 주입됨 */}
      <Header selectedMode={selectedMode} onModeChange={handleSelectedMode} />
      <Main>
        <StyledInput
          placeholder={
            selectedMode === GITHUB
              ? "Github 프로필을 검색해보세요."
              : "3자리 숫자를 입력해주세요."
          }
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {selectedMode === GITHUB && (
          <RecentSearch
            profileList={profileList}
            onProfileListChange={handleProfileList}
          />
        )}
        {selectedMode === GITHUB && isProfileVisible && (
          <GithubSearchResult
            userInfo={userInfo}
            onClose={() => setIsProfileVisible(false)}
          />
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
