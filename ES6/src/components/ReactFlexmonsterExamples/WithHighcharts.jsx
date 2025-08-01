import { useRef, useState } from "react";
import * as FlexmonsterReact from "react-flexmonster";
import "flexmonster/lib/flexmonster.highcharts.js";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/accessibility";

function WithHighcharts() {
  const pivotRef = useRef(null);
  const [chartOptions, setChartOptions] = useState({});

  const reportComplete = () => {
    pivotRef.current.flexmonster.off("reportcomplete");
    createChart();
  };

  const createChart = () => {
    pivotRef.current.flexmonster.highcharts.getData(
      {
        type: "spline",
      },
      function (data) {
        setChartOptions(data);
      },
      function (data) {
        setChartOptions(data);
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
        report="https://cdn.flexmonster.com/github/charts-report.json"
        beforetoolbarcreated={(toolbar) => {
          toolbar.showShareReportTab = true;
        }}
        reportcomplete={reportComplete}
        shareReportConnection={{
          url: "https://olap.flexmonster.com:9500",
        }}
        licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
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

export default WithHighcharts;
