import * as React from 'react';

import * as FlexmonsterReact from 'react-flexmonster';

class PivotApiCalls extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster: Flexmonster.Pivot;

    private activeButton : String = "";

    constructor(props: any) {
        super(props);

        this.state = {
            activeButton: "" 
        }
    }

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    showChart = () => {
        this.activeButton = "showChart";
        this.setState({
            activeButton: this.activeButton
        });
        this.flexmonster.showCharts("pie");
    }
    
    showGrid = () => {
        this.activeButton = "showGrid";
        this.setState({
            activeButton: this.activeButton
        });
        this.flexmonster.showGrid();
    }

    readOnly = () => {
        this.activeButton = "readOnly";
        this.setState({
            activeButton: this.activeButton
        });
        //hiding filters, sorting and fieldList buttons, disabling dragging, disabling drill-through
        this.flexmonster.setOptions({
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
        this.flexmonster.refresh();
    }

    interactive = () => {
        this.activeButton = "interactive";
        this.setState({
            activeButton: this.activeButton
        });
        //displaying filters, sorting and fieldList buttons, enabling dragging, enabling drill-through
        this.flexmonster.setOptions({
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
        this.flexmonster.refresh();
    }

    hideContextMenu = () => {
        this.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    showContextMenu = () => {
        this.flexmonster.customizeContextMenu(null as any);
    }

    render(){
        return (
            <>
                <h3 className="page-title">
                    How to access <a target="blank" href="https://www.flexmonster.com/api/methods/">Flexmonster API calls</a> example
                </h3>

                <button className={`toggle-button-red ${(this.activeButton === "showChart")?"button-red-active":""}`} onClick={this.showChart}>Show Pie Chart</button>
                <button className={`toggle-button-red ${(this.activeButton === "showGrid")?"button-red-active":""}`} onClick={this.showGrid}>Show Grid</button>
                <button className={`toggle-button-red ${(this.activeButton === "readOnly")?"button-red-active":""}`} onClick={this.readOnly}>Make read only</button>
                <button className={`toggle-button-red ${(this.activeButton === "interactive")?"button-red-active":""}`} onClick={this.interactive}>Make interactive</button>
                
                <FlexmonsterReact.Pivot toolbar={true}
                    ref={this.pivotRef}
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
