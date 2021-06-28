import React, { Component } from 'react';
import ToggleSwitch from '../UIElements/ToggleSwitch';
import * as FlexmonsterReact from 'react-flexmonster';

class UsingAPICalls extends Component {

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
        this.refs.pivot.flexmonster.showCharts("column");
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
        this.refs.pivot.flexmonster.setOptions({
            readOnly: true
        })
        //refresh to apply new options changes
        this.refs.pivot.flexmonster.refresh();
    }

    interactive = () => {
        this.setState({
            activeButton: "interactive"
        });
        this.refs.pivot.flexmonster.setOptions({
            readOnly: false
        })
        //refresh to apply new options changes
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

    render() {
        return (
            <>
                <h3 className="page-title">
                    Using <a target="blank" className="title-link" href="https://www.flexmonster.com/api/methods/?r=rm_react">Flexmonster API calls</a>
                </h3>

                <ToggleSwitch triggerFunction={this.controllGridCharts} labelChecked="Show grid" labelUnChecked="Show Column chart" />
                <ToggleSwitch triggerFunction={this.controllInteractiveness} labelChecked="Make interactive" labelUnChecked="Make read-only" />
                <FlexmonsterReact.Pivot
                    toolbar={true}
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    ref="pivot"
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
