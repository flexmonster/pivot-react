// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
// Types are static, so we can safely import it for use in references
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const PivotWrap = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
});

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export default function WithAmcharts4() {

    const pivotRef: React.RefObject<Pivot | null> = React.useRef<Pivot>(null);
    let chart!: am4charts.PieChart;


    const reportComplete = () => {
        pivotRef.current!.flexmonster.off("reportComplete", reportComplete);
        //creating charts after Flexmonster instance is launched
        drawChart();
    }

    const drawChart = () => {
        //Running Flexmonster's getData method for amCharts
        pivotRef.current!.flexmonster.amcharts?.getData(
            {},
            createChart,
            updateChart
        );
    }

    const createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {

        if (pivotRef.current!.flexmonster && pivotRef.current!.flexmonster.amcharts) {
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
            pieSeries.dataFields.category = pivotRef.current!.flexmonster.amcharts.getCategoryName(rawData);
            pieSeries.dataFields.value = pivotRef.current!.flexmonster.amcharts.getMeasureNameByIndex(rawData, 0);
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;

            /* Create initial animation */
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;

            chart = chart;
        }

    }

    const updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
        chart.dispose();
        createChart(chartData, rawData)
    }

    return (
        <div className="App">
            <h1 className="page-title">Integrating with amCharts</h1>

            <div className="description-blocks first-description-block">
                <p>Extend Flexmonster’s visualization functionality by integrating with the amCharts
                    library: <a href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Integration with amCharts</a>.
                </p>
            </div>

            <PivotWrap
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
                report="https://cdn.flexmonster.com/github/demo-report.json"
                licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
                reportcomplete={reportComplete}
            //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
            <div className="chart-container">
                <div id="chartContainer" style={{ width: "100%", height: "500px" }}></div>
            </div>
        </div>
    );
}