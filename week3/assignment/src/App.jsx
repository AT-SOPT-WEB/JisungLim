import { useEffect, useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "@emotion/styled";
import Header from "./components/header";
import { BASEBALL, GITHUB, PROFILE } from "./js/constants";
import StyledInput from "./components/StyledInput";
import GithubSearchResult from "./components/GithubSearchResult";
import RecentSearch from "./components/RecentSearch";
import BaseballResult from "./components/BaseballResult";

function App() {
  const [selectedMode, setSelectedMode] = useState(GITHUB); // 깃허브 검색 / 숫자 야구

  // 숫자야구 기능
  const [baseballResult, setBaseballResult] = useState([]);
  const [answer, setAnswer] = useState(0); // 생성된 랜덤 숫자 저장
  const [baseballMessage, setBaseballMessage] = useState(""); 

  // 깃허브 기능
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });
  const [inputValue, setInputValue] = useState(""); // 사용자가 검색한 Github 프로필
  const [profileList, setProfileList] = useState([]); // localStorage에서 가져온 프로필 리스트
  const [isProfileVisible, setIsProfileVisible] = useState(false); // 깃허브 프로필 X버튼 클릭 시 프로필 카드 내려감

  // 상위 컴포넌트에서는 handleXXX로 네이밍
  // 하위 컴포넌트에서 이걸 받을 때는 onXXX로 네이밍
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

  const generateNumber = () => {
    // fisher-yates shuffle algorithm 사용
    const digits = [...Array(10).keys()]; // [0, 1, ... , 9] 배열 생성, keys(): 0...n-1까지 iterator 반환

    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }

    const result = digits.slice(0, 3).join("");
    return result;
  };

  const checkUserInput = (answer, userInput) => {
    let strike = 0;
    let ball = 0;

    const answerArr = answer.split("");
    const userInputArr = userInput.split("");

    // 1. 스트라이크 체크
    for (let i = 0; i < 3; i++) {
      if (answerArr[i] === userInputArr[i]) {
        strike++;
      }
    }

    // 2. 볼 체크
    for (let i = 0; i < 3; i++) {
      if (
        userInputArr[i] !== answerArr[i] &&
        answerArr.includes(userInputArr[i])
      ) {
        ball++;
      }
    }

    return { strike, ball };
  };

  const isInputValid = (userInput) => {
    const isThreeDigits = /^\d{3}$/.test(userInput);
    const noDuplicates = new Set(userInput).size === userInput.length; // O(n)
    return isThreeDigits && noDuplicates;
  }

  const handleKeyDown = (e) => {
    // handleKeyDown이 onKeyDown이라는 React 이벤트 핸들러에 연결됐으므로
    // 첫 번째 파라미터로 SyntheticEvent 객체가 자동으로 넘어옴 -> 이벤트 인식 가능
    if (e.key === "Enter") {
      if (selectedMode === GITHUB) {
        const inputValue = e.target.value.trim();
        if (inputValue === "") return;
        getUserInfo(inputValue);
        setInputValue("");

        // 로컬 스토리지 저장
        let profileList = JSON.parse(localStorage.getItem(PROFILE)) || [];
        profileList = [
          inputValue,
          ...profileList.filter((item) => item !== inputValue),
        ].slice(0, 3);
        // 중복 방지(filter하고 ... 으로 배열 펼침) 및 최신값 맨 앞에 추가, 최근 3개만 저장
        localStorage.setItem(PROFILE, JSON.stringify(profileList));

        // 변경상태 반영
        setProfileList(profileList);
      } else if (selectedMode === BASEBALL) {
        const userInput = e.target.value.trim();
        if (!isInputValid(userInput)) {
          setBaseballMessage("서로 다른 세 자리 숫자를 입력해주세요!");
          return;
        }
        const result = checkUserInput(answer, userInput);
        setBaseballResult((prev) => [
          {
            id: Date.now(),
            com: answer,
            user: userInput,
            strike: result.strike,
            ball: result.ball,
          },
          ...prev.slice(0, 5),
        ]);
        setInputValue("");
        setBaseballMessage(
          result.strike === 3
            ? "정답입니다. 3초 뒤에 게임이 리셋됩니다."
            : `${result.strike} 스트라이크 ${result.ball} 볼`
        );

        if (result.strike === 3) {
          setTimeout(() => {
            setBaseballResult([]);
            const newAnswer = generateNumber();
            setAnswer(newAnswer);
            setBaseballMessage("");
            console.log("새 정답:", newAnswer);
          }, 3000);
        }
      }
    }
  };

  useEffect(() => {
    const profileList = JSON.parse(localStorage.getItem(PROFILE) || []);
    setProfileList(profileList);
  }, []);

  useEffect(() => {
    const randomNumber = generateNumber();
    setAnswer(randomNumber);
    console.log("정답:", randomNumber);
  }, []);

  return (
    <Container>
      <GlobalStyles />{" "}
      {/* Header 등 컴포넌트가 렌더되기 전에만 호출되면, 그 뒤에 컴포넌트에 스타일이 주입됨 */}
      <Header selectedMode={selectedMode} onModeChange={handleSelectedMode} />
      <Main>
        <StyledInput
          type="text"
          placeholder={
            selectedMode === GITHUB
              ? "Github 프로필을 검색해보세요."
              : "3자리 숫자를 입력해주세요."
          }
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
        {selectedMode === BASEBALL && (
          <BaseballResult baseballResult={baseballResult} baseballMessage={baseballMessage}/>
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
