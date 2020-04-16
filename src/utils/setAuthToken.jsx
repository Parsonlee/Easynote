import axios from 'axios';

// const setAuthToken = token =>{
//   if(token){
//     axios.defaults.headers.common['Authrization'] = `easynote ${token}`;
//   }else{
//     delete axios.defaults.headers.common['Authrization'];
//   }
// }
const setAuthToken = (res) => {
	if (!res) {
		localStorage.clear();
		delete axios.defaults.headers.common['Authorization'];
		return;
	}

	const { token } = res.data;
	if (token) {
		// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		localStorage.setItem('token', token);
	}
};

export default setAuthToken;
