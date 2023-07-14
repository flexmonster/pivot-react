// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
import LogsList from "@/UIElements/LogsList";
import ToggleButton from "@/UIElements/ToggleButton";
// Types are static, so we can safely import it for use in references
import type {Pivot} from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const PivotWrap = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
  });

// Forward ref because PivotWrap is imported dynamically and we need to pass a ref to it
const ForwardRefPivot = React.forwardRef<Pivot, Flexmonster.Params>((props, ref?: React.ForwardedRef<Pivot>) => 
  <PivotWrap {...props} pivotRef={ref}/>
)

export default function HandlingEvents() {
    // Managing state for functional components
    const [logs, setLogs] = React.useState<{
        date: Date,
        event: string
    }[]>([]);

    const pivotRef: React.RefObject<Pivot> = React.useRef<Pivot>(null);

    // Hook that fires every re-render on the client
    React.useEffect(() => {
        const logsContainer = document.querySelector(".event-logs-wrapper .content");
        if (logsContainer) {
            logsContainer.scrollTop = logsContainer.scrollHeight;
        }
    // logs is passed here so we can subscribe to its changes
    }, [logs])

    //the list of all supported events
    const eventList = [
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

    const printLog = (event: string) => {
        logs.push({
            date: new Date(), 
            event: event
        });
        // This will fire a state change
        setLogs([...logs]);
    }

    const eventsSignerController = (isSigned: boolean) => {
        isSigned ? signOnAllEvents() : signOffAllEvents();
    }

    const signOffAllEvents = () => {
        for (const eventName of eventList) {
            // remove all handlers for specified event
            pivotRef.current?.flexmonster.off(eventName);
        }
    }

    const signOnAllEvents = () => {
        for (const eventName of eventList) {
            // add handler for specified event
            pivotRef.current?.flexmonster.on(eventName, () => {
                printLog(eventName);
            });
        }
    }

    const clearLogs = () => {
        // This will fire a state change
        setLogs((_) => [])
    }

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
                <ToggleButton triggerFunction={eventsSignerController} labelChecked="Events are tracked" labelUnChecked="Events are not tracked" />
            </div>

            <div>
                <ForwardRefPivot
                    ref={pivotRef}
                    toolbar={true}
                    // Can't be serialized, so this must be a client component
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    width="100%"
                    height={600}
                    ready={signOnAllEvents}
                    report="https://cdn.flexmonster.com/github/demo-report.json"
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </div>

            <div className="section">
                <LogsList title="Log Output" logsList={logs} />
                <button className="button-red" onClick={clearLogs}>Clear Log Output</button>
            </div>
        </>
    );

}