import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';

export default class App extends React.Component {

  render() {
		return (
			<div style={{textAlign: 'center'}}>
				<h1 style={{fontWeight: 'bold'}}>
					Restaurant Table Reservation System
				</h1>
				<Link to={'/restaurant'}>
					<FlatButton label="Restaurant" primary={true} />
				</Link>
				<Link to={'/customer'}>
    			<FlatButton label="Customer" secondary={true} />
    		</Link>
				{this.props.children}
			</div>
		)
	}

}
