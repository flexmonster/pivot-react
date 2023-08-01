"use client"
import React from "react";
import Link from "./Link";

export default function SideMenu() {

    return (
        <div className="side-menu">
            <ol>
                <li className="tab-button">
                    <Link url="/pivot-table-demo" caption="PIVOT TABLE DEMO"/>
                </li>
            </ol>
            <div className="sub-title">API and Events</div>
            <ol>
                <li className="tab-button">
                    <Link url="/handling-events" caption="HANDLING EVENTS"/>
                </li>
                <li className="tab-button">
                    <Link url="/using-api-calls" caption="USING API CALLS"/>
                </li>
                <li className="tab-button">
                    <Link url="/updating-data" caption="UPDATING DATA"/>
                </li>
            </ol>
            <div className="sub-title">Customization</div>
            <ol>
                <li className="tab-button">
                    <Link url="/customizing-toolbar" caption="CUSTOMIZING THE TOOLBAR"/>
                </li>
                <li className="tab-button">
                    <Link url="/customizing-grid" caption="CUSTOMIZING THE GRID"/>
                </li>
            </ol>
            <div className="sub-title">Integration</div>
            <ol>
                <li className="tab-button">
                    <Link url="/with-highcharts" caption="WITH HIGHCHARTS"/>
                </li>
                <li className="tab-button">
                    <Link url="/with-amcharts" caption="WITH AMCHARTS"/>
                </li>
            </ol>
        </div>
    );

}