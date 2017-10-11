import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Request from 'superagent';
import {Grid, Row, Col} from 'react-flexbox-grid';

import AddRestaurant from './AddRestaurant.jsx';
import RestaurantCard from './RestaurantCard.jsx';

export default class Restaurant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			restros: []
		}
		this.addRestro = this.addRestro.bind(this);
		this.getRestros = this.getRestros.bind(this);
		this.deleteRestro = this.deleteRestro.bind(this);
	}

	componentWillMount() {
		this.getRestros();
	}

	addRestro(restro) {
		let th = this;
		Request
			.post('/restaurant/addrestro')
			.send(restro)
			.end(function(err, res) {
				if(err)
		    	console.log(err);
		    else {
		    	console.log('Restro added successfully...');
		    	th.getRestros();
		    }
			})
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

	deleteRestro(restro) {
		let th = this;
		Request
			.delete('/restaurant/removerestro')
			.send(restro)
			.end(function (err, res) {
				if(err)
		    	console.log(err);
		    else {
		    	console.log('Restro removed successfully...');
		    	th.getRestros();
		    }
			})
	}

	render() {
		let th = this;
		return(
			<Tabs>
				<Tab label="Onboard Restaurant">
					<AddRestaurant handleAdd={this.addRestro} />
				</Tab>
				<Tab label="All Restaurants">
					<div>
						<Grid>
							<Row>
							{
								this.state.restros.map(function(restro, key) {
									return (
										<Col md={4} key={key}>
											<RestaurantCard 
												restro={restro}
												handleRestroDelete={th.deleteRestro}
											/>
										</Col>
									)
								})
							}
							</Row>
						</Grid>
					</div>
				</Tab>
			</Tabs>
		)
	}	

}
