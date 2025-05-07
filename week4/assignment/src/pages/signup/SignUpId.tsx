import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../shared/components/userInput";

type IdInputs = {
  userId: string;
};

const SignUpId = () => {
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
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="form-title">회원가입</p>

      <main className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <p className="text-[1.6rem] mb-2">아이디</p>
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

      <div className="flex mt-2 text-[1.2rem]">
        <p className=" text-gray-500">이미 회원이신가요?</p>
        <button type="button" className=" text-green-500 underline">
          &nbsp;로그인
        </button>
      </div>
    </div>
  );
};

export default SignUpId;
