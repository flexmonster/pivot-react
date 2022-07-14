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
                <h1 className="page-title">Customizing the grid</h1>

                <div className="description-blocks first-description-block">
                    <p>Style the grid by adding links, applying custom CSS, or formatting the cells. 
                        Check our docs for details: <a href="https://www.flexmonster.com/doc/customizing-grid/?r=rm_react" target="_blank" className="title-link">Customizing the grid</a>.
                    </p>
                    <p>In this demo, the <strong>Price</strong> measure is customized.</p>
                </div>

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
                    report="https://cdn.flexmonster.com/github/customizing-grid-report.json"
                    customizeCell={this.customizeCellFunction}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}