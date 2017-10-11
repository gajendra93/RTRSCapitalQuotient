import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './components/App.jsx';
import Restaurant from './components/restaurant/index.jsx';
import Customer from './components/customer/index.jsx';

injectTapEventPlugin();

const muiTheme = getMuiTheme(baseTheme);

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme}>
		<Router history={hashHistory}>
			<Route path="/" component={App} >
				<Route path="/restaurant" component={Restaurant} />
				<Route path="/customer" component={Customer} />
			</Route>
		</Router>
	</MuiThemeProvider>,
	document.getElementById("root")
);
