import 'flexmonster/flexmonster.min.css';
import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppHooks from './AppHooks';
import { Component } from 'react';

class RouterComponent extends Component {

  render(){
    return (
        <Router>
          <Route path="/" component={App} exact/>
          <Route path="/hooks" component={AppHooks}/>
        </Router>

    );
  }

}

ReactDOM.render(
  <RouterComponent />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
