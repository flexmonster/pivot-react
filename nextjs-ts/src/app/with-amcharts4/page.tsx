// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useRef, useEffect } from "react";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster Pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

// Importing amCharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Applying the amCharts theme
am4core.useTheme(am4themes_animated);

export default function WithAmcharts4() {
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);
  const chartRef: React.RefObject<am4charts.PieChart | null> = useRef(null);

  const reportComplete = () => {
    pivotRef.current!.flexmonster.off("reportcomplete");
    drawChart();
  };

  const drawChart = () => {
    // Running Flexmonster's getData() method for amCharts
    pivotRef.current!.flexmonster.amcharts?.getData({}, createChart, updateChart);
  };

  const createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
    // Creating a chart instance
    const chart = am4core.create("chartContainer", am4charts.PieChart);

    // Adding data processed by Flexmonster to the chart
    chart.data = chartData.data;

    // Creating and configuring series for a pie chart
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = pivotRef.current?.flexmonster.amcharts?.getCategoryName(rawData);
    pieSeries.dataFields.value = pivotRef.current?.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0);
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 3;
    pieSeries.slices.template.strokeOpacity = 1;

    // Creating initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    chartRef.current = chart;
  };

  const updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
    chartRef.current?.dispose();
    createChart(chartData, rawData);
  };

  useEffect(() => {
    return () => {
      chartRef.current?.dispose();
    };
  });

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

      <FlexmonsterPivot
        ref={pivotRef}
        toolbar={true}
        height={600}
        report="https://cdn.flexmonster.com/github/charts-report.json"
        beforetoolbarcreated={(toolbar) => {
          toolbar.showShareReportTab = true;
        }}
        shareReportConnection={{
          url: "https://olap.flexmonster.com:9500",
        }}
        licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
        reportcomplete={reportComplete}
        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
      />
      <div className="chart-container">
        <div
          id="chartContainer"
          style={{ width: "100%", height: "500px" }}
        ></div>
      </div>
    </>
  );
}
