"use client"
import React from "react";

export default class SideMenu extends React.Component {

    render () {
        return (
                <div className="side-menu">
                    <ol>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/pivot-table-demo">PIVOT TABLE DEMO</a>
                        </li>
                    </ol>
                    <div className="sub-title">API and Events</div>
                    <ol>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/handling-events">HANDLING EVENTS</a>
                        </li>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/using-api-calls">USING API CALLS</a>
                        </li>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/updating-data">UPDATING DATA</a>
                        </li>
                    </ol>
                    <div className="sub-title">Customization</div>
                    <ol>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/customizing-toolbar">CUSTOMIZING THE TOOLBAR</a>
                        </li>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/customizing-grid">CUSTOMIZING THE GRID</a>
                        </li>
                    </ol>
                    <div className="sub-title">Integration</div>
                    <ol>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/with-highcharts">WITH HIGHCHARTS</a>
                        </li>
                        <li className="tab-button">
                            <a className="router-link-exact-active" href="/with-amcharts">WITH AMCHARTS</a>
                        </li>
                    </ol>
                </div>
        );
    }
}