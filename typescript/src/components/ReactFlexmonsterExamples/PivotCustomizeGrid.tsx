import * as React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/flexmonster.css';
//You can use a different theme by specifying the corresponding path
//For example, to load the Green theme:
//import 'flexmonster/theme/green/flexmonster.css';

export default class PivotCustomizeGrid extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    private activeButton: String = "applyCustomization";

    constructor(props: any) {
        super(props);

        this.state = {
            activeButton: "applyCustomization"
        }
    }

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    report = {
        dataSource: {
            filename: 'https://cdn.flexmonster.com/data/data.csv'
        },
        slice: {
            rows: [{
                uniqueName: 'Category'
            }, {
                uniqueName: '[Measures]'
            }],
            columns: [{
                uniqueName: 'Color'
            }],
            measures: [{
                uniqueName: 'Price',
                aggregation: 'sum'
            }, {
                uniqueName: 'Discount',
                aggregation: 'sum'
            }, {
                uniqueName: 'Quantity',
                aggregation: 'sum'
            }]
        }
    };

    customizeCellFunction = (cell: Flexmonster.CellBuilder, data: Flexmonster.CellData) => {
        if (data.measure && data.measure.uniqueName === "Price") {
            let backgroundColor = "#00A45A";
            let textShadowColor = "#095231";
            let borderColor = "#009552";
            const style: any = cell.style || {};
            style["background-color"] = backgroundColor;
            style["color"] = "white";
            style["font-weight"] = "bold";
            style["text-shadow"] = `0px 2px 3px ${textShadowColor}`;
            style["border-bottom"] = `1px solid ${borderColor}`;
            style["border-right"] = `1px solid ${borderColor}`;
            cell.style = style;
        }
    }

    removeCustomization = () => {
        this.activeButton = "removeCustomization";
        this.setState({
            activeButton: this.activeButton
        });
        this.flexmonster.customizeCell(null as any);
    }

    applyCustomization = () => {
        this.activeButton = "applyCustomization";
        this.setState({
            activeButton: this.activeButton
        });
        //running grid customization using "customizeCellFunction"
        this.flexmonster.customizeCell(this.customizeCellFunction);
    }

    render() {
        return (
            <>
                <h3 className="page-title">
                    How to <a target="_blank" rel="noopener noreferrer" href="https://www.flexmonster.com/api/customizecell/">customize the grid cells</a>&nbsp;example
                </h3>

                <button className={`toggle-button-red ${(this.activeButton === "removeCustomization") ? "button-red-active" : ""}`} onClick={this.removeCustomization}>Remove Customization</button>
                <button className={`toggle-button-red ${(this.activeButton === "applyCustomization") ? "button-red-active" : ""}`} onClick={this.applyCustomization}>Apply Customization</button>


                <FlexmonsterReact.Pivot toolbar={true}
                    ref={this.pivotRef}
                    report="https://cdn.flexmonster.com/reports/report.json"
                    customizeCell={this.customizeCellFunction}
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}