import * as React from "react";

export default function TopMenu() {

    return (
        <header className="mainheader fixed-head">
            <div className="container-xl">
            <a href="https://www.flexmonster.com/?r=rm_react" target="blank" className="logo">
                <img src="https://www.flexmonster.com/base/assets/img/svg/logo.svg" alt="" />
            </a>
            <ul className="mainnav">
                <li >
                <a href="https://www.flexmonster.com/doc/?r=rm_react" target="blank">Docs</a>
                </li>
                <li >
                <a href="https://www.flexmonster.com/support/?r=rm_react" target="blank">Support</a>
                </li>
                <li >
                <a href="https://www.flexmonster.com/contact/?r=rm_react" target="blank">Contact us</a>
                </li>
            </ul>
            </div>
        </header>
    );
}