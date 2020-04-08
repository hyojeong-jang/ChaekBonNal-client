import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../containers/App';
import Login from '../components/Login';
import ChooseCategory from '../components/ChooseCategory';
import Writing from '../containers/Writing';
import BookSearch from '../components/BookSearch';
import Library from '../components/Library';
import Bookmarks from '../components/Bookmarks';
import AttachingImage from '../containers/AttachingImage';
import TextDetection from '../containers/TextDetection';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/choose-category' component={ChooseCategory} />
                <Route exact path='/writing' component={Writing} />
                <Route exact path='/writing/book-search' component={BookSearch} />
                <Route exact path='/library' component={Library} />
                <Route exact path='/bookmarks' component={Bookmarks} />
                <Route exact path='/writing/attaching-image' component={AttachingImage} />
                <Route exact path='/writing/attaching-image/text-detection' component={TextDetection} />
            </Switch>
        </Router>
    );
}

export default Routes 
