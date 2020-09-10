import React, {Component} from 'react';

import * as FlexmonsterReact from 'react-flexmonster';

class PivotApiCalls extends Component {

    constructor(props){
        super(props);

        this.props = props;
    }

    showChart = () => {
        this.refs.pivot.flexmonster.showCharts("pie");
    }
    
    showGrid = () => {
        this.refs.pivot.flexmonster.showGrid();
    }

    readOnly = () => {
        //hiding filters, sorting and fieldList buttons, disabling dragging, disabling drill-through
        this.refs.pivot.flexmonster.setOptions({
            grid: {
                showFilter: false,
                dragging: false,
            },
            chart: {
                showFilter: false,
            },
            configuratorButton: false,
            sorting: "off",
            drillThrough: false,
        });
        //disabling context menu
        this.showContextMenu();
        //we need to run refresh to apply new options changes
        this.refs.pivot.flexmonster.refresh();
    }

    interactive = () => {
        //displaying filters, sorting and fieldList buttons, enabling dragging, enabling drill-through
        this.refs.pivot.flexmonster.setOptions({
            grid: {
                showFilter: true,
                dragging: true,
            },
            chart: {
                showFilter: true,
            },
            configuratorButton: true,
            sorting: "on",
            drillThrough: true,
        });
        //enabling context menu
        this.hideContextMenu();
        //we need to run refresh to apply new options changes
        this.refs.pivot.flexmonster.refresh();
    }

    showContextMenu = () => {
        this.refs.pivot.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    hideContextMenu = () => {
        this.refs.pivot.flexmonster.customizeContextMenu(null);
    }

    render(){
        return (
            <>
                <h3 className="page-title">
                    How to access <a target="blank" href="https://www.flexmonster.com/api/methods/">Flexmonster API calls</a> example
                </h3>

                <button className="toggle-button-red" onClick={this.showChart}>Show Pie Chart</button>
                <button className="toggle-button-red" onClick={this.showGrid}>Show Grid</button>
                <button className="toggle-button-red" onClick={this.readOnly}>Make read only</button>
                <button className="toggle-button-red" onClick={this.interactive}>Make interactive</button>
                <FlexmonsterReact.Pivot 
                    toolbar={true}
                    ref="pivot"
                    componentFolder="https://cdn.flexmonster.com/"
                    width="100%"
                    report="https://cdn.flexmonster.com/reports/report.json"
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }

}

export default PivotApiCalls;
