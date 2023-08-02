import React from "react";

const LogsList = React.forwardRef((props, ref) => {
    const { logsList, title } = props;

    const logsTemplate = logsList.map((logElement, index) => {
        const docRef = `https://www.flexmonster.com/api/${logElement.event}/?r=rm_react`;
        return <div key={index} className="log">
            <span className="log-label">[ Event ] {logElement.date.toLocaleTimeString()}: </span>
            {logElement.event + " "}
            [ <a className="log-link" rel="noopener noreferrer" target="_blank"
                href={docRef}>see details</a> ]
        </div>
    });

    return (
        <>
            <h3 className="title-4">{title}</h3>
            <div className="event-logs-wrapper fullwidth" ref={ref}>
                <div className="content">
                    {logsTemplate}
                </div>
            </div>
        </>
    );
});

export default LogsList;
