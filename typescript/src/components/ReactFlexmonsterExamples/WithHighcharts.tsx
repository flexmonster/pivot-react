import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/flexmonster.css';
//You can use a different theme by specifying the corresponding path
//For example, to load the Green theme:
//import 'flexmonster/theme/green/flexmonster.css';

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
        if (this.flexmonster && this.flexmonster.highcharts) {
            this.flexmonster.highcharts.getData(
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
    }

    

    render() {
        return (
            <div className="App">
                <h3 className="page-title">
                    How to <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/integration-with-highcharts/">integrate with
                        Highcharts</a> example
                </h3>
                <FlexmonsterReact.Pivot 
                    ref={this.pivotRef} 
                    toolbar={true} 
                    width="100%" 
                    report="https://cdn.flexmonster.com/reports/report.json" 
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
