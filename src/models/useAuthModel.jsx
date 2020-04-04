import { createModel } from 'hox';
import { useState } from 'react';

function useAuthModel() {
	const [auth, setAuth] = useState(false);

	const setAuthStatus = () => {
		if (localStorage.jwtToken) {
			setAuth(true);
		}else{
			setAuth(false);
		}
	};

	return { auth, setAuthStatus };
}

export default createModel(useAuthModel);
