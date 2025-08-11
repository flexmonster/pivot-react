// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useEffect, useRef } from "react";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster Pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

// Importing amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function WithAmcharts() {
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);
  let root!: am5.Root;

  const reportComplete = () => {
    pivotRef.current!.flexmonster.off("reportcomplete");
    drawChart();
  };

  const drawChart = () => {
    // Running Flexmonster's getData() method for amCharts
    pivotRef.current!.flexmonster.amcharts?.getData({}, createChart, updateChart);
  };

  const createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
    // Initializing the root element
    root = am5.Root.new("amcharts-container");
    // Applying the amCharts theme
    root.setThemes([am5themes_Animated.new(root)]);
    // Applying number format from Flexmonster
    root.numberFormatter.set("numberFormat", pivotRef.current?.flexmonster.amcharts?.getNumberFormatPattern((rawData.meta as any).formats[0]));

    // Creating a chart instance
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: 100,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: pivotRef.current?.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
        categoryField: pivotRef.current?.flexmonster.amcharts?.getCategoryName(rawData),
      })
    );

    series.children.push(
      am5.Label.new(root, {
        text: "[#999]TOTAL:[/]\n{valueSum.formatNumber()}",
        populateText: true,
        textAlign: "center",
        centerX: am5.p50,
        centerY: am5.p50,
        fontSize: 24,
        fontWeight: "500",
        fill: am5.color(0x555555),
        oversizedBehavior: "fit",
      })
    );

    series.slices.template.set("tooltipText", "{category}: {value} ({valuePercentTotal.formatNumber('0.00')}%)");
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    series.data.setAll(chartData.data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        layout: am5.GridLayout.new(root, {
          maxColumns: 3,
          fixedWidthGrid: true,
        }),
        height: am5.percent(20),
        verticalScrollbar: am5.Scrollbar.new(root, {
          orientation: "vertical",
        }),
      })
    );
    legend.data.setAll(series.dataItems);
    legend.valueLabels.template.set("forceHidden", true);

    series.appear(1000);
    chart.appear(1000, 100);
  };

  const updateChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
    root?.dispose();
    createChart(chartData, rawData);
  };

  useEffect(() => {
    return () => {
      // Disposing of the chart instance when the component is unmounted
      root?.dispose();
    };
  });

  return (
    <>
      <h1 className="page-title">Integrating with amCharts</h1>

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
          id="amcharts-container"
          style={{ width: "100%", height: "600px" }}
        ></div>
      </div>
    </>
  );
}
