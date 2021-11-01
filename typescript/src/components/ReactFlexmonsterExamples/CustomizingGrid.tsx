import * as React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import ToggleButton from '../UIElements/ToggleButton';
import 'flexmonster';

export default class CustomizingGrid extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    report = {
        dataSource: {
            filename: 'https://cdn.flexmonster.com/data/data.csv'
        },
        slice: {
            rows: [
                {
                    uniqueName: "Category",
                },
                {
                    uniqueName: "[Measures]",
                },
            ],
            columns: [
                {
                    uniqueName: "Color",
                },
            ],
            measures: [
                {
                    uniqueName: "Price",
                    aggregation: "sum",
                },
                {
                    uniqueName: "Discount",
                    aggregation: "sum",
                },
                {
                    uniqueName: "Quantity",
                    aggregation: "sum",
                },
            ]
        }
    };

    customizeCellFunction = (cell: Flexmonster.CellBuilder, data: Flexmonster.CellData) => {
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

    controllCustomization = (isCustomized: boolean) => {
        isCustomized ? this.applyCustomization() : this.removeCustomization()
    }

    removeCustomization = () => {
        this.flexmonster.customizeCell((null as any));
    }

    applyCustomization = () => {
        //running grid customization using "customizeCellFunction"
        this.flexmonster.customizeCell(this.customizeCellFunction);
    }

    render() {
        return (
            <>
                <h3 className="page-title">
                    Customizing <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/api/customizecell/?r=rm_react">the grid cells</a>
                </h3>

                <ToggleButton triggerFunction={this.controllCustomization} labelChecked="The grid cells are customized" labelUnChecked="The grid cells are not customized" />

                <FlexmonsterReact.Pivot
                    ref={this.pivotRef}
                    toolbar={true}
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    width="100%"
                    height={600}
                    report={this.report}
                    customizeCell={this.customizeCellFunction}
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}