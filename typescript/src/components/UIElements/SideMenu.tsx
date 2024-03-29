import * as React from "react";
import { NavLink } from "react-router-dom";

const SideMenu: React.FC = () => {

    return (
        <div className="side-menu">
            <ol>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/pivot-table-demo">PIVOT TABLE DEMO</NavLink>
                </li>
            </ol>
            <div className="sub-title">API and Events</div>
            <ol>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/handling-events">HANDLING EVENTS</NavLink>
                </li>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/using-api-calls">USING API CALLS</NavLink>
                </li>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/updating-data">UPDATING DATA</NavLink>
                </li>
            </ol>
            <div className="sub-title">Customization</div>
            <ol>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/customizing-toolbar">CUSTOMIZING THE TOOLBAR</NavLink>
                </li>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/customizing-grid">CUSTOMIZING THE GRID</NavLink>
                </li>
            </ol>
            <div className="sub-title">Integration</div>
            <ol>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/with-highcharts">WITH HIGHCHARTS</NavLink>
                </li>
                <li className="tab-button">
                    <NavLink className={({ isActive }) => isActive ? "router-link-exact-active" : ''} to="/with-amcharts">WITH AMCHARTS</NavLink>
                </li>
            </ol>

        </div>
    );
}

export default SideMenu;
