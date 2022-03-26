import React, { Component } from 'react';
import Home from './containers/Home';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Login from './containers/Login';
import Activate from './containers/Activate';
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';



import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

export default class App extends Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return (
			<Provider store = {store}>
				<Router>
					<Layout>
						<Routes>
							<Route exact path='/' element={<Home />} />
							<Route exact path='/signup' element={<Signup />} />
							<Route exact path='/reset-password' element={<ResetPassword />} />
							<Route exact path='/login' element={<Login />} />
							<Route exact path='/activate/:uid/:token' element={<Activate />} />
							<Route exact path='password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
						</Routes>
					</Layout>
				</Router>
			</Provider>	
		);
	}
}
/*get element by id*/