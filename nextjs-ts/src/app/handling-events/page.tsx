"use client"
import * as React from "react";
import LogsList from "@/UIElements/LogsList";
import ToggleButton from "@/UIElements/ToggleButton";
import * as FlexmonsterReact from "react-flexmonster";

export default class HandlingEvents extends React.Component<any, {}> {

    private logs: {
        date: Date,
        event: string
    }[] = [];

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    constructor(props: any) {
        super(props);

        this.state = {
            logs: []
        }
    }

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
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

    printLog = (event: string) => {
        this.logs.push({
            date: new Date(),
            event: event
        });
        this.setState({
            logs: this.logs
        })
        requestAnimationFrame(() => {
            const logsContainer: HTMLElement | null = document.getElementById("logsContainer");
            if (logsContainer) {
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }
        });
    }

    eventsSignerController = (isSigned: boolean) => {
        isSigned ? this.signOnAllEvents() : this.signOffAllEvents();
    }

    signOffAllEvents = () => {
        for (const eventName of this.eventList) {
            // remove all handlers for specified event
            this.flexmonster.off(eventName);
        }
    }

    signOnAllEvents = () => {
        for (const eventName of this.eventList) {
            // add handler for specified event
            this.flexmonster.on(eventName, () => {
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
                <h3 className="title-one page-title">Handling Flexmonster events</h3>

                <div className="description-blocks first-description-block">
                    <p>
                        Perform an action (for example, click on a grid cell) to trigger a <a className="title-link" target="blank" rel="noopener noreferrer"
                            href="https://www.flexmonster.com/api/events/?r=rm_react">Flexmonster event</a>
                        . Scroll down to the log output to see which events get triggered.
                    </p>
                </div>

                <div className="description-blocks">
                    <ToggleButton triggerFunction={this.eventsSignerController} labelChecked="Events are tracked" labelUnChecked="Events are not tracked" />
                </div>

                <div>
                    <FlexmonsterReact.Pivot
                        ref={this.pivotRef}
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
                    <LogsList title="Log Output" logsList={this.logs} />
                    <button className="button-red" onClick={this.clearLogs}>Clear Log Output</button>
                </div>
            </>
        );
    }

}