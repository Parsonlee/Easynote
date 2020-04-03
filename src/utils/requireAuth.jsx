import React from 'react';
import { useHistory } from 'react-router-dom';

export default function(ComposedComponent) {
	class Authenticated extends React.Component {
		history = useHistory();

		componentWillMount() {
			// redux里props的isAuthenticated,待修改
			if (!this.props.isAuthenticated) {
				this.history.push('/login');
			}
		}

		// redux里props的isAuthenticated,待修改
		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.history.push('/login');
			}
		}

		render() {
			return <ComposedComponent {...this.props}></ComposedComponent>;
		}
	}

	return Authenticated;
}
