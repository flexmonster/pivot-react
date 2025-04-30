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

import * as Highcharts from 'highcharts';

export default function WithHighcharts() {

    const pivotRef: React.RefObject<Pivot | null> = React.useRef<Pivot>(null);

    const reportComplete = () => {
        pivotRef.current!.flexmonster.off("reportComplete", reportComplete);
        //creating charts after Flexmonster instance is launched
        createChart();
    }

    const createChart = () => {
        //Running Flexmonster's getData method for Highcharts
        pivotRef.current!.flexmonster.highcharts?.getData(
            {
                type: "spline"
            },
            (data: any) => {
                Highcharts.chart('highcharts-container', data);
            },
            (data: any) => {
                Highcharts.chart('highcharts-container', data);
            }
        );
    }

    return (
        <div className="App">
            <h1 className="page-title">Integrating with Highcharts</h1>

            <div className="description-blocks first-description-block">
                <p>Integrate Flexmonster with Highcharts and see your data from a new
                    perspective: <a href="https://www.flexmonster.com/doc/integration-with-highcharts/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Integration with Highcharts</a>.
                </p>
            </div>

            <FlexmonsterPivot
                ref={pivotRef}
                toolbar={true}
                beforetoolbarcreated={toolbar => {
                    toolbar.showShareReportTab = true;
                }}
                shareReportConnection={{
                    url: "https://olap.flexmonster.com:9500"
                }}
                width="100%"
                height={600}
                report="https://cdn.flexmonster.com/github/highcharts-report.json"
                licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
                reportcomplete={reportComplete}
            //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
            <div className="chart-container">
                <div id="highcharts-container"></div>
            </div>
        </div>
    );
}