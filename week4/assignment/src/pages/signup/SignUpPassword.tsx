import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../shared/components/userInput";

type PasswordInputs = {
  // 공식문서에 interface가 아니라 type으로 돼있음!
  userPassword: string;
  confirmPassword: string;
};

const SignUpPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordInputs>({
    mode: "onChange",
  });

  // watch()로 실시간 값 추적
  const userPassword = watch("userPassword");
  const confirmPassword = watch("confirmPassword");

  const onSubmit: SubmitHandler<PasswordInputs> = (data) => {
    console.log("폼 제출 성공!", data);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="form-title">회원가입</p>

      <main className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <p className="text-[1.6rem] mb-2">비밀번호</p>
          <UserInput
            registerName="userPassword"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            register={register}
            error={errors.userPassword}
            rules={{
              required: "비밀번호를 입력해주세요.",
              maxLength: {
                value: 20,
                message: "20자 이하로 입력해주세요",
              },
            }}
          />

          <UserInput
            registerName="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            register={register}
            error={errors.confirmPassword}
            rules={{
              required: "비밀번호 확인란을 입력해주세요.",
              validate: (value) =>
                value === userPassword || "비밀번호가 일치하지 않아요.",
            }}
          />

          <button
            className="form-button"
            type="submit"
            disabled={
              !userPassword ||
              !confirmPassword ||
              userPassword !== confirmPassword ||
              userPassword.length > 20
            }
          >
            다음
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignUpPassword;
