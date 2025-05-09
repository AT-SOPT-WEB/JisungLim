import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../shared/components/userInput";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../shared/apis/auth";
import { USER_ID_KEY } from "../../shared/constants/user";

type SignInProps = {
  userId: string;
  userPassword: string;
};

const SignIn = () => {
  const { register, handleSubmit, watch } = useForm<SignInProps>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInProps> = async (data) => {
    console.log("폼 제출 성공!", data);
    const signInData = {
      loginId: data.userId,
      password: data.userPassword,
    };
    try {
      const response = await signIn(signInData);

      if (response) {
        alert("로그인 성공");
        const userId = response.userId;
        if (userId) {
          localStorage.setItem(USER_ID_KEY, String(userId));
        }
        navigate("/mypage/info");
      } else {
        alert("로그인 실패");
      }
    } catch {
      alert("서버 통신 실패");
    }
  };

  const userId = watch("userId");
  const userPassword = watch("userPassword");
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="form-wrapper">
        <h1 className="form-title">로그인</h1>

        <main className="mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-2"
          >
            <UserInput
              registerName="userId"
              placeholder="아이디"
              register={register}
            />

            <UserInput
              registerName="userPassword"
              type="password"
              placeholder="비밀번호"
              register={register}
            />

            <button
              type="submit"
              className="form-button"
              disabled={!userId || !userPassword}
            >
              로그인
            </button>
          </form>
        </main>

        <div className="flex mt-4 text-[1.2rem]">
          <button
            type="button"
            className=" text-green-500 underline"
            onClick={handleSignUp}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
