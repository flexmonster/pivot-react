import React, { Component } from 'react';
import logo from './logo.svg';
import * as FlexmonsterReact from 'react-flexmonster';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          
          <FlexmonsterReact.Pivot toolbar={true} componentFolder="node_modules/flexmonster/" licenseKey="Z7PO-XCBB6R-2H4U51-2K0G2D" width="100%" report="https://cdn.flexmonster.com/reports/report.json"/>

      </div>
    );
  }
}

export default App;
