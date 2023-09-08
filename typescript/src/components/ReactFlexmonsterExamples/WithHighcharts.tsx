import React, { useRef } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/lib/flexmonster.highcharts.js';
import * as Highcharts from 'highcharts';

const WithHighcharts = () => {
  const pivotRef: React.RefObject<FlexmonsterReact.Pivot> = useRef<FlexmonsterReact.Pivot>(null);

  const reportComplete = () => {
    pivotRef.current?.flexmonster.off('reportComplete', reportComplete);
    createChart();
  };

  const createChart = () => {
    console.log("create")
    pivotRef.current?.flexmonster.highcharts?.getData(
        {
          type: 'spline',
        },
        (data: any) => {
          Highcharts.chart('highcharts-container', data);
        },
        (data: any) => {
          Highcharts.chart('highcharts-container', data);
        }
      );
  };

  return (
    <div className="App">
      <h1 className="page-title">Integrating with Highcharts</h1>

      <div className="description-blocks first-description-block">
        <p>
          Integrate Flexmonster with Highcharts and see your data from a new
          perspective:{' '}
          <a
            href="https://www.flexmonster.com/doc/integration-with-highcharts/?r=rm_react"
            target="_blank"
            rel="noopener noreferrer"
            className="title-link"
          >
            Integration with Highcharts
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
        reportcomplete={reportComplete}
        report="https://cdn.flexmonster.com/github/highcharts-report.json"
        licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
      />
      <div className="chart-container">
        <div id="highcharts-container"></div>
      </div>
    </div>
  );
};

export default WithHighcharts;
