// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
// Types are static, so we can safely import it for use in references
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const FlexmonsterPivot = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
});

// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function WithAmcharts() {

    const pivotRef: React.RefObject<Pivot | null> = React.useRef<Pivot>(null);
    let root!: am5.Root;

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

        /* Create root element and chart instance */
        root = am5.Root.new("amcharts-container");
        let chart = root.container.children.push(am5xy.XYChart.new(root, {
        }));

        /* Apply amCharts theme */
        root.setThemes([
            am5themes_Animated.new(root),
        ]);

        /* Apply number format from Flexmonster */
        root.numberFormatter.set("numberFormat", pivotRef.current!.flexmonster.amcharts?.getNumberFormatPattern((rawData.meta as any).formats[0]));

        /* Create and configure Y axis */
        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: pivotRef.current!.flexmonster.amcharts?.getCategoryName(rawData)!,
            renderer: am5xy.AxisRendererY.new(root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            })
        }));

        /* Create and configure X axis */
        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
        }));

        xAxis.set("numberFormatter", am5.NumberFormatter.new(root, {
            "numberFormat": "#a"
        }));

        /* Create and configure series for a bar chart */
        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: pivotRef.current!.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            xAxis: xAxis,
            yAxis: yAxis as any,
            sequencedInterpolation: true,
            valueXField: pivotRef.current!.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            categoryYField: pivotRef.current!.flexmonster.amcharts?.getCategoryName(rawData),
            tooltip: am5.Tooltip.new(root, {
                labelText: '{name}: [bold]{valueX}[/]'
            })
        }));

        chart.set("cursor", am5xy.XYCursor.new(root, {
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

    const updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
        root.dispose();
        createChart(chartData, rawData)
    }

    return (
        <div className="App">
        <h1 className="page-title">Integrating with amCharts</h1>

        <div className="description-blocks first-description-block">
            <p>
                Extend Flexmonster’s visualization functionality by integrating
                with the amCharts library:{' '}
                <a
                    href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_react"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="title-link"
                >
                    Integration with amCharts
                </a>
                .
            </p>
        </div>

        <FlexmonsterPivot
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
            <div
                id="amcharts-container"
                style={{ width: '100%', height: '500px' }}
            ></div>
        </div>
    </div>
    );

}