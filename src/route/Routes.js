import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import Login from '../components/Login';
import ChooseCategory from '../components/ChooseCategory';
import Writing from '../containers/Writing';
import BookSearch from '../components/BookSearch';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/choose-category' component={ChooseCategory} />
                <Route exact path='/writing' component={Writing} />
                <Route exact path='/writing/book-search' component={BookSearch} />
            </Switch>
        </Router>
    );
}

export default Routes 
