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
                    licenseKey="Z78L-XH373N-1T2I4R-5E3C5Y-5Q503M-1N2W0I-6R1M2Z-0H3Q2T-3N034Q-4A3K57-60" 
                    reportcomplete={this.reportComplete}
                />
                <div id="highcharts-container"></div>
            </div>
        );
    }
}

export default PivotTableAndHighcharts;
