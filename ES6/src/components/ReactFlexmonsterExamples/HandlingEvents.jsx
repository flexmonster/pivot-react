import React, { useEffect, useRef, useState } from "react";
import LogsList from "../UIElements/LogsList";
import ToggleButton from "../UIElements/ToggleButton";
import * as FlexmonsterReact from "react-flexmonster";

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

function HandlingEvents(props) {
    const [logs, setLogs] = useState([]);
    const logsContainer = useRef(null);

    const printLog = (log) => {
        setLogs((prevLogs) => [
            ...prevLogs,
            {
                date: new Date(),
                event: log,
            },
        ]);
    };

    const signOffAllEvents = () => {
        for (const eventName of eventList) {
            // remove all handlers for specified event
            pivotRef.current.flexmonster.off(eventName);
        }
    };

    const signOnAllEvents = () => {
        for (const eventName of eventList) {
            // add handler for specified event
            pivotRef.current.flexmonster.on(eventName, () => {
                printLog(eventName);
            });
        }
    };

    useEffect(() => {
        const logsContainerElement = logsContainer.current;
        if (logsContainerElement) {
            logsContainerElement.scrollTop = logsContainerElement.scrollHeight;
        }
    }, [logs]);

    const clearLogs = () => {
        setLogs([]);
    };

    const pivotRef = useRef(null);

    return (
        <>
            <h1 className="title-one page-title">Handling Flexmonster events</h1>

            <div className="description-blocks first-description-block">
                <p>
                    Perform an action (for example, click on a grid cell) to trigger a{" "}
                    <a
                        className="title-link"
                        target="blank"
                        rel="noopener noreferrer"
                        href="https://www.flexmonster.com/api/events/?r=rm_react"
                    >
                        Flexmonster event
                    </a>
                    . Scroll down to the log output to see which events get triggered.
                </p>
            </div>

            <div className="description-blocks">
                <ToggleButton
                    id="eventsToggle"
                    triggerFunction={(isSigned) =>
                        isSigned ? signOnAllEvents() : signOffAllEvents()
                    }
                    labelChecked="Events are tracked"
                    labelUnChecked="Events are not tracked"
                />
            </div>

            <div>
                <FlexmonsterReact.Pivot
                    ref={pivotRef}
                    toolbar={true}
                    beforetoolbarcreated={(toolbar) => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500",
                    }}
                    width="100%"
                    height={600}
                    ready={signOnAllEvents}
                    report="https://cdn.flexmonster.com/github/demo-report.json"
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </div>

            <div className="section">
                <LogsList title="Log Output" ref={logsContainer} logsList={logs} />
                <div className="section--button">
                    <button className="button-red" onClick={clearLogs}>
                        Clear Log Output
                    </button>
                </div>
            </div>
        </>
    );
};

export default HandlingEvents;
