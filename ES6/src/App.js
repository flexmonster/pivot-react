import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PivotTable from './PivotTable';
import PivotTableAndHighcharts from './PivotTableAndHighcharts';
import APICallsAndEvents from './APICallsAndEvents';
import PivotTableHooks from './PivotTableHooks';
import './App.css';

class App extends Component {

  render(){
    return (
      <>
        <div className="button-routes-container">
          <a className="btn-route" href="/">Flexmonster React Class Component</a>
          <a className="btn-route" href="/highcharts">Flexmonster Highcharts</a>
          <a className="btn-route" href="/api-calls">Flexmonster API calls and events</a>
          <a className="btn-route" href="/hooks">Flexmonster React Hook</a>
        </div>
        <Router>
          <Route path="/" component={PivotTable} exact/>
          <Route path="/highcharts" component={PivotTableAndHighcharts}/>
          <Route path="/api-calls" component={APICallsAndEvents}/>
          <Route path="/hooks" component={PivotTableHooks}/>
        </Router>
      </>

    );
  }

}

export default App;
