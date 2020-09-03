import React from "react";
import { Link } from "react-router-dom";
import ExamplesContainer from "../examplesContainer/ExamplesContainer";
import './ContentPanel.css';

export default class ContentPanel extends React.Component {

    render () {
        return (
            <div className="wrapper">
                <div class="side-menu">
                    <ol>
                        <li class="tab-button">
                            <Link to="/">PIVOT TABLE DEMO</Link>
                        </li>
                    </ol>
                    <div class="sub-title">API and Events</div>
                    <ol>
                        <li class="tab-button">
                            <a routerLink="/calling-events" routerLinkActive="active">CALLING EVENTS</a>
                        </li>
                        <li class="tab-button">
                            <Link to="/api-calls">USING API CALLS</Link>
                        </li>
                        <li class="tab-button">
                            <a routerLink="/updating-data" routerLinkActive="active">UPDATING DATA</a>
                        </li>
                    </ol>
                    <div class="sub-title">Customization</div>
                    <ol>
                        <li class="tab-button">
                            <a routerLink="/customizing-toolbar" routerLinkActive="active">CUSTOMIZING TOOLBAR</a>
                        </li>
                        <li class="tab-button">
                            <a routerLink="/customizing-grid" routerLinkActive="active">CUSTOMIZING GRID</a>
                        </li>
                    </ol>
                    <div class="sub-title">Integration</div>
                    <ol>
                        <li class="tab-button">
                            <Link to="/highcharts">WITH HIGHCHARTS</Link>
                        </li>
                    </ol>
                </div>
                <ExamplesContainer/>
            </div>
        );
    }
}