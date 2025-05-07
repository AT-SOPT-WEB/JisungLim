import React from 'react'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const buttonStyle = css`
  border-radius: 0.375rem;
  background-color: #3b82f6;
  padding: 0.5rem 1rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #2563eb;
  }
`;

const inputStyle = css`
  width: 40rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  font-size: 1rem;
`

const Search = ({search, handleSearchChange, handleSearch}) => {
    return (
        <div>
            <input 
                type="text" 
                value={search} 
                onChange={handleSearchChange} 
                placeholder="검색어를 입력하세요"   
                css={inputStyle} 
            />
            <button css={buttonStyle} type="button" onClick={handleSearch}>검색</button>
        </div>
    )
}

export default Search
