import React, { Component } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

// Importing Flexmonster Connector for amCharts
import "flexmonster/lib/flexmonster.amcharts.js";

// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import Flexmonster from 'flexmonster';

class WithAmcharts extends Component {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;
    private root!: am5.Root;

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    reportComplete = () => {
        this.flexmonster.off("reportComplete", this.reportComplete);
        //creating charts after Flexmonster instance is launched
        this.drawChart();
    }

    drawChart = () => {
        //Running Flexmonster's getData method for amCharts
        this.flexmonster.amcharts?.getData(
            {},
            this.createChart.bind(this),
            this.updateChart.bind(this)
        );
    }

    createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {

        /* Create root element and chart instance */
        this.root = am5.Root.new("chartContainer");
        let chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
        }));

        /* Apply amCharts theme */
        this.root.setThemes([
            am5themes_Animated.new(this.root),
        ]);

        /* Apply number format from Flexmonster */
        this.root.numberFormatter.set("numberFormat", this.flexmonster.amcharts?.getNumberFormatPattern((rawData.meta as any).formats[0]));

        /* Create and configure Y axis */
        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(this.root, {
            categoryField: this.flexmonster.amcharts?.getCategoryName(rawData)!,
            renderer: am5xy.AxisRendererY.new(this.root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            })
        }));

        /* Create and configure X axis */
        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(this.root, {
            renderer: am5xy.AxisRendererX.new(this.root, {}),
        }));

        xAxis.set("numberFormatter", am5.NumberFormatter.new(this.root, {
            "numberFormat": "#a"
        }));

        /* Create and configure series for a bar chart */
        let series = chart.series.push(am5xy.ColumnSeries.new(this.root, {
            name: this.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            xAxis: xAxis,
            yAxis: yAxis as any,
            sequencedInterpolation: true,
            valueXField: this.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            categoryYField: this.flexmonster.amcharts?.getCategoryName(rawData),
            tooltip: am5.Tooltip.new(this.root, {
                labelText: '{name}: [bold]{valueX}[/]'
            })
        }));

        chart.set("cursor", am5xy.XYCursor.new(this.root, {
            behavior: "none",
            xAxis: xAxis,
            yAxis: yAxis
          }));

        /* Add data processed by Flexmonster to the chart */
        yAxis.data.setAll(chartData.data);
        series.data.setAll(chartData.data);

        /* Create initial animation */
        series.appear(1000);
        chart.appear(1000, 100);
    }

    updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
        this.root.dispose();
        this.createChart(chartData, rawData)
    }

    componentWillUnmount() {
        if (this.root) {
            this.root.dispose();
        }
    }

    render() {
        return (
            <div className="App">
                <h1 className="page-title">Integrating with amCharts</h1>

                <div className="description-blocks first-description-block">
                    <p>Extend Flexmonster’s visualization functionality by integrating with the amCharts
                        library: <a href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Integration with amCharts</a>.
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
