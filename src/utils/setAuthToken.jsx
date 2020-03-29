import axios from 'axios';

const setAuthToken = token =>{
  if(token){
    axios.defaults.headers.common['Authrization'] = `easynote ${token}`;
  }else{
    delete axios.defaults.headers.common['Authrization'];
  }
}

export default setAuthToken;