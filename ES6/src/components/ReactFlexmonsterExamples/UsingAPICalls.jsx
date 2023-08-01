import React, { useRef } from 'react';
import ToggleSwitch from '../UIElements/ToggleSwitch';
import * as FlexmonsterReact from 'react-flexmonster';

function UsingAPICalls() {
    const pivotRef = useRef(null);

    const showChart = () => {
        pivotRef.current.flexmonster.showCharts("column");
    };

    const showGrid = () => {
        pivotRef.current.flexmonster.showGrid();
    };

    const controllGridCharts = (isGrid) => {
        isGrid ? showGrid() : showChart();
    };

    const controllInteractiveness = (isInteractive) => {
        isInteractive ? interactive() : readOnly();
    };

    const readOnly = () => {
        pivotRef.current.flexmonster.setOptions({
            readOnly: true,
        });
        pivotRef.current.flexmonster.refresh();
    };

    const interactive = () => {
        pivotRef.current.flexmonster.setOptions({
            readOnly: false,
        });
        pivotRef.current.flexmonster.refresh();
    };

    const hideContextMenu = () => {
        pivotRef.current.flexmonster.customizeContextMenu(() => {
            return [];
        });
    };

    const showContextMenu = () => {
        pivotRef.current.flexmonster.customizeContextMenu(null);
    };

    return (
        <>
            <h1 className="page-title">Using Flexmonster API calls</h1>

            <div className="description-blocks first-description-block">
                <p>
                    Flexmonster provides <a href="https://www.flexmonster.com/api/methods/?r=rm_react"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="title-link"
                    >
                        API calls
                    </a> for interacting with the component. As an example, we've added the
                    toggle buttons below. Use them to switch between the views or make
                    Flexmonster read-only.
                </p>
            </div>

            <div className="description-blocks">
                <ToggleSwitch
                    id="viewToggle"
                    triggerFunction={controllGridCharts}
                    labelChecked="Grid"
                    labelUnChecked="Column chart"
                />
                <ToggleSwitch
                    id="modeToggle"
                    triggerFunction={controllInteractiveness}
                    labelChecked="Interactive"
                    labelUnChecked="Read-only"
                />
            </div>

            <FlexmonsterReact.Pivot
                ref={pivotRef}
                toolbar={true}
                beforetoolbarcreated={(toolbar) => {
                    toolbar.showShareReportTab = true;
                }}
                shareReportConnection={{
                    url: "https://olap.flexmonster.com:9500",
                }}
                componentFolder="https://cdn.flexmonster.com/"
                width="100%"
                height={600}
                report="https://cdn.flexmonster.com/github/demo-report.json"
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
        </>
    );
};

export default UsingAPICalls;

