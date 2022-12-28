import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Home} from './routes/Home.js';

class App extends React.Component {
    render() {
        return (
            <div className="Main">
                <Router history={browserHistory}>
                    <Route path={"/"} component={Home} >
                        <IndexRoute component={Home} />
                        <Route path={"Home"} component={Home} />
                    </Route>
                </Router>
            </div>
        );
    }
}

render(<App />, window.document.getElementById('root'));