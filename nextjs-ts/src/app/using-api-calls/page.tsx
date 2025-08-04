// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useRef } from "react";
import ToggleSwitch from "@/UIElements/ToggleSwitch";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster Pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

export default function UsingAPICalls() {
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);

  const switchGridCharts = (isGrid: boolean) => {
    isGrid ? showGrid() : showChart();
  };

  const toggleInteractiveness = (isInteractive: boolean) => {
    isInteractive ? interactive() : readOnly();
  };

  const showChart = () => {
    pivotRef.current?.flexmonster.showCharts("column");
  };

  const showGrid = () => {
    pivotRef.current?.flexmonster.showGrid();
  };

  const readOnly = () => {
    pivotRef.current?.flexmonster.setOptions({
      readOnly: true,
    });
    pivotRef.current?.flexmonster.refresh();
  };

  const interactive = () => {
    pivotRef.current?.flexmonster.setOptions({
      readOnly: false,
    });
    pivotRef.current?.flexmonster.refresh();
  };

  return (
    <>
      <h1 className="page-title">Using Flexmonster API calls</h1>

      <div className="description-blocks first-description-block">
        <p>
          Flexmonster provides{" "}
          <a
            href="https://www.flexmonster.com/api/methods/?r=rm_react"
            target="_blank"
            rel="noopener noreferrer"
            className="title-link"
          >API calls</a> for interacting with the component. As an example, we've added the toggle buttons below. Use them to switch between the views or make
          Flexmonster read-only.
        </p>
      </div>

      <div className="description-blocks">
        <ToggleSwitch
          id="viewToggle"
          triggerFunction={switchGridCharts}
          labelChecked="Grid"
          labelUnChecked="Column chart"
        />
        <ToggleSwitch
          id="modeToggle"
          triggerFunction={toggleInteractiveness}
          labelChecked="Interactive"
          labelUnChecked="Read-only"
        />
      </div>

      <FlexmonsterPivot
        ref={pivotRef}
        toolbar={true}
        height={600}
        report="https://cdn.flexmonster.com/github/demo-report.json"
        beforetoolbarcreated={(toolbar) => {
          toolbar.showShareReportTab = true;
        }}
        shareReportConnection={{
          url: "https://olap.flexmonster.com:9500",
        }}
        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
      />
    </>
  );
}
