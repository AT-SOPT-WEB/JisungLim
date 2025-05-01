import React from "react";
import styled from "@emotion/styled";

const BaseballResult = ({ baseballResult, baseballMessage }) => {
  return (
    <BaseballWrapper>
      <Message>{baseballMessage}</Message>
      {baseballResult.map((item) => (
        <List key={item.id}>
          com: {item.com}, user: {item.user} - {item.strike}S {item.ball}B
        </List>
      ))}
    </BaseballWrapper>
  );
};

export default BaseballResult;

const BaseballWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
`;

const Message = styled.p`
  color: #4d75af;
  margin: 20px 0;
`;

const List = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 0;
  border: 1px solid #4d75af;
  border-radius: 10px;
  margin-bottom: 10px;
`;
