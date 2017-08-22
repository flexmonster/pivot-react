import * as React from "react";
import * as ReactDOM from "react-dom";

import { FlexmonsterReact } from "./components/FlexmonsterReact";

ReactDOM.render(
    <FlexmonsterReact.Pivot 
    	componentFolder="https://cdn.flexmonster.com/"
    	report="https://cdn.flexmonster.com/reports/report.json"
    	toolbar={true}
    />,
    document.getElementById("fm-container")
);