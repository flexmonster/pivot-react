"use client"
import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';

class PivotTableDemo extends React.Component {
    render() {
        return (
            <>
                <h1 className="page-title">Pivot Table Demo</h1>

                <div className="description-blocks first-description-block">
                    <p>Flexmonster is a fast and powerful JavaScript pivot grid for data visualization and reporting.</p>
                    <p>With Flexmonster, you can create reports based on many data sources, including JSON, CSV, MongoDB, and SQL
                        databases.
                        Our component is easy to customize and configure, so it can be seamlessly integrated into any project.
                    </p>
                    <p>Visit <a href="https://www.flexmonster.com/doc/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">our documentation</a> for step-by-step guidance on
                        Flexmonster.</p>
                </div>

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