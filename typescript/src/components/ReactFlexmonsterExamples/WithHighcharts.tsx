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
                type: "area"
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
                <h3 className="page-title">
                    Integrating <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/integration-with-highcharts/?r=rm_react">with
                        Highcharts</a>
                </h3>
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
                    report="https://cdn.flexmonster.com/github/demo-report.json"
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
