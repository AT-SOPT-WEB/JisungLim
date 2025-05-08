import React, { useState } from "react";
import SignUpId from "../components/SignUpId";
import SignUpPassword from "../components/SignUpPassword";
import SignUpNickname from "../components/SignUpNickname";
import { useNavigate } from "react-router-dom";

// 공식문서에서 interface보다 type 많이 사용
type Step = "id" | "password" | "nickname";

const SignUp = () => {
  const [signUpStep, setSignUpStep] = useState<Step>("id");

  // DOM 이벤트 핸들러가 아니므로 handleXXX로 이름 짓지 않음(함수 이름 자유)
  const moveToPassword = () => setSignUpStep("password");
  const moveToNickname = () => setSignUpStep("nickname");

  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="form-wrapper">
        {signUpStep === "id" && <SignUpId moveNext={moveToPassword} />}
        {signUpStep === "password" && (
          <SignUpPassword moveNext={moveToNickname} />
        )}
        {signUpStep === "nickname" && <SignUpNickname />}
        <div className="flex mt-4 text-[1.2rem]">
          <p className=" text-gray-500">이미 회원이신가요?</p>
          <button
            type="button"
            className=" text-green-500 underline"
            onClick={handleSignIn}
          >
            &nbsp;로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
