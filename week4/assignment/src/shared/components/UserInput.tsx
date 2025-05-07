import type {
  FieldError,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputProps = {
  registerName: string; // register(name)에 사용
  type?: string; // input 타입
  placeholder: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  rules?: RegisterOptions;
};

const UserInput = ({
  registerName,
  type = "text",
  placeholder,
  register,
  error,
  rules,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <input
        type={type}
        placeholder={placeholder}
        {...register(registerName, rules)}
        className="form-input"
      />
      {error && <p className="form-error">{error.message}</p>}
    </div>
  );
};

export default UserInput;
