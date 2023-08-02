import React, { useRef } from "react";
import * as FlexmonsterReact from "react-flexmonster";
import ToggleButton from "../UIElements/ToggleButton";

function CustomizingGrid() {
    const pivotRef = useRef(null);

    const customizeCellFunction = (cell, data) => {
        if (data.measure && data.measure.uniqueName === "Price") {
            let backgroundColor = "#00A45A";
            let textShadowColor = "#095231";
            let borderColor = "#009552";
            cell.style["background-color"] = backgroundColor;
            cell.style["color"] = "white";
            cell.style["font-weight"] = "bold";
            cell.style["text-shadow"] = `0px 2px 3px ${textShadowColor}`;
            cell.style["border-bottom"] = `1px solid ${borderColor}`;
            cell.style["border-right"] = `1px solid ${borderColor}`;
        }
    };

    const controllCustomization = (isCustomized) => {
        isCustomized ? applyCustomization() : removeCustomization();
    };

    const removeCustomization = () => {
        pivotRef.current.flexmonster.customizeCell(null);
    };

    const applyCustomization = () => {
        //running grid customization using "customizeCellFunction"
        pivotRef.current.flexmonster.customizeCell(customizeCellFunction);
    };

    return (
        <>
            <h1 className="page-title">Customizing the grid</h1>

            <div className="description-blocks first-description-block">
                <p>
                    Style the grid by adding links, applying custom CSS, or formatting the
                    cells. Check our docs for details:{" "}
                    <a
                        href="https://www.flexmonster.com/doc/customizing-grid/?r=rm_react"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="title-link"
                    >
                        Customizing the grid
                    </a>
                    .
                </p>
                <p>
                    In this demo, the <strong>Price</strong> measure is customized.
                </p>
            </div>

            <div className="description-blocks">
                <ToggleButton
                    triggerFunction={controllCustomization}
                    id="customizationToggle"
                    labelChecked="The grid cells are customized"
                    labelUnChecked="The grid cells are not customized"
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
                width="100%"
                height={600}
                report="https://cdn.flexmonster.com/github/customizing-grid-report.json"
                customizeCell={customizeCellFunction}
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
        </>
    );
}

export default CustomizingGrid;
