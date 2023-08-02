import React, { useEffect, useRef } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster/lib/flexmonster.amcharts.js';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

function WithAmcharts() {
    const pivotRef = useRef(null);
    const rootRef = useRef(null);

    useEffect(() => {
        if(pivotRef.current){
            pivotRef.current.flexmonster.on('reportcomplete', reportComplete);
        }

        return () => {
            if(pivotRef.current) {
                pivotRef.current.flexmonster.off('reportcomplete', reportComplete);
            }
            if (rootRef.current) {
                rootRef.current.dispose();
            }
        };
    }, []);

    const reportComplete = () => {
        drawChart();
    };

    const drawChart = () => {
        pivotRef.current.flexmonster.amcharts.getData(
            {},
            (chartData, rawData) => createChart(chartData, rawData),
            (chartData, rawData) => updateChart(chartData, rawData)
        );
    };

    const createChart = (chartData, rawData) => {
        const root = am5.Root.new('amcharts-container');
        rootRef.current = root;

        const chart = root.container.children.push(
            am5xy.XYChart.new(root, {})
        );

        root.setThemes([am5themes_Animated.new(root)]);

        root.numberFormatter.set(
            'numberFormat',
            pivotRef.current.flexmonster.amcharts.getNumberFormatPattern(
                rawData.meta.formats[0]
            )
        );

        const yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: pivotRef.current.flexmonster.amcharts.getCategoryName(
                    rawData
                ),
                renderer: am5xy.AxisRendererY.new(root, {
                    cellStartLocation: 0.1,
                    cellEndLocation: 0.9,
                }),
            })
        );

        const xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            renderer: am5xy.AxisRendererX.new(root, {}),
        }));

        xAxis.set('numberFormatter', am5.NumberFormatter.new(root, {
            'numberFormat': '#a'
        }));

        const series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: pivotRef.current.flexmonster.amcharts.getMeasureNameByIndex(
                    rawData,
                    0
                ),
                xAxis: xAxis,
                yAxis: yAxis,
                sequencedInterpolation: true,
                valueXField: pivotRef.current.flexmonster.amcharts.getMeasureNameByIndex(
                    rawData,
                    0
                ),
                categoryYField: pivotRef.current.flexmonster.amcharts.getCategoryName(
                    rawData
                ),
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{name}: [bold]{valueX}[/]',
                }),
            })
        );

        chart.set('cursor', am5xy.XYCursor.new(root, {
            behavior: 'none',
            xAxis: xAxis,
            yAxis: yAxis,
        }));

        yAxis.data.setAll(chartData.data);
        series.data.setAll(chartData.data);

        series.appear(1000);
        chart.appear(1000, 100);
    };

    const updateChart = (chartData, rawData) => {
        if (rootRef.current) {
            rootRef.current.dispose();
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
                beforetoolbarcreated={(toolbar) => {
                    toolbar.showShareReportTab = true;
                }}
                shareReportConnection={{
                    url: 'https://olap.flexmonster.com:9500',
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
