import React from "react";
import styled from "@emotion/styled";

const RecentSearch = ({ profileList, onProfileListChange }) => {
  return (
    profileList.length > 0 && (
        <RecentSearchWrapper>
          <RecentSearchText>최근 검색어</RecentSearchText>
          <ButtonWrapper>
            {profileList.map((profile) => (
              <RecentSearchLog key={profile}>
                {profile}
                <DeleteButton
                  type="button"
                  onClick={() => onProfileListChange(profile)}
                >
                  X
                </DeleteButton>
              </RecentSearchLog>
            ))}
          </ButtonWrapper>
        </RecentSearchWrapper>
      )
  );
};

export default RecentSearch;

const RecentSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecentSearchText = styled.p`
  font-weight: bold;
  margin-bottom: 7px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const RecentSearchLog = styled.div`
  display: flex;
  gap: 10px;
  padding: 7px 15px;
  background-color: #7390bd;
  color: white;
  border-radius: 9999px; /* 충분히 큰 수 -> 반원 형태 */
  transition: background-color 0.2s;
  align-items: center;
  font-size: 14px;

  &:hover {
    background-color: #4d75af;
  }
`;

const DeleteButton = styled.button`
  color: white;
  font-size: 14px;

  &:hover {
    color: red;
  }
`;
