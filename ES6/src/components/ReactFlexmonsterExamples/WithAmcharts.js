import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

// Importing Flexmonster's connector for amcharts
import "flexmonster/lib/flexmonster.amcharts.js";

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

class WithAmcharts extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    reportComplete = () => {
        this.myRef.current.flexmonster.off(this.reportComplete);
        //creating charts after Flexmonster instance is launched
        this.drawChart();
    }

    drawChart() {
        //Running Flexmonster's getData method for amCharts
        this.myRef.current.flexmonster.amcharts.getData(
            {},
            this.createChart.bind(this),
            this.updateChart.bind(this)
        );
    }

    createChart(chartData, rawData) {

        /* Apply amCharts theme */
        am4core.useTheme(am4themes_animated);

        /* Create chart instance */
        let chart = am4core.create("chartContainer", am4charts.PieChart);

        /* Add data processed by Flexmonster to the chart */
        chart.data = chartData.data;

        /* Set an inner radius to transform a pie chart into a donut chart */
        chart.innerRadius = am4core.percent(50);

        /* Create and configure series for a pie chart */
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.category = this.myRef.current.flexmonster.amcharts.getCategoryName(rawData);
        pieSeries.dataFields.value = this.myRef.current.flexmonster.amcharts.getMeasureNameByIndex(rawData, 0);
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        /* Create initial animation */
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        this.chart = chart;
    }

    updateChart(chartData, rawData) {
        this.chart.dispose();
        this.createChart(chartData, rawData)
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div className="App">
                <h3 className="page-title">
                    Integrating <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_react">with
                        amCharts</a>
                </h3>
                <FlexmonsterReact.Pivot
                    ref={this.myRef}
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
                    <div id="chartContainer" style={{ width: "100%", height: "500px" }}></div>
                </div>
            </div>
        );
    }
}

export default WithAmcharts;
