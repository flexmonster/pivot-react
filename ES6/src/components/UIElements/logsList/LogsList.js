import React from "react";
import "./LogsList.css";

export default class LogsList extends React.Component {

    render() {
        const {logsList} = this.props;

        const logsTemplate = logsList.map((logElement, index) => {
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
}