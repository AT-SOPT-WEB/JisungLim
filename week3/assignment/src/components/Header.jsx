import React from "react";
import styled from "@emotion/styled";
import { BASEBALL, GITHUB } from "../js/constants";

const Header = ({ selectedMode, onModeChange }) => {
  return (
    <HeaderContainer>
      <h1>⚾️ 숫자야구 || 🔍 깃허브 검색</h1>

      <ButtonWrapper>
        <SelectModeButton
          type="button"
          onClick={() => onModeChange(GITHUB)}
          isSelected={selectedMode === GITHUB}
        >
          🔍 깃허브 검색
        </SelectModeButton>

        <SelectModeButton
          type="button"
          onClick={() => onModeChange(BASEBALL)}
          isSelected={selectedMode === BASEBALL}
        >
          ⚾️ 숫자야구
        </SelectModeButton>
      </ButtonWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  background-color: #4d75af;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const SelectModeButton = styled.button`
  margin-top: 15px;
  padding: 7px 15px;
  color: white;
  border-radius: 6px;
  font-size: 16px;
  background-color: ${({ isSelected }) => (isSelected ? "#37537c" : "#4d75af")};
  transition: background-color 0.3s;

  &:hover {
    background-color: #2c4465;
  }
`;
