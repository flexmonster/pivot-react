// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useRef, useState, useEffect } from "react";
import LogsList from "@/UIElements/LogsList";
import ToggleButton from "@/UIElements/ToggleButton";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster Pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

export default function HandlingEvents() {
  const [logs, setLogs] = useState<{date: Date; event: string;}[]>([]);
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);

  useEffect(() => {
    const logsContainer = document.querySelector(".event-logs-wrapper .content");
    if (logsContainer) {
      logsContainer.scrollTop = logsContainer.scrollHeight;
    }
  }, [logs]);

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
    const newLog = {
      date: new Date(),
      event: event,
    };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const eventsSignerController = (isSigned: boolean) => {
    isSigned ? signOnAllEvents() : signOffAllEvents();
  };

  const signOffAllEvents = () => {
    for (const eventName of eventList) {
      // Remove all handlers for the specified event
      pivotRef.current?.flexmonster.off(eventName);
    }
  };

  const signOnAllEvents = () => {
    for (const eventName of eventList) {
      // Add handler for the specified event
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
      <h3 className="title-one page-title">Handling Flexmonster events</h3>

      <div className="description-blocks first-description-block">
        <p>
          Perform an action (for example, click on a grid cell) to trigger a{" "}
          <a
            className="title-link"
            target="blank"
            rel="noopener noreferrer"
            href="https://www.flexmonster.com/api/events/?r=rm_react"
          >Flexmonster event</a>. Scroll down to the log output to see which events get triggered.
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
        <FlexmonsterPivot
          ref={pivotRef}
          toolbar={true}
          height={600}
          report="https://cdn.flexmonster.com/github/demo-report.json"
          ready={signOnAllEvents}
          beforetoolbarcreated={(toolbar) => {
            toolbar.showShareReportTab = true;
          }}
          shareReportConnection={{
            url: "https://olap.flexmonster.com:9500",
          }}
          //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
        />
      </div>
      <div className="section">
        <LogsList
          title="Log Output"
          logsList={logs}
        />
        <div className="section--button">
          <button
            className="button-red"
            onClick={clearLogs}
          >
            Clear Log Output
          </button>
        </div>
      </div>
    </>
  );
}
