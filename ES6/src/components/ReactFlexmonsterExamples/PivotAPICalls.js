import React, {Component} from 'react';
import ToggleSwitch from '../UIElements/ToggleSwitch';
import * as FlexmonsterReact from 'react-flexmonster';

class PivotApiCalls extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            activeButton: ""
        }
    }

    showChart = () => {
        this.setState({
            activeButton: "showChart"
        });
        this.refs.pivot.flexmonster.showCharts("pie");
    }
    
    showGrid = () => {
        this.setState({
            activeButton: "showGrid"
        });
        this.refs.pivot.flexmonster.showGrid();
    }

    controllGridCharts = (isGrid) => {
        isGrid ? this.showGrid() : this.showChart();
    }

    controllInteractiveness = (isInteractive) => {
        isInteractive ? this.interactive() : this.readOnly()
    }

    readOnly = () => {
        this.setState({
            activeButton: "readOnly"
        });
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
        this.hideContextMenu();
        //we need to run refresh to apply new options changes
        this.refs.pivot.flexmonster.refresh();
    }

    interactive = () => {
        this.setState({
            activeButton: "interactive"
        });
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
        this.showContextMenu();
        //we need to run refresh to apply new options changes
        this.refs.pivot.flexmonster.refresh();
    }

    hideContextMenu = () => {
        this.refs.pivot.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    showContextMenu = () => {
        this.refs.pivot.flexmonster.customizeContextMenu(null);
    }

    render(){
        return (
            <>
                <h3 className="page-title">
                    How to access <a target="blank" className="title-link" href="https://www.flexmonster.com/api/methods/">Flexmonster API calls</a> example
                </h3>

                <ToggleSwitch triggerFunction={this.controllGridCharts} labelChecked="Show grid" labelUnChecked="Show Pie chart"/>
                <ToggleSwitch triggerFunction={this.controllInteractiveness} labelChecked="Make interactive" labelUnChecked="Make read-only"/>
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
