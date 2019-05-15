import React, {Component} from 'react';

import * as FlexmonsterReact from 'react-flexmonster';

class APICallsAndEvents extends Component {

    constructor(props){
        super(props);
        this.state = {
            report: {}
        };
    }

    getReport(){
        setTimeout(() => {
            let myReport = this.refs.pivot.flexmonster.getReport();
            this.setState({
                report: myReport
            });
            console.log(this.state.report);
        }, 1000)
    }

    componentDidMount(){
        this.getReport();
    }

    onFlexmonsterReady = () => {
        console.log("Ready");
    };

    onReportComplete = () => {
        console.log("[reportcomplete]");
        console.log(this.refs.pivot.flexmonster.getReport());
    };

    onReportChange = () => {
        console.log("[reportchange]");
        this.refs.pivot.flexmonster.save();
    };

    onUpdate = () => {
        console.log("[update]");
    };

    onCellClick = (cell) => {
        console.log("[cellclick]", cell);
    };

    onCellDoubleClick = (cell) => {
        console.log("[celldoubleclick]", cell);
    };

    onFilterOpen = (params) => {
        console.log("[filteropen]", params);
    };

    onFieldsListOpen = () => {
        console.log("[fieldslistopen]");
    };

    onFieldsListClose = () => {
        console.log("[fieldslistclose]");
    };

    render(){
        return (
            <FlexmonsterReact.Pivot toolbar={true}
                                    ref="pivot"
                                    componentFolder="https://cdn.flexmonster.com/"
                                    width="100%"
                                    report="https://cdn.flexmonster.com/reports/report.json"
                                    ready={this.onFlexmonsterReady}
                                    reportcomplete={this.onReportComplete}
                                    reportchange={this.onReportChange}
                                    update={this.onUpdate}
                                    cellclick={this.onCellClick}
                                    celldoubleclick={this.onCellDoubleClick}
                                    filteropen={this.onFilterOpen}
                                    fieldslistopen={this.onFieldsListOpen}
                                    fieldslistclose={this.onFieldsListClose}
            />
        );
    }

}

export default APICallsAndEvents;
