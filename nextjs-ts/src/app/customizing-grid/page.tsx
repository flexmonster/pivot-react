// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useRef } from "react";
import ToggleButton from "@/UIElements/ToggleButton";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster Pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

export default function CustomizingGrid() {
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);

  const customizeCellFunction = (cell: Flexmonster.CellBuilder, data: Flexmonster.CellData) => {
    if (data.measure && data.measure.uniqueName === "Price") {
      let backgroundColor = "#00A45A";
      let textShadowColor = "#095231";
      let borderColor = "#009552";
      cell.style = {
        ...cell.style,
        "background-color": backgroundColor,
        "color": "white",
        "font-weight": "bold",
        "text-shadow": `0px 2px 3px ${textShadowColor}`,
        "border-bottom": `1px solid ${borderColor}`,
        "border-right": `1px solid ${borderColor}`,
      };
    }
  };

  const toggleCustomization = (isCustomized: boolean) => {
    isCustomized ? applyCustomization() : removeCustomization();
  };

  const removeCustomization = () => {
    pivotRef.current?.flexmonster.customizeCell(null as any);
  };

  const applyCustomization = () => {
    pivotRef.current?.flexmonster.customizeCell(customizeCellFunction);
  };

  return (
    <>
      <h1 className="page-title">Customizing the grid</h1>

      <div className="description-blocks first-description-block">
        <p>
          Style the grid by adding links, applying custom CSS, or formatting the cells. Check our docs for details:{" "}
          <a
            href="https://www.flexmonster.com/doc/customizing-grid/?r=rm_react"
            target="_blank"
            rel="noopener noreferrer"
            className="title-link"
          >Customizing the grid cells</a>.
        </p>
        <p>
          In this demo, the <strong>Price</strong> measure is customized.
        </p>
      </div>

      <div className="description-blocks">
        <ToggleButton
          triggerFunction={toggleCustomization}
          id="customizationToggle"
          labelChecked="The grid cells are customized"
          labelUnChecked="The grid cells are not customized"
        />
      </div>

      <FlexmonsterPivot
        ref={pivotRef}
        toolbar={true}
        height={600}
        report="https://cdn.flexmonster.com/github/customizing-grid-report.json"
        customizeCell={customizeCellFunction}
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
