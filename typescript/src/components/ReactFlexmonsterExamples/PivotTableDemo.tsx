import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';

class PivotTableDemo extends React.Component {
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
                        height={600}
                        report="https://cdn.flexmonster.com/github/demo-report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>
            </>
        );
    }
}

export default PivotTableDemo;
