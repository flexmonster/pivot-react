import React from "react";
import * as FlexmonsterReact from 'react-flexmonster';

export default class PivotCustomizeGrid extends React.Component {

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
                    How to <a target="_blank" rel="noopener noreferrer" href="https://www.flexmonster.com/api/customizecell/">customize the grid cells</a>&nbsp;example
                </h3>

                <button className={`toggle-button-red ${(this.state.activeButton === "removeCustomization")?"button-red-active":""}`} onClick={this.removeCustomization}>Remove Customization</button>
                <button className={`toggle-button-red ${(this.state.activeButton === "applyCustomization")?"button-red-active":""}`} onClick={this.applyCustomization}>Apply Customization</button>

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