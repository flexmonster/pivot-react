import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import Highcharts from 'highcharts';


class PivotTableAndHighcharts extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
     }

    reportComplete = () => {
        this.myRef.current.flexmonster.off(this.reportComplete);
        this.createChart();  
    }

    createChart = () => {
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

    
    //Please specify the licenseKey property in the component with your license key
    //Example: <FlexmonsterReact.Pivot licenseKey="YOUR_LICENSE_KEY" />
    //For more information, please see: https://www.flexmonster.com/doc/typical-errors/#third-party
    render() {
        return (
            <div className="App">
                <FlexmonsterReact.Pivot 
                    ref={this.myRef} 
                    toolbar={true} 
                    width="100%" 
                    report="https://cdn.flexmonster.com/reports/report.json"
                    reportcomplete={this.reportComplete}
                />
                <div id="highcharts-container"></div>
            </div>
        );
    }
}

export default PivotTableAndHighcharts;
