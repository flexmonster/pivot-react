"use client"
import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';

import 'flexmonster/lib/flexmonster.highcharts.js';
import * as Highcharts from 'highcharts';


class WithHighcharts extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    reportComplete = () => {
        this.flexmonster.off("reportComplete", this.reportComplete);
        //creating charts after Flexmonster instance is launched
        this.createChart();
    }

    createChart = () => {
        //Running Flexmonster's getData method for Highcharts
        this.flexmonster.highcharts?.getData(
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



    render() {
        return (
            <div className="App">
                <h1 className="page-title">Integrating with Highcharts</h1>

                <div className="description-blocks first-description-block">
                    <p>Integrate Flexmonster with Highcharts and see your data from a new 
                        perspective: <a href="https://www.flexmonster.com/doc/integration-with-highcharts/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Integration with Highcharts</a>.
                    </p>
                </div>

                <FlexmonsterReact.Pivot
                    ref={this.pivotRef}
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
                    reportcomplete={this.reportComplete}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
                <div className="chart-container">
                    <div id="highcharts-container"></div>
                </div>
            </div>
        );
    }
}

export default WithHighcharts;