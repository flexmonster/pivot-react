import React from "react";
import LogsList from "../UIElements/LogsList";
import ToggleButton from "../UIElements/ToggleButton";
import * as FlexmonsterReact from 'react-flexmonster';

export default class HandlingEvents extends React.Component {

    constructor(props) {
        super(props);

        this.props = props;

        this.logs = [];
        this.logsContainer = React.createRef();
        this.state = {
            logs: []
        }
    }

    //the list of all supported events
    eventList = [
        "afterchartdraw",
        "aftergriddraw",
        "beforegriddraw",
        "beforetoolbarcreated",
        "cellclick",
        "celldoubleclick",
        "chartclick",
        "datachanged",
        "dataerror",
        "datafilecancelled",
        "dataloaded",
        "drillthroughclose",
        "drillthroughopen",
        "exportcomplete",
        "exportstart",
        "fieldslistclose",
        "fieldslistopen",
        "filterclose",
        "filteropen",
        "loadingdata",
        "loadinglocalization",
        "loadingolapstructure",
        "loadingreportfile",
        "localizationerror",
        "localizationloaded",
        "olapstructureerror",
        "olapstructureloaded",
        "openingreportfile",
        "printcomplete",
        "printstart",
        "querycomplete",
        "queryerror",
        "ready",
        "reportchange",
        "reportcomplete",
        "reportfilecancelled",
        "reportfileerror",
        "runningquery",
        "update",
    ];

    printLog = (log) => {
        this.logs.push({
            date: new Date(),
            event: log
        });
        this.setState({
            logs: this.logs
        });
        requestAnimationFrame(() => {
            const logsContainer = document.querySelector(".event-logs-wrapper .content");
            if (logsContainer) {
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }
        });
    }

    eventsSignerController = (isSigned) => {
        isSigned ? this.signOnAllEvents() : this.signOffAllEvents();
    }

    signOffAllEvents = () => {
        for (const eventName of this.eventList) {
            // remove all handlers for specified event
            this.refs.pivot.flexmonster.off(eventName);
        }
    }

    signOnAllEvents = () => {
        for (const eventName of this.eventList) {
            // add handler for specified event
            this.refs.pivot.flexmonster.on(eventName, () => {
                this.printLog(eventName);
            });
        }
    }

    clearLogs = () => {
        this.logs.length = 0;
        this.setState({
            logs: []
        })
    }

    render() {

        return (
            <>
                <h3 className="title-one page-title">
                    Handling <a target="blank" className="title-link" href="https://www.flexmonster.com/api/events/?r=rm_react">Flexmonster events</a>
                </h3>

                <div className="description-blocks first-description-block">
                    <p>
                        Perform an action (for example, click on a grid cell) to trigger a <a className="title-link" target="blank"
                            href="https://www.flexmonster.com/api/events/?r=rm_react">Flexmonster event</a>
                        . Scroll down to the log output to see which events get triggered.
                    </p>
                </div>

                <ToggleButton triggerFunction={this.eventsSignerController} labelChecked="Events are tracked" labelUnChecked="Events are not tracked" />

                <div>
                    <FlexmonsterReact.Pivot
                        ref="pivot"
                        toolbar={true}
                        beforetoolbarcreated={toolbar => {
                            toolbar.showShareReportTab = true;
                        }}
                        shareReportConnection={{
                            url: "https://olap.flexmonster.com:9500"
                        }}
                        width="100%"
                        height={600}
                        ready={this.signOnAllEvents}
                        report="https://cdn.flexmonster.com/github/demo-report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>

                <div className="section">
                    <LogsList title="Log output" ref={this.logsContainer} logsList={this.logs} />
                    <button className="button-red" onClick={this.clearLogs}>Clear Log Output</button>
                </div>
            </>
        );
    }

}