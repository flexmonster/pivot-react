import * as React from "react";
import { Link } from "react-router-dom";
import './SideMenu.css';

export default class SideMenu extends React.Component {

    render () {
        return (
                <div className="side-menu">
                    <ol>
                        <li className="tab-button">
                            <Link to="/">PIVOT TABLE DEMO</Link>
                        </li>
                        <li className="tab-button">
                            <Link to="/hooks">PIVOT TABLE DEMO (HOOKS)</Link>
                        </li>
                    </ol>
                    <div className="sub-title">API and Events</div>
                    <ol>
                        <li className="tab-button">
                            <Link to="/calling-events">CALLING EVENTS</Link>
                        </li>
                        <li className="tab-button">
                            <Link to="/api-calls">USING API CALLS</Link>
                        </li>
                        <li className="tab-button">
                            <Link to="/updating-data">UPDATING DATA</Link>
                        </li>
                    </ol>
                    <div className="sub-title">Customization</div>
                    <ol>
                        <li className="tab-button">
                            <Link to="/customize-toolbar">CUSTOMIZING THE TOOLBAR</Link>
                        </li>
                        <li className="tab-button">
                            <Link to="/customize-grid">CUSTOMIZING THE GRID</Link>
                        </li>
                    </ol>
                    <div className="sub-title">Integration</div>
                    <ol>
                        <li className="tab-button">
                            <Link to="/highcharts">WITH HIGHCHARTS</Link>
                        </li>
                    </ol>
                </div>
        );
    }
}