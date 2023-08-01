import React, { useEffect, useRef } from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster/lib/flexmonster.highcharts.js';
import Highcharts from 'highcharts';

function WithHighcharts() {
    const pivotRef = useRef(null);

    useEffect(() => {
        if(pivotRef.current) {
            pivotRef.current.flexmonster.on('reportcomplete', reportComplete);
        }
        // Clean up the event listener when the component is unmounted
        return () => {
            if(pivotRef.current) {
                pivotRef.current.flexmonster.off('reportcomplete', reportComplete);
            }
        };
    }, []);

    const reportComplete = () => {
        createChart();
    };

    const createChart = () => {
        pivotRef.current.flexmonster.highcharts.getData(
            {
                type: 'spline',
            },
            function (data) {
                Highcharts.chart('highcharts-container', data);
            },
            function (data) {
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
                    perspective: <a
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
                report="https://cdn.flexmonster.com/github/highcharts-report.json"
                licenseFilePath="https://cdn.flexmonster.com/jsfiddle.charts.key"
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
            <div className="chart-container">
                <div id="highcharts-container"></div>
            </div>
        </div>
    );
};

export default WithHighcharts;
