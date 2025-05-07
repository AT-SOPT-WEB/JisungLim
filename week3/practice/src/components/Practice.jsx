import React from 'react'
import { useState } from 'react'

const Practice = () => {
    const [count, setCount] = useState(0);

    const onButtonClick = () => {
      setCount(count + 1);
      console.log(count);
      setCount(count + 1); 
      console.log(count);
    }

  return (
    <div>
      <button type="button" onClick={onButtonClick}>버튼버튼</button>
    </div>
  )
}

export default Practice
