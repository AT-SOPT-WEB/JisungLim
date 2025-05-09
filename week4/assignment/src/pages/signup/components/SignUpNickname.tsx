import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../../shared/components/userInput";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../shared/apis/auth";

type NicknameInputs = {
  userNickname: string;
};

type SignUpNicknameProps = {
  signUpData: {
    userId: string;
    userPassword: string;
    userNickname: string;
  };
};

const SignUpNickname = ({ signUpData }: SignUpNicknameProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NicknameInputs>({
    mode: "onChange",
  });

  const userNickname = watch("userNickname");
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<NicknameInputs> = async (data) => {
    console.log("폼 제출 성공!", data);

    const finalData = {
      ...signUpData,
      userNickname: data.userNickname,
    };
    console.log(finalData);

    try {
      await signUp(finalData);
      alert(`${data.userNickname}님, 환영합니다!`);
      navigate("/login");
    } catch {
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1 className="form-title">회원가입</h1>
      <main className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <p className="form-label mb-2">닉네임</p>
          <UserInput
            registerName="userNickname"
            placeholder="닉네임를 입력해주세요"
            register={register}
            error={errors.userNickname}
            rules={{
              required: "닉네임을 입력해주세요.",
              maxLength: { value: 20, message: "20자 이하로 입력해주세요." },
            }}
          />

          <button
            type="submit"
            className="form-button"
            disabled={!userNickname || userNickname.length > 20}
          >
            회원가입 하기
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignUpNickname;
