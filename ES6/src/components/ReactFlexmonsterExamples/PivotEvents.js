import React from "react";
import LogsList from "../UIElements/logsList/LogsList";
import * as FlexmonsterReact from 'react-flexmonster';

export default class PivotEvents extends React.Component {

    constructor(props) {
        super(props);

        this.props = props;

        this.logs = [];
        this.logsContainer = React.createRef();
        this.state = {
            logs: [],
            activeButton: "signOnAllEvents"        
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
            const logsContainer = this.logsContainer.current._reactInternalFiber.child.stateNode;
            if (logsContainer) {
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }
        });
    }

    signOffAllEvents = () => {
        this.setState({
            activeButton: "signOffAllEvents"
        });
        for (const eventName of this.eventList) {
            // remove all handlers for specified event
            this.refs.pivot.flexmonster.off(eventName);
        }
    }

    signOnAllEvents = () => {
        this.setState({
            activeButton: "signOnAllEvents"
        });
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
                <h3 className="page-title">
                    How to call <a target="blank" href="https://www.flexmonster.com/api/events/">Flexmonster events</a> example
                </h3>

                <div className="description-blocks first-description-block">
                    <p>
                        Perform an action (for example, click on a grid cell) to trigger a 
                        <a target="blank" href="https://www.flexmonster.com/api/events/"> Flexmonster event</a>.
                        Scroll down to the log output to see which events get triggered.
                    </p>
                </div>

                <button className={`toggle-button-red ${(this.state.activeButton === "signOffAllEvents")?"button-red-active":""}`} onClick={this.signOffAllEvents}>Sign off all events</button>
                <button className={`toggle-button-red ${(this.state.activeButton === "signOnAllEvents")?"button-red-active":""}`} onClick={this.signOnAllEvents}>Sign on all events</button>

                <div>
                    <FlexmonsterReact.Pivot 
                        toolbar={true}
                        ref="pivot"
                        width="100%"
                        ready={this.signOnAllEvents}
                        report="https://cdn.flexmonster.com/reports/report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>

                <div className="description-blocks first-description-block">
                    <button className="button-red" onClick={this.clearLogs}>Clear Log Output</button>
                    <LogsList ref={this.logsContainer} logsList={this.logs}/>
                </div>
            </>
        );
    }

}