import * as React from "react";
import LogsList from "../UIElements/logsList/LogsList";
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/flexmonster.css';
//You can use a different theme by specifying the corresponding path
//For example, to load the Green theme:
//import 'flexmonster/theme/green/flexmonster.css';

export default class PivotEvents extends React.Component<any, {}> {

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

                <button className={`toggle-button-red ${(this.activeButton === "signOffAllEvents")?"button-red-active":""}`} onClick={this.signOffAllEvents}>Sign off all events</button>
                <button className={`toggle-button-red ${(this.activeButton === "signOnAllEvents")?"button-red-active":""}`} onClick={this.signOnAllEvents}>Sign on all events</button>

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

                <div className="description-blocks first-description-block">
                    <button className="button-red" onClick={this.clearLogs}>Clear Log Output</button>
                    <LogsList logsList={this.logs}/>
                </div>
            </>
        );
    }

}