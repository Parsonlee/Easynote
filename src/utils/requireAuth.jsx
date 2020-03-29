import React from 'react';
import { withRouter } from 'react-router-dom';

export default function(ComposedComponent) {
	class Authenticated extends React.Component {
		componentWillMount() {
			// redux里props的isAuthenticated,待修改
			if (!this.props.isAuthenticated) {
				this.props.history.push('/login');
			}
		}

		// redux里props的isAuthenticated,待修改
		componentWillUpdate(nextProps) {
			if (!nextProps.isAuthenticated) {
				this.props.history.push('/login');
			}
		}

		render() {
			return <ComposedComponent {...this.props}></ComposedComponent>;
		}
	}

	return withRouter(Authenticated);
}
