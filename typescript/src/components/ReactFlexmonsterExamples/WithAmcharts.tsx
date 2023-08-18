import React, { useEffect, useRef } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import "flexmonster/lib/flexmonster.amcharts.js";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import Flexmonster from 'flexmonster';

const WithAmcharts: React.FC = () => {
    const pivotRef: React.RefObject<FlexmonsterReact.Pivot> = useRef<FlexmonsterReact.Pivot>(null);
    let flexmonster: Flexmonster.Pivot;
    let root: am5.Root;

    useEffect(() => {
        if (pivotRef.current) {
            flexmonster = pivotRef.current.flexmonster;
            flexmonster.on("reportcomplete", reportComplete);
        }
        return () => {
            if (root) {
                root.dispose();
            }
        };
    }, []);

    const reportComplete = () => {
        flexmonster.off("reportcomplete", reportComplete);
        drawChart();
    };

    const drawChart = () => {
        flexmonster.amcharts?.getData(
            {},
            createChart,
            updateChart
        );
    };

    const createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
        root = am5.Root.new("amcharts-container");
        let chart = root.container.children.push(am5xy.XYChart.new(root, {}));

        root.setThemes([
            am5themes_Animated.new(root),
        ]);

        root.numberFormatter.set("numberFormat", flexmonster.amcharts?.getNumberFormatPattern((rawData.meta as any).formats[0]));

        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: flexmonster.amcharts?.getCategoryName(rawData)!,
            renderer: am5xy.AxisRendererY.new(root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            })
        }));

        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
        }));

        xAxis.set("numberFormatter", am5.NumberFormatter.new(root, {
            "numberFormat": "#a"
        }));

        let series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            xAxis: xAxis,
            yAxis: yAxis as any,
            sequencedInterpolation: true,
            valueXField: flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            categoryYField: flexmonster.amcharts?.getCategoryName(rawData),
            tooltip: am5.Tooltip.new(root, {
                labelText: '{name}: [bold]{valueX}[/]'
            })
        }));

        chart.set("cursor", am5xy.XYCursor.new(root, {
            behavior: "none",
            xAxis: xAxis,
            yAxis: yAxis
        }));

        yAxis.data.setAll(chartData.data);
        series.data.setAll(chartData.data);

        series.appear(1000);
        chart.appear(1000, 100);
    };

    const updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
        if (root) {
            root.dispose();
        }
        createChart(chartData, rawData);
    };

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

            <FlexmonsterReact.Pivot
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
            />
            <div className="chart-container">
                <div
                    id="amcharts-container"
                    style={{ width: '100%', height: '500px' }}
                ></div>
            </div>
        </div>
    );
};

export default WithAmcharts;
