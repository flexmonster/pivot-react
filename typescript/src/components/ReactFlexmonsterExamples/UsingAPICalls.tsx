import * as React from 'react';
import ToggleSwitch from '../UIElements/ToggleSwitch';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';

class UsingAPICalls extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    private activeButton: String = "";

    constructor(props: any) {
        super(props);

        this.state = {
            activeButton: ""
        }
    }

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    controllGridCharts = (isGrid: boolean) => {
        isGrid ? this.showGrid() : this.showChart();
    }

    controllInteractiveness = (isInteractive: boolean) => {
        isInteractive ? this.interactive() : this.readOnly()
    }

    showChart = () => {
        this.activeButton = "showChart";
        this.setState({
            activeButton: this.activeButton
        });
        this.flexmonster.showCharts("column");
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
                showMeasures: false
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
                showMeasures: true
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

    render() {
        return (
            <>
                <h3 className="page-title">
                    How to access <a target="blank" className="title-link" href="https://www.flexmonster.com/api/methods/">Flexmonster API calls</a> example
                </h3>

                <ToggleSwitch triggerFunction={this.controllGridCharts} labelChecked="Show grid" labelUnChecked="Show Column chart"/>
                <ToggleSwitch triggerFunction={this.controllInteractiveness} labelChecked="Make interactive" labelUnChecked="Make read-only"/>
                
                <FlexmonsterReact.Pivot toolbar={true}
                    ref={this.pivotRef}
                    componentFolder="https://cdn.flexmonster.com/"
                    width="100%"
                    report={{
                        dataSource: {
                            filename: 'https://cdn.flexmonster.com/data/data.json'
                        }
                    }}
                //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }

}

export default UsingAPICalls;
