import React, { useEffect, useRef } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import "flexmonster/lib/flexmonster.amcharts.js";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Flexmonster from 'flexmonster';

const WithAmcharts4: React.FC = () => {
    const pivotRef: React.RefObject<FlexmonsterReact.Pivot> = useRef<FlexmonsterReact.Pivot>(null);
    let flexmonster: Flexmonster.Pivot;
    let chart: am4charts.PieChart;

    useEffect(() => {
        if (pivotRef.current) {
            flexmonster = pivotRef.current.flexmonster;
            flexmonster.on("reportcomplete", reportComplete);
        }
        return () => {
            if (chart) {
                chart.dispose();
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
        if (flexmonster.amcharts) {
            am4core.useTheme(am4themes_animated);
            chart = am4core.create("chartContainer", am4charts.PieChart);
            
            chart.data = chartData.data;
            chart.innerRadius = am4core.percent(50);
            
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.category = flexmonster.amcharts.getCategoryName(rawData);
            pieSeries.dataFields.value = flexmonster.amcharts.getMeasureNameByIndex(rawData, 0);
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            
            pieSeries.hiddenState.properties.opacity = 1;
            pieSeries.hiddenState.properties.endAngle = -90;
            pieSeries.hiddenState.properties.startAngle = -90;
        }
    };

    const updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
        if (chart) {
            chart.dispose();
        }
        createChart(chartData, rawData);
    };

    return (
        <div className="App">
            <h1 className="page-title">Integrating with amCharts</h1>
            <div className="description-blocks first-description-block">
                <p>Extend Flexmonster’s visualization functionality by integrating with the amCharts 
                    library: <a href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Integration with amCharts</a>.
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
                <div id="chartContainer" style={{ width: "100%", height: "500px" }}></div>
            </div>
        </div>
    );
};

export default WithAmcharts4;
