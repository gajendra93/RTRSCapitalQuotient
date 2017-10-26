import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';

import AddRestaurant from './AddRestaurant.jsx';

export default class RestaurantCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openEdit: false,
			openDelete: false
		}
		this.openEditDialog = this.openEditDialog.bind(this);
		this.closeEditDialog = this.closeEditDialog.bind(this);
		this.openDeleteDialog = this.openDeleteDialog.bind(this);
		this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
		this.handleRestroDelete = this.handleRestroDelete.bind(this);
		this.handleRestroEdit = this.handleRestroEdit.bind(this);
	}

	openEditDialog() {
		this.setState({
			openEdit: true
		})
	}

	closeEditDialog() {
		this.setState({
			openEdit: false
		})
	}

	openDeleteDialog() {
		this.setState({
			openDelete: true
		})
	}

	closeDeleteDialog() {
		this.setState({
			openDelete: false
		})
	}

	handleRestroDelete() {
		this.closeDeleteDialog();
		this.props.handleRestroDelete(this.props.restro);
	}

	handleRestroEdit(restro) {
		this.closeEditDialog();
		this.props.handleRestroEdit(restro);
	}

	render() {
		let cuisines = '';
		this.props.restro.cuisines.map(function (cuisine) {
			cuisines += cuisine+', ';
		})
		cuisines = cuisines.substring(0, cuisines.length-2);
		const deleteActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeDeleteDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleRestroDelete}
      />,
    ];
		return (
			<div>
				<Card>
			    <CardMedia>
			      <img 
			      	src="../../assets/images/food.jpg" 
			      	alt={this.props.restro.name+'_image'} 
			      />
			    </CardMedia>
			    <CardTitle 
	    			title={this.props.restro.name} 
	    			subtitle={cuisines}
	    		/>
	    		<CardText>
	    			{this.props.restro.location}
	    		</CardText>
			    <CardActions>
			      <FlatButton label="Edit" onClick={this.openEditDialog}/>
			      <FlatButton label="Delete" onClick={this.openDeleteDialog}/>
			    </CardActions>
			  </Card>
			  <Dialog
          title="Edit Restaurant"
          modal={false}
          open={this.state.openEdit}
          onRequestClose={this.closeEditDialog}
          autoScrollBodyContent={true}
        >
          <AddRestaurant 
          	restro={this.props.restro} 
          	edit={true}
          	handleEdit={this.handleRestroEdit}
          />
        </Dialog>
			  <Dialog
          title="Confirmation"
          actions={deleteActions}
          modal={false}
          open={this.state.openDelete}
          onRequestClose={this.closeDeleteDialog}
        >
          Are you sure? You want to delete {this.props.restro.name} from restaurants
        </Dialog>
      </div>
		)
	}
}