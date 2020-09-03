import React from 'react';
import * as FlexmonsterReact from 'react-flexmonster/hooks';

function PivotTableHooks (props) {

    const ref = React.useRef();    
    
    const onReportComplete = () => {
        console.log(">>>>", ref.current.flexmonster(), ref.current.flexmonster().getReport());
    }

    return <div className="App">
            <FlexmonsterReact.Pivot ref={ref} toolbar={true} width="100%" report="https://cdn.flexmonster.com/reports/report.json" reportcomplete={onReportComplete}/>
           </div>;    
}

export default PivotTableHooks;
