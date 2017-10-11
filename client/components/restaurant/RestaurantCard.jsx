import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';

export default class RestaurantCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openDelete: false
		}
		this.openDeleteDialog = this.openDeleteDialog.bind(this);
		this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
		this.handleRestroDelete = this.handleRestroDelete.bind(this);
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
			    <CardActions>
			      <FlatButton label="Edit" />
			      <FlatButton label="Delete" onClick={this.openDeleteDialog}/>
			    </CardActions>
			  </Card>
			  <Dialog
          title="Confirmation"
          actions={deleteActions}
          modal={false}
          open={this.state.openDelete}
          onRequestClose={this.handleClose}
        >
          Are you sure? You want to delete {this.props.restro.name} from restaurants
        </Dialog>
      </div>
		)
	}
}