import { useEffect } from "react";
import { useState } from "react";

function App() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  const handleOnClick = () => {
    setCount(count + 1);
    console.log(count);
  };

  useEffect(() => {
    if (count != 0 && count < 3) {
      setAge(age + 1);
      console.log(age);
    }
  }, [count]);

  return (
    <div>
      <div>안녕하세요 전 {age}</div>
      <button type="button" onClick={handleOnClick}>
        누르면 한 살 더 먹음
      </button>
    </div>
  );
}

export default App;
