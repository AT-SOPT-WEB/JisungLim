import { useForm, type SubmitHandler } from "react-hook-form";
import UserInput from "../../../shared/components/userInput";
import { useState } from "react";
import { searchNickname } from "../../../shared/apis/user";

type NicknameInputs = {
  userNickname: string;
};

const Search = () => {
  const [searchResult, setSearchResult] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NicknameInputs>({
    mode: "onChange",
  });

  const userNickname = watch("userNickname") ?? "";

  const onSubmit: SubmitHandler<NicknameInputs> = async (data) => {
    console.log("폼 제출 성공!", data);
    try {
      const response = await searchNickname(data.userNickname);
      if (response.nicknameList && response.nicknameList.length > 0) {
        setSearchResult(response.nicknameList);
      } else {
        console.log("해당하는 닉네임이 없습니다.");
      }
    } catch {
      console.log("닉네임 검색 요청 실패");
    }
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
              maxLength: { value: 20, message: "20자 이하로 입력해주세요." },
            }}
          />

          <button
            type="submit"
            className="form-button"
            disabled={userNickname.length > 20}
          >
            확인
          </button>
          {searchResult.length > 0 &&
            searchResult.map((search, index) => (
              <div key={index}>{search}</div>
            ))}
        </form>
      </main>
    </div>
  );
};

export default Search;
