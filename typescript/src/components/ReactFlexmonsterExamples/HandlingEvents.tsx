import React, { useState, useEffect, useRef } from 'react';
import LogsList from '../UIElements/LogsList';
import * as FlexmonsterReact from 'react-flexmonster';
import ToggleButton from '../UIElements/ToggleButton';
import 'flexmonster';

const HandlingEvents: React.FC = () => {
    const [logs, setLogs] = useState<{
        date: Date;
        event: string;
    }[]>([]);
    const pivotRef: React.RefObject<FlexmonsterReact.Pivot | null> = useRef<FlexmonsterReact.Pivot>(null);

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

    useEffect(() => {
        if (pivotRef.current) {
            signOnAllEvents();
        }

        return () => {
            signOffAllEvents();
        };
    }, []);

    const printLog = (event: string) => {
        const newLog = {
            date: new Date(),
            event: event,
        };
        setLogs(prevLogs => [...prevLogs, newLog]);
        requestAnimationFrame(() => {
            const logsContainer = document.getElementById("logsContainer");
            if (logsContainer) {
                logsContainer.scrollTop = logsContainer.scrollHeight;
            }
        });
    };

    const eventsSignerController = (isSigned: boolean) => {
        if (isSigned) {
            signOnAllEvents();
        } else {
            signOffAllEvents();
        }
    };

    const signOffAllEvents = () => {
        for (const eventName of eventList) {
            // remove all handlers for specified event
            pivotRef.current?.flexmonster.off(eventName);
        }
    };

    const signOnAllEvents = () => {
        for (const eventName of eventList) {
            // add handler for specified event
            pivotRef.current?.flexmonster.on(eventName, () => {
                printLog(eventName);
            });
        }
    };

    const clearLogs = () => {
        setLogs([]);
    };

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
                    triggerFunction={eventsSignerController}
                    labelChecked="Events are tracked"
                    labelUnChecked="Events are not tracked"
                />
            </div>
            <div>
                <FlexmonsterReact.Pivot
                    ref={pivotRef}
                    toolbar={true}
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    width="100%"
                    height={600}
                    report="https://cdn.flexmonster.com/github/demo-report.json"
                />
            </div>
            <div className="section">
                <LogsList title="Log Output" logsList={logs} />
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
