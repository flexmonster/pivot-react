import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

class PivotTable extends Component {
    render() {
        return (
            <div className="App">
                <FlexmonsterReact.Pivot toolbar={true} width="100%" report="https://cdn.flexmonster.com/reports/report.json"/>
            </div>
        );
    }
}

export default PivotTable;
