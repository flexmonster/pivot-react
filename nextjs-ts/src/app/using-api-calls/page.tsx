// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
import ToggleSwitch from '@/UIElements/ToggleSwitch';
// Types are static, so we can safely import it for use in references
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const PivotWrap = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
});

export default function UsingAPICalls() {

    const pivotRef: React.RefObject<Pivot | null> = React.useRef<Pivot>(null);

    const controllGridCharts = (isGrid: boolean) => {
        isGrid ? showGrid() : showChart();
    }

    const controllInteractiveness = (isInteractive: boolean) => {
        isInteractive ? interactive() : readOnly()
    }

    const showChart = () => {
        pivotRef.current?.flexmonster.showCharts("column");
    }

    const showGrid = () => {
        pivotRef.current?.flexmonster.showGrid();
    }

    const readOnly = () => {
        pivotRef.current?.flexmonster.setOptions({
            readOnly: true
        });
        pivotRef.current?.flexmonster.refresh();
    }

    const interactive = () => {
        pivotRef.current?.flexmonster.setOptions({
            readOnly: false
        });
        pivotRef.current?.flexmonster.refresh();
    }

    const hideContextMenu = () => {
        pivotRef.current?.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    const showContextMenu = () => {
        pivotRef.current?.flexmonster.customizeContextMenu(null as any);
    }

        return (
            <>
                <h1 className="page-title">Using Flexmonster API calls</h1>

                <div className="description-blocks first-description-block">
                    <p>
                        Flexmonster provides <a href="https://www.flexmonster.com/api/methods/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">API calls</a> for
                        interacting with the component.
                        As an example, we've added the toggle buttons below. Use them to switch between the views or make Flexmonster read-only.
                    </p>
                </div>

                <div className="description-blocks">
                    <ToggleSwitch id="viewToggle" triggerFunction={controllGridCharts} labelChecked="Grid" labelUnChecked="Column chart" />
                    <ToggleSwitch id="modeToggle" triggerFunction={controllInteractiveness} labelChecked="Interactive" labelUnChecked="Read-only" />
                </div>

                <PivotWrap
                    ref={pivotRef}
                    toolbar={true}
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    width="100%"
                    height={600}
                    componentFolder="https://cdn.flexmonster.com/"
                    report="https://cdn.flexmonster.com/github/demo-report.json"
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    

}