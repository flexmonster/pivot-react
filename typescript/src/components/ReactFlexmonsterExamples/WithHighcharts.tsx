import { useRef, useState } from "react";
import * as FlexmonsterReact from "react-flexmonster";
import Flexmonster from "flexmonster";
import "flexmonster/lib/flexmonster.highcharts.js";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/accessibility";

const WithHighcharts = () => {
  const pivotRef: React.RefObject<FlexmonsterReact.Pivot | null> = useRef<FlexmonsterReact.Pivot>(null);
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

  const reportComplete = () => {
    pivotRef.current?.flexmonster.off("reportcomplete");
    createChart();
  };

  const createChart = () => {
    pivotRef.current?.flexmonster.highcharts?.getData(
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

      <FlexmonsterReact.Pivot
        ref={pivotRef}
        toolbar={true}
        height={600}
        reportcomplete={reportComplete}
        report="https://cdn.flexmonster.com/github/charts-report.json"
        beforetoolbarcreated={(toolbar) => {
          toolbar.showShareReportTab = true;
        }}
        shareReportConnection={{
          url: "https://olap.flexmonster.com:9500",
        }}
        licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
      />
      <div className="chart-container">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </>
  );
};

export default WithHighcharts;
