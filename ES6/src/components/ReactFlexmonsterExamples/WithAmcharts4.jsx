import { useEffect, useRef } from "react";
import * as FlexmonsterReact from "react-flexmonster";

import "flexmonster/lib/flexmonster.amcharts.js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Applying the amCharts theme
am4core.useTheme(am4themes_animated);

function WithAmcharts4() {
  const pivotRef = useRef(null);
  const chartRef = useRef(null);

  const reportComplete = () => {
    pivotRef.current.flexmonster.off("reportcomplete");
    drawChart();
  };

  const drawChart = () => {
    pivotRef.current.flexmonster.amcharts.getData({}, createChart, updateChart);
  };

  const createChart = (chartData, rawData) => {
    // Creating a chart instance
    const chart = am4core.create("amcharts-container", am4charts.PieChart);

    // Adding data processed by Flexmonster to the chart
    chart.data = chartData.data;

    // Creating and configuring series for a pie chart
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = pivotRef.current.flexmonster.amcharts.getCategoryName(rawData);
    pieSeries.dataFields.value = pivotRef.current.flexmonster.amcharts.getMeasureNameByIndex(rawData, 0);
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 3;
    pieSeries.slices.template.strokeOpacity = 1;

    // Creating initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    chartRef.current = chart;
  };

  const updateChart = (chartData, rawData) => {
    chartRef.current?.dispose();
    createChart(chartData, rawData);
  };

  useEffect(() => {
    return () => {
      chartRef.current?.dispose();
    };
  }, []);

  return (
    <>
      <h1 className="page-title">Integrating with amCharts 4</h1>

      <div className="description-blocks first-description-block">
        <p>
          Extend Flexmonster's visualization functionality by integrating with the amCharts library:{" "}
          <a
            href="https://www.flexmonster.com/doc/integration-with-amcharts/?r=rm_react"
            target="_blank"
            rel="noopener noreferrer"
            className="title-link"
          >Integration with amCharts</a>.
        </p>
      </div>

      <FlexmonsterReact.Pivot
        ref={pivotRef}
        toolbar={true}
        height={600}
        report="https://cdn.flexmonster.com/github/charts-report.json"
        beforetoolbarcreated={(toolbar) => {
          toolbar.showShareReportTab = true;
        }}
        reportcomplete={reportComplete}
        shareReportConnection={{
          url: "https://olap.flexmonster.com:9500",
        }}
        licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
      />
      <div className="chart-container">
        <div
          id="amcharts-container"
          style={{ width: "100%", height: "500px" }}
        ></div>
      </div>
    </>
  );
}

export default WithAmcharts4;
