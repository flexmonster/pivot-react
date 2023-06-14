"use client"
import React from "react";

export default class SideMenu extends React.Component {

    activeClassName(pathname: string) : string {
        return window.location.pathname == pathname ? "router-link-exact-active" : "";
    }
    render() {
        return (
            <div className="side-menu">
                <ol>
                    <li className="tab-button">
                        <a className={this.activeClassName("/pivot-table-demo")} href="/pivot-table-demo">PIVOT TABLE DEMO</a>
                    </li>
                </ol>
                <div className="sub-title">API and Events</div>
                <ol>
                    <li className="tab-button">
                        <a className={this.activeClassName("/handling-events")} href="/handling-events">HANDLING EVENTS</a>
                    </li>
                    <li className="tab-button">
                        <a className={this.activeClassName("/using-api-calls")} href="/using-api-calls">USING API CALLS</a>
                    </li>
                    <li className="tab-button">
                        <a className={this.activeClassName("/updating-data")} href="/updating-data">UPDATING DATA</a>
                    </li>
                </ol>
                <div className="sub-title">Customization</div>
                <ol>
                    <li className="tab-button">
                        <a className={this.activeClassName("/customizing-toolbar")} href="/customizing-toolbar">CUSTOMIZING THE TOOLBAR</a>
                    </li>
                    <li className="tab-button">
                        <a className={this.activeClassName("/customizing-grid")} href="/customizing-grid">CUSTOMIZING THE GRID</a>
                    </li>
                </ol>
                <div className="sub-title">Integration</div>
                <ol>
                    <li className="tab-button">
                        <a className={this.activeClassName("/with-highcharts")} href="/with-highcharts">WITH HIGHCHARTS</a>
                    </li>
                    <li className="tab-button">
                        <a className={this.activeClassName("/with-amcharts")} href="/with-amcharts">WITH AMCHARTS</a>
                    </li>
                </ol>
            </div>
        );
    }
}