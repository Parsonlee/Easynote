import React from 'react';
import { FormInput } from "./Register";

import useThemeModel from '../../models/useThemeModel';

const UserInfo = () => {
  const {theme} = useThemeModel();
  return (
    <div>
      <FormInput type="text" theme={theme} value="hahah"/>
      <FormInput type="text" theme={theme} value="hahah"/>
      <FormInput type="text" theme={theme} value="hahah"/>
      <FormInput type="text" theme={theme} value="hahah"/>
    </div>
  )
}

export default UserInfo
