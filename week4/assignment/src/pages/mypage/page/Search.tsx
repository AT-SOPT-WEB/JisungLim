import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../../shared/components/userInput";

type NicknameInputs = {
  userNickname: string;
};

const Search = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NicknameInputs>({
    mode: "onChange",
  });

  const userNickname = watch("userNickname") ?? "";

  const onSubmit: SubmitHandler<NicknameInputs> = (data) => {
    console.log("폼 제출 성공!", data);
  };

  return (
    <div className="form-wrapper">
      <p className="form-title">SOPT회원 조회하기</p>
      <main className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <UserInput
            registerName="userNickname"
            label="닉네임"
            placeholder="검색할 닉네임을 입력하세요"
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
            disabled={userNickname.length > 20}
          >
            저장
          </button>
        </form>
      </main>
    </div>
  );
};

export default Search;
