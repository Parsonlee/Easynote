import { createModel } from 'hox'
import { useState } from 'react'

function useCounter(){
  const [count, setCount] = useState(0)
  const decrement = ()=>setCount(count-1)
  const increment = ()=>setCount(count+1)
  return {
    count,
    decrement,
    increment
  }
}

export default createModel(useCounter)