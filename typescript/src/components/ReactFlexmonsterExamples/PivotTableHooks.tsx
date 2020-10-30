import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster/hooks';
import 'flexmonster';

const PivotTableHooks = (props: any) => {

    const pivotRef: any = React.useRef<FlexmonsterReact.FlexmonsterReference>();    
    
    const onReportComplete = () => {
        //please note that 'react-flexmonster/hooks' is a functional component
        //when React rebuilds the DOM it will clear 'react-flexmonster/hooks' state and flexmonster() function will return undefined
        //if Flexmonster's API calls are going to be executed please consider using class component (PivotTable.js)
        if (pivotRef.current) {
            console.log(">>>>", pivotRef.current.flexmonster(), pivotRef.current.flexmonster().getReport());
        }
    }

    return <>
                <h3 className="page-title">Pivot Table Demo (with hooks)</h3>
                <div className="App">
                    <FlexmonsterReact.Pivot 
                        ref={pivotRef}
                        toolbar={true}
                        width="100%"
                        report="https://cdn.flexmonster.com/reports/report.json"
                        reportcomplete={onReportComplete}
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>
           </>;    
}

export default PivotTableHooks;
