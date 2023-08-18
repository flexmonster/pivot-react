import * as React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import ToggleButton from '../UIElements/ToggleButton';
import 'flexmonster';

const CustomizingGrid: React.FC = () => {
    const pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.useRef<FlexmonsterReact.Pivot>(null);
    const [isCustomized, setIsCustomized] = React.useState<boolean>(true);

    React.useEffect(() => {
        const flexmonster = pivotRef.current?.flexmonster;
        if (flexmonster) {
            customizeGridCells(flexmonster);
        }
    }, [isCustomized]);

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
    }

    const customizeGridCells = (flexmonster: Flexmonster.Pivot) => {
        if (isCustomized) {
            flexmonster.customizeCell(customizeCellFunction);
        } else {
            flexmonster.customizeCell(null as any);
        }
    };

    const toggleCustomization = (isChecked: boolean) => {
        setIsCustomized(isChecked);
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
                    triggerFunction={toggleCustomization}
                    id="customizationToggle"
                    labelChecked="The grid cells are customized"
                    labelUnChecked="The grid cells are not customized"
                />
            </div>

            <FlexmonsterReact.Pivot
                ref={pivotRef}
                toolbar={true}
                customizeCell={customizeCellFunction}
                beforetoolbarcreated={toolbar => {
                    toolbar.showShareReportTab = true;
                }}
                shareReportConnection={{
                    url: "https://olap.flexmonster.com:9500"
                }}
                width="100%"
                height={600}
                report="https://cdn.flexmonster.com/github/customizing-grid-report.json"
            //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
        </>
    );
};

export default CustomizingGrid;
