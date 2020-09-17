import React from "react";
import './TopMenu.css';

export default function TopMenu() {

    return (
        <header className="mainheader fixed-head">
            <div className="container-xl">
            <a href="https://www.flexmonster.com/" target="blank" className="logo">
                <img src="https://www.flexmonster.com/base/assets/img/svg/logo.svg" alt="" />
            </a>
            <ul className="mainnav">
                <li >
                <a href="https://www.flexmonster.com/doc/" target="blank">Docs</a>
                </li>
                <li >
                <a href="https://www.flexmonster.com/support/" target="blank">Support</a>
                </li>
                <li >
                <a href="https://www.flexmonster.com/contact/" target="blank">Contact us</a>
                </li>
            </ul>
            </div>
        </header>
    );
}