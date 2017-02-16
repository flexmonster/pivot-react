import * as React from "react";
import * as ReactDOM from "react-dom";

import { FlexmonsterReact } from "./components/FlexmonsterReact";

ReactDOM.render(
    <FlexmonsterReact.Pivot 
    	componentFolder="https://cdn.flexmonster.com/2.3/"
    	report="https://cdn.flexmonster.com/2.3/reports/report.json"
    	toolbar={true}
    />,
    document.getElementById("fm-container")
);