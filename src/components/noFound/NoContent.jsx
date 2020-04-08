/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import useThemeModel from '../../models/useThemeModel';

const NoContent = ()=>{
  const {theme}=useThemeModel();

  return (
    <div css={css`
      padding: 0 50px;
      font-size: 3.6rem;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      color: ${theme.color.hint};
      transform: translateY(-8%);
      a {
        color: ${theme.primary.base};
        text-decoration: none;
      }
    `}>
      请从侧栏选择一篇文章或新建
    </div>
  )
}

export default NoContent;