import React from "react";

export default class LogsList extends React.Component {

    render() {
        const {logsList, title} = this.props;

        const logsTemplate = logsList.map((logElement, index) => {
            const docRef = `https://www.flexmonster.com/api/${logElement.event}/?r=rm_react`;
            return <div key = {index} className="log">
                <span className="log-label">[ Event ] { logElement.date.toLocaleTimeString()}: </span>
                {logElement.event + " "}
                [ <a className="log-link" rel="noopener noreferrer" target="_blank"
                href={docRef}>see details</a> ]
            </div>
        });

        return (
            <>                
                <h3 className="event-logs-title">{title}</h3>
                <div className="event-logs-wrapper fullwidth">
                    <div className="content">
                        {logsTemplate}
                    </div> 
                </div>
            </>
        );
    }
}