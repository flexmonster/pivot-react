import * as React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import ToggleButton from '../UIElements/ToggleButton';
import 'flexmonster';

export default class CustomizingGrid extends React.Component<any, {}> {

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

    controllCustomization = (isCustomized: boolean) => {
        isCustomized ? this.applyCustomization() : this.removeCustomization()
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
                    Customizing <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/api/customizecell/">the grid cells</a>
                </h3>

                <ToggleButton triggerFunction={this.controllCustomization} labelChecked="The grid cells are customized" labelUnChecked="The grid cells are not customized"/>

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