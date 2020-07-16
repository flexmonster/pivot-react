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

    

    render() {
        return (
            <div className="App">
                <FlexmonsterReact.Pivot 
                    ref={this.myRef} 
                    toolbar={true} 
                    width="100%" 
                    report="https://cdn.flexmonster.com/reports/report.json" 
                    licenseKey="Z7LL-XHJD3G-345Q0Y-0Z0H2H-574P1U-46583P-1K1B66-4K1N4S-0K334G-3R1Q6T-5T0H" 
                    reportcomplete={this.reportComplete}
                />
                <div id="highcharts-container"></div>
            </div>
        );
    }
}

export default PivotTableAndHighcharts;
