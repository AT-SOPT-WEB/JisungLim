import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../../shared/components/userInput";
import { useNavigate } from "react-router-dom";

type NicknameInputs = {
  userNickname: string;
};

const SignUpNickname = () => {
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

  const onSubmit: SubmitHandler<NicknameInputs> = (data) => {
    console.log("폼 제출 성공!", data);
    navigate("/login");
  };

  return (
    <div className="form-wrapper">
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
