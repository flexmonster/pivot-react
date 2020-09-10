import * as React from "react";
import "./LogsList.css";

type Props = {logsList: {
    date: Date,
    event: string
}[]};

const LogsList = (props: Props) => {

        const {logsList} = props;

        const logsTemplate = logsList.map((logElement: {
            date: Date,
            event: string
        }, index: number) => {
            const docRef = `https://www.flexmonster.com/api/${logElement.event}`;
            return <div key = {index} className="log">
                <span className="log-label">[ Event ] { logElement.date.toLocaleTimeString()}: </span>
                {logElement.event + " "}
                [ <a className="log-link" rel="noopener noreferrer" target="_blank"
                href={docRef}>see details</a> ]
            </div>
        })
        return (
            <div id="logsContainer" className="logs-container">
               {logsTemplate}     
            </div>
        );
    
}

export default LogsList;