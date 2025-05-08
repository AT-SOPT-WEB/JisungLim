import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../../shared/components/userInput";
import { updateNickname } from "../../../shared/apis/user";
import { useOutletContext } from "react-router-dom";

type NicknameInputs = {
  userNickname: string;
};

type OutletContext = {
  nickname: string;
  setNickname: (nickname: string) => void;
};

const Info = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NicknameInputs>({
    mode: "onChange",
  });

  const { setNickname } = useOutletContext<OutletContext>();

  const onSubmit: SubmitHandler<NicknameInputs> = async (data) => {
    console.log("폼 제출 성공!", data);

    try {
      const response = await updateNickname(data.userNickname);
      if (response.success) {
        console.log("닉네임 변경 완료");
        setNickname(data.userNickname);
      } else {
        console.log("code: ", response.code);
        console.log("message: ", response.message);
      }
    } catch (error) {
      console.error("닉네임 변경 실패", error);
    }
  };

  return (
    <div className="form-wrapper">
      <p className="form-title">내 정보 수정하기</p>
      <main className="mt-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-start gap-2"
        >
          <UserInput
            registerName="userNickname"
            label="새 닉네임"
            placeholder="닉네임을 입력해주세요"
            register={register}
            error={errors.userNickname}
            rules={{
              required: "닉네임을 입력해주세요.",
              maxLength: { value: 20, message: "20자 이하로 입력해주세요." },
              minLength: {
                value: 1,
                message: "1자 이상 입력해주세요.",
              },
              pattern: {
                value: /^[가-힣a-zA-Z0-9]+$/,
                message: "한글, 영어, 숫자만 사용할 수 있어요.",
              },
            }}
          />

          <button type="submit" className="form-button" disabled={!isValid}>
            저장
          </button>
        </form>
      </main>
    </div>
  );
};

export default Info;
