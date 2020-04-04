import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login';
import ChooseCategory from '../components/ChooseCategory'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/choose-category' component={ChooseCategory} />
            </Switch>
        </Router>
    );
}

export default Routes 
