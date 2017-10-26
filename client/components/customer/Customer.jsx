import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Request from 'superagent';

import SearchRestaurant from './SearchRestaurant.jsx';

export default class Customer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			restros: []
		}
	}

	componentWillMount() {
		this.getRestros();
	}

	getRestros() {
		let th = this;
		Request
			.get('/restaurant/restros')
			.end(function(err, res) {
				if(err)
		    	console.log(err);
		    else {
		    	console.log('Restros fetched successfully...', res.body);
		    	th.setState({
		    		restros: res.body
		    	})
		    }
			})
	}

	render() {
		return(
			<div>
				<SearchRestaurant />
			</div>
		)
	}	

}
