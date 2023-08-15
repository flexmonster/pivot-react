export default function TopMenu() {

    return (
        <header className="mainheader fixed-head">
            <div className="container-xl">
                <a href="https://www.flexmonster.com/?r=rm_react" target="blank" rel="noopener noreferrer" className="logo">
                    <img src="https://www.flexmonster.com/base/assets/img/svg/logo.svg" alt="" />
                </a>
                <ul className="mainnav">
                    <li>
                        <a href="https://www.flexmonster.com/doc/integration-with-react/?r=rm_react" target="blank" rel="noopener noreferrer">Integration with React</a>
                    </li>
                    <li>
                        <a href="https://www.flexmonster.com/doc/?r=rm_react" target="blank" rel="noopener noreferrer">Docs</a>
                    </li>
                    <li>
                        <a href="https://www.flexmonster.com/help-center/?r=rm_react" target="blank" rel="noopener noreferrer">Help center</a>
                    </li>
                    <li>
                        <a href="https://www.flexmonster.com/contact/?r=rm_react" target="blank" rel="noopener noreferrer">Contact us</a>
                    </li>
                </ul>
            </div>
        </header>
    );
}