import React from 'react'
import { useParams } from "react-router-dom";

const Note = () => {
  const params = useParams();
  return (
    <div>
      <h1>im {params.contentId}</h1>
    </div>
  )
}

export default Note
