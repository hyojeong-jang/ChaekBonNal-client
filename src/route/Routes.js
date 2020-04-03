import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/login' component={Login} />
            </Switch>
        </Router>
    );
}

export default Routes 
