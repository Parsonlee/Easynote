import { createModel } from "hox";
import { useState } from "react";

const initList = [
  {
    active: 0,
    behave: 'h1',
    content: '大标题'
  },
  {
    active: 0,
    behave: 'h2',
    content: '小标题'
  },
  {
    active: 0,
    behave: 'h3',
    content: '次级标题'
  },
  {
    active: 1,
    behave: 'body',
    content: '正文'
  },
  {
    active: 0,
    behave: 'link',
    content: '链接'
  },
]

function useEditBar(){
  const [editList, setEditList] = useState(initList)

  const selectEdit = (behave)=>{
    setEditList(prevList=>(
      editList.map(item=>{
        if(behave===item.behave){
          item.active = 1
        }else {
          item.active = 0
        }
        return item
      })
    ))
  }

  return {
    editList,
    selectEdit
  }
}

export default createModel(useEditBar)