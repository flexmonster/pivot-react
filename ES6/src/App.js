import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlexmonsterReact.Pivot toolbar={true} componentFolder="https://cdn.flexmonster.com/" width="100%" report="https://cdn.flexmonster.com/reports/report.json"/>
      </div>
    );
  }
}

export default App;
