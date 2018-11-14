import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FlexmonsterReact.Pivot toolbar={true} licenseKey="Z71F-XAJE21-361R5E-5Z6H68" componentFolder="" width="100%" report="https://cdn.flexmonster.com/reports/report.json"/>
      </div>
    );
  }
}

export default App;
