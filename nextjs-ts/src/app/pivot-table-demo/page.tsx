// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
// Types are static, so we can safely import it for use in references
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const FlexmonsterPivot = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
});

export default function PivotTableDemo() {
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
                <FlexmonsterPivot
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
