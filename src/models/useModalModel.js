import { createModel } from "hox"
import { useState } from "react"

const initData={
  onOff: false,
  title: '警告',
  description: '您的电脑可能马上中病毒',
}

function useModal(){
  // 数据
  const [modal, setShowModal] = useState(initData)
  // 方法
  const openModal = ({
    title='警告',
    description='这是一个Modal弹框'
  })=>{
    setShowModal({
      onOff: true,
      title,
      description
    })
  }
  // 方法
  const closeModal = ()=>{
    setShowModal({
      onOff: false
    })
  }

  return {
    modal,
    openModal,
    closeModal
  }

}

export default createModel(useModal)