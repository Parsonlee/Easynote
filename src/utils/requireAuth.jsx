import React from 'react';
import { Redirect } from 'react-router-dom';
import useAuthModel from '../models/useAuthModel';

export default function (ComposedComponent) {
	function Authenticated(props) {
		const { auth } = useAuthModel();
		if (!auth) {
			return <Redirect to='/login' />;
		} 
		return <ComposedComponent {...props}></ComposedComponent>;
	}

	return Authenticated;
}
