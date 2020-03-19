/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import RichTextExample from './noteEditor/RichTextExample';

const Content = () => {
  return (
    <div css={css`
      width: 100%;
      height: 100%;
      background: #F2F2F2;
      display: flex;
      justify-content: center;
    `}>
      <RichTextExample />
    </div>
  )
}

export default Content
