import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../shared/components/userInput";
import { useNavigate } from "react-router-dom";

type SignInProps = {
  userId: string;
  userPassword: string;
};

const SignIn = () => {
  const { register, handleSubmit } = useForm<SignInProps>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SignInProps> = (data) => {
    console.log("폼 제출 성공!", data);
  };

  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
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
              placeholder="비밀번호"
              register={register}
            />

            <button
              type="submit"
              className="form-button"
              // onClick={}
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
