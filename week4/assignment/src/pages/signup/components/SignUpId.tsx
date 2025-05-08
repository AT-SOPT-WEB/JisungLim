import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../../shared/components/userInput";

type SignUpIdProps = {
  moveNext: () => void;
  onUserIdChange: (id: string) => void;
};

// useForm에 사용
type IdInputs = {
  userId: string;
};

const SignUpId = ({ moveNext, onUserIdChange }: SignUpIdProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IdInputs>({
    mode: "onChange",
  });

  const userId = watch("userId");

  const onSubmit: SubmitHandler<IdInputs> = (data) => {
    console.log("폼 제출 성공!", data);
    onUserIdChange(data.userId);
    moveNext();
  };

  return (
    <div className="form-wrapper">
      <h1 className="form-title">회원가입</h1>
      <main className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <p className="form-label mb-2">아이디</p>
          <UserInput
            registerName="userId"
            placeholder="아이디를 입력해주세요"
            register={register}
            error={errors.userId}
            rules={{
              required: "아이디를 입력해주세요.",
              maxLength: { value: 20, message: "20자 이하로 입력해주세요." },
            }}
          />

          <button
            type="submit"
            className="form-button"
            disabled={!userId || userId.length > 20}
          >
            다음
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignUpId;
