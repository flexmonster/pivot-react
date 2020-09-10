import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

class PivotTable extends Component {
    render() {
        return (
            <>
                <h3 className="page-title">Simple Usage Example</h3>
                <div className="App">
                    <FlexmonsterReact.Pivot 
                        toolbar={true} 
                        width="100%" 
                        report="https://cdn.flexmonster.com/reports/report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>
            </>
        );
    }
}

export default PivotTable;
