import React from 'react'

const GithubSearchResult = ({userInfo}) => {
  return (
    <div>
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
    </div>
  )
}

export default GithubSearchResult
