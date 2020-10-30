import * as React from "react";
import LogsList from "../UIElements/LogsList";
import * as FlexmonsterReact from 'react-flexmonster';
import ToggleButton from "../UIElements/ToggleButton";
import 'flexmonster';

export default class CallingEvents extends React.Component<any, {}> {

    private logs: {
        date: Date,
        event: string
    }[] = [];

    private activeButton : String = "signOnAllEvents";

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    constructor(props: any) {
        super(props);

        this.state = {
            logs: [],
            activeButton: "signOnAllEvents" 
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
        this.activeButton = "signOffAllEvents";
        this.setState({
            activeButton: this.activeButton
        });
        for (const eventName of this.eventList) {
            // remove all handlers for specified event
            this.flexmonster.off(eventName);
        }
    }

    signOnAllEvents = () => {
        this.activeButton = "signOnAllEvents";
        this.setState({
            activeButton: this.activeButton
        });
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
                 <h3 className="title-one page-title">
                    Calling <a target="blank" className="title-link" href="https://www.flexmonster.com/api/events/">Flexmonster events</a>
                </h3>

                <div className="description-blocks first-description-block">
                    <p>
                        Perform an action (for example, click on a grid cell) to trigger a <a className="title-link" target="blank" 
                        href="https://www.flexmonster.com/api/events/">Flexmonster event</a>
                        . Scroll down to the log output to see which events get triggered.
                    </p>
                </div>

               <ToggleButton triggerFunction={this.eventsSignerController} labelChecked="Events are tracked" labelUnChecked="Events are not tracked"/>

                <div>
                    <FlexmonsterReact.Pivot 
                        toolbar={true}
                        ref={this.pivotRef}
                        width="100%"
                        ready={this.signOnAllEvents}
                        report="https://cdn.flexmonster.com/reports/report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>

                <div className="section">
                    <LogsList title="Log output" logsList={this.logs}/>
                    <button className="button-red" onClick={this.clearLogs}>Clear Log Output</button>
                </div>
            </>
        );
    }

}