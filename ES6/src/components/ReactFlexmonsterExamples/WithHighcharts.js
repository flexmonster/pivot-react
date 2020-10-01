import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster/lib/flexmonster.highcharts.js';
import Highcharts from 'highcharts';


class WithHighcharts extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
     }

    reportComplete = () => {
        this.myRef.current.flexmonster.off(this.reportComplete);
        //creating charts after Flexmonster instance is launched
        this.createChart();  
    }

    createChart = () => {
        //Running Flexmonster's getData method for Highcharts
        this.myRef.current.flexmonster.highcharts.getData(
            {
                type: "area"
              },
              function(data) {
                 Highcharts.chart('highcharts-container', data);
              },
              function(data) {
                 Highcharts.chart('highcharts-container', data);
              }
        );
    }

    

    render() {
        return (
            <div className="App">
                <h3 className="page-title">
                    How to <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/integration-with-highcharts/">integrate with
                        Highcharts</a> example
                </h3>
                <FlexmonsterReact.Pivot 
                    ref={this.myRef} 
                    toolbar={true} 
                    width="100%" 
                    report="https://cdn.flexmonster.com/reports/report.json" 
                    licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
                    reportcomplete={this.reportComplete}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
                <div class="chart-container">
                    <div id="highcharts-container"></div>
                </div>
            </div>
        );
    }
}

export default WithHighcharts;
