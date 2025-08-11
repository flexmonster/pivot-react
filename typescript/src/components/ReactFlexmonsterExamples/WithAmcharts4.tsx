import { useEffect, useRef } from "react";
import * as FlexmonsterReact from "react-flexmonster";
import Flexmonster from "flexmonster";
import "flexmonster/lib/flexmonster.amcharts.js";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const WithAmcharts4: React.FC = () => {
  const pivotRef: React.RefObject<FlexmonsterReact.Pivot | null> = useRef<FlexmonsterReact.Pivot>(null);
  const chartRef: React.RefObject<am4charts.PieChart | null> = useRef(null);

  const reportComplete = () => {
    pivotRef.current?.flexmonster.off("reportcomplete");
    drawChart();
  };

  const drawChart = () => {
    pivotRef.current?.flexmonster.amcharts?.getData({}, createChart, updateChart);
  };

  const createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
    const chart = am4core.create("chartContainer", am4charts.PieChart);

    chart.data = chartData.data;

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = pivotRef.current?.flexmonster.amcharts?.getCategoryName(rawData);
    pieSeries.dataFields.value = pivotRef.current?.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0);
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 3;
    pieSeries.slices.template.strokeOpacity = 1;

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
          id="chartContainer"
          style={{ width: "100%", height: "500px" }}
        ></div>
      </div>
    </>
  );
};

export default WithAmcharts4;
