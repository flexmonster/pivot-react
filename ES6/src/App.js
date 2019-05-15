import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PivotTable from './PivotTable';
import APICallsAndEvents from './APICallsAndEvents'

class App extends Component {

  render(){
    return (
        <Router>
          <Route path="/" component={PivotTable} exact/>
          <Route path="/api-calls" component={APICallsAndEvents}/>
        </Router>

    );
  }

}

export default App;
