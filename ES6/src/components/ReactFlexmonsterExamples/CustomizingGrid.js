import React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import ToggleButton from '../UIElements/ToggleButton';

export default class CustomizingGrid extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeButton: "applyCustomization"        
        }
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

    customizeCellFunction = (cell, data) => {
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
    }

    controllCustomization = (isCustomized) => {
        isCustomized ? this.applyCustomization() : this.removeCustomization()
    }

    removeCustomization = () => {
        this.setState({
            activeButton: "removeCustomization"
        });
        this.refs.pivot.flexmonster.customizeCell(null);
    }

    applyCustomization = () => {
        this.setState({
            activeButton: "applyCustomization"
        });
        //running grid customization using "customizeCellFunction"
        this.refs.pivot.flexmonster.customizeCell(this.customizeCellFunction);
    }

    render() {
        return (
            <>
                <h3 className="page-title">
                    Customizing <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/api/customizecell/?r=rm_react">the grid cells</a>
                </h3>

                <ToggleButton triggerFunction={this.controllCustomization} labelChecked="The grid cells are customized" labelUnChecked="The grid cells are not customized"/>

                <FlexmonsterReact.Pivot 
                    toolbar={true}
                    ref="pivot"
                    report="https://cdn.flexmonster.com/reports/report.json"
                    customizeCell={this.customizeCellFunction}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}