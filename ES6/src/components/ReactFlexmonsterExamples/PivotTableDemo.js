import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

class PivotTableDemo extends Component {
    render() {
        return (
            <>
                <h3 className="page-title">Pivot Table Demo</h3>
                <div className="App">
                    <FlexmonsterReact.Pivot
                        toolbar={true}
                        beforetoolbarcreated={toolbar => {
                            toolbar.showShareReportTab = true;
                        }}
                        shareReportConnection={{
                            url: "https://olap.flexmonster.com:9500"
                        }}
                        width="100%"
                        report="https://cdn.flexmonster.com/reports/report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>
            </>
        );
    }
}

export default PivotTableDemo;
