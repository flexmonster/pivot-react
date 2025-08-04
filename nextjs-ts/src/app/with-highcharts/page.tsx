// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useRef, useState } from "react";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

import Highcharts from "highcharts/esm/highcharts.js";
import HighchartsReact from "highcharts-react-official";
import "highcharts/esm/modules/accessibility.js";

export default function WithHighcharts() {
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  const reportComplete = () => {
    pivotRef.current!.flexmonster.off("reportComplete");
    createChart();
  };

  const createChart = () => {
    pivotRef.current!.flexmonster.highcharts?.getData(
      {
        type: "spline",
      },
      (data: Flexmonster.GetDataValueObject) => {
        setChartOptions(data as Highcharts.Options);
      },
      (data: Flexmonster.GetDataValueObject) => {
        setChartOptions(data as Highcharts.Options);
      }
    );
  };

  return (
    <>
      <h1 className="page-title">Integrating with Highcharts</h1>

      <div className="description-blocks first-description-block">
        <p>
          Integrate Flexmonster with Highcharts and see your data from a new perspective:{" "}
          <a
            href="https://www.flexmonster.com/doc/integration-with-highcharts/?r=rm_react"
            target="_blank"
            rel="noopener noreferrer"
            className="title-link"
          >Integration with Highcharts</a>.
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
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </>
  );
}
