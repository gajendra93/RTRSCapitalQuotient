import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const locations = [
	'Bangalore',
	'Hyderabad',
	'Pune',
	'Mumbai',
	'Delhi',
]

const cuisines = [
	'Indian',
	'Chinese',
	'Italian',
	'Thai',
	'Mexican'
]

export default class AddRestaurant extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			location: null,
			cuisines: [],
			tables: []
		}
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleCuisinesChange = this.handleCuisinesChange.bind(this);
		this.handleTablesChange = this.handleTablesChange.bind(this);
		this.handleAddTable = this.handleAddTable.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.resetFields = this.resetFields.bind(this);
	}

	componentWillMount() {
		if(this.props.edit) {
			this.setState({
				name: this.props.restro.name,
				location: this.props.restro.location,
				cuisines: this.props.restro.cuisines,
				tables: this.props.restro.tables
			})
		}
	}

	handleNameChange(event) {
		this.setState({
			name: event.target.value
		})
	}

	handleLocationChange(value) {
		this.setState({
			location: value
		})
	}

	handleCuisinesChange(values) {
		this.setState({
			cuisines: values
		})
	}

	handleTablesChange(event, index, field) {
		let tables = this.state.tables;
		tables[index][field] = event.target.value;
		this.setState({
			tables: tables
		})
	}

	handleAddTable() {
		let tables = this.state.tables;
		let newTable = {
			capacity: 0,
			total: 0,
			reserved: 0
		}
		tables.push(newTable);
		this.setState({
			tables: tables
		})
	}

	handleAdd() {
		let restro = {};
		restro.name = this.state.name;
		restro.location = this.state.location;
		restro.cuisines = this.state.cuisines;
		restro.tables = this.state.tables;
		if(this.props.edit) {
			this.props.handleEdit(restro)
		} else {
			this.props.handleAdd(restro);
		}
		this.resetFields();
	}

	resetFields() {
		this.setState({
			name: '',
			location: null,
			cuisines: [],
			tables: []
		})
	}

	render() {
		let th = this;
		let buttonLabel = this.props.edit? "Save" : "Add Restro"
		return(
			<div>
				<TextField
		      hintText="Give a name to the restaurant"
		      floatingLabelText="Name"
		      value={this.state.name}
		      onChange={this.handleNameChange}
		      disabled={this.props.edit}
		    /><br/>
		    <SelectField
          floatingLabelText="Location"
          value={this.state.location}
          onChange={(e, i, val) => this.handleLocationChange(val)}
        >
          {
          	locations.map((location, index) => {
          		return <MenuItem key={index} value={location} primaryText={location} />
          	})
          }
        </SelectField><br/>
        <SelectField
        	multiple={true}
          floatingLabelText="Cuisines"
          value={this.state.cuisines}
          onChange={(e, i, vals) => this.handleCuisinesChange(vals)}
        >
        	{
          	cuisines.map((cuisine, index) => {
          		return (
          			<MenuItem 
	          			key={index} 
	          			value={cuisine} 
	          			primaryText={cuisine} 
	          			insetChildren={true}
	        				checked={th.state.cuisines && th.state.cuisines.indexOf(cuisine) > -1}
          			/>
          		)
          	})
          }
        </SelectField><br/>
        <FlatButton 
		    	label="Add Table" 
		    	primary={true} 
		    	onClick={this.handleAddTable}
		    />
		    {
		    	this.state.tables.length > 0 &&
	        <div style={{borderStyle: 'solid'}}>
		        {
		        	this.state.tables.map(function (type, key) {
		        		return (
		        			<div key={key}>
			        			<TextField
								      floatingLabelText="Tables for"
								      value={th.state.tables[key].capacity}
								      onChange={(e)=>th.handleTablesChange(e, key, 'capacity')}
								    />
								    <TextField
								      floatingLabelText="Total Number of Tables"
								      value={th.state.tables[key].total}
								      onChange={(e)=>th.handleTablesChange(e, key, 'total')}
								    />
								    <br/>
							    </div>
		        		)
		        	})
		        }
	        </div>
      	}	
		    <br/>
		    {
		    	<RaisedButton 
			    	label={buttonLabel} 
			    	primary={true} 
			    	onClick={this.handleAdd}
			    />
		    }
			</div>
		)
	}
}