import { useRef, useState } from "react";
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

function HandlingEvents() {
  const pivotRef = useRef(null);
  const [logs, setLogs] = useState([]);

  const printLog = (log) => {
    setLogs((prevLogs) => [
      ...prevLogs,
      {
        date: new Date(),
        event: log,
      },
    ]);
    requestAnimationFrame(() => {
      const logsContainer = document.getElementById("logsContainer");
      if (logsContainer) {
        logsContainer.scrollTop = logsContainer.scrollHeight;
      }
    });
  };

  const signOffAllEvents = () => {
    for (const eventName of eventList) {
      // Remove all handlers for the specified event
      pivotRef.current.flexmonster.off(eventName);
    }
  };

  const signOnAllEvents = () => {
    for (const eventName of eventList) {
      // Add a handler for the specified event
      pivotRef.current.flexmonster.on(eventName, () => {
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
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.flexmonster.com/api/events/?r=rm_react"
          >Flexmonster event</a>. Scroll down to the log output to see which events get triggered.
        </p>
      </div>

      <div className="description-blocks">
        <ToggleButton
          id="eventsToggle"
          triggerFunction={(isSigned) => (isSigned ? signOnAllEvents() : signOffAllEvents())}
          labelChecked="Events are tracked"
          labelUnChecked="Events are not tracked"
        />
      </div>

      <div>
        <FlexmonsterReact.Pivot
          ref={pivotRef}
          toolbar={true}
          height={600}
          ready={signOnAllEvents}
          report="https://cdn.flexmonster.com/github/demo-report.json"
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
          id="logsContainer"
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

export default HandlingEvents;
