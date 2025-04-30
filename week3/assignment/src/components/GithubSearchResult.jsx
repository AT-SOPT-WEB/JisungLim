import React from "react";
import styled from "@emotion/styled";

const GithubSearchResult = ({ userInfo, onClose }) => {
  return (
    <div>
      {userInfo.status === "resolved" && (
        <ProfileWrapper>
          <XButton type="button" onClick={onClose}>
            X
          </XButton>
          <ProfileLink
            href={userInfo.data.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProfileImage src={userInfo.data.avatar_url} />
          </ProfileLink>
          <ProfileLink
            href={userInfo.data.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ProfileName>{userInfo.data.name}</ProfileName>
          </ProfileLink>
          <ProfileNickname>{userInfo.data.login}</ProfileNickname>
          <ProfileBio>
            {!userInfo.data.bio ? "한 줄 소개가 없습니다" : userInfo.data.bio}
          </ProfileBio>
          <FollowWrapper>
            <Follow>
              <p>Followers</p>
              <p>{userInfo.data.followers}</p>
            </Follow>
            <Follow>
              <p>Following</p>
              <p>{userInfo.data.following}</p>
            </Follow>
          </FollowWrapper>
        </ProfileWrapper>
      )}
    </div>
  );
};

export default GithubSearchResult;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  align-items: center;
  background-color: #22344e;
  width: 400px;
  border-radius: 10px;
  padding: 20px;
`;

const ProfileLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover; /* 이미지가 잘려도 비율 안깨짐 */
  border-radius: 50%;
  margin-bottom: 30px;
  border: 2px solid #4d75af;
  transition:
    transform 0.3s,
    border 0.3s;

  &:hover {
    transform: scale(1.07);
    border: 2px solid #e7eaf1;
  }
`;

const ProfileName = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const ProfileNickname = styled.p`
  color: #99abcc;
  margin-bottom: 10px;
`;

const ProfileBio = styled.p`
  color: white;
  margin-bottom: 40px;
  font-size: 13px;
`;

const FollowWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

const Follow = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  color: white;
  background-color: #4d75af;
`;

const XButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: #4d75af;
  padding: 10px;
  border-radius: 50%;
  border: none;
  color: white;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a5e94;
  }
`;
