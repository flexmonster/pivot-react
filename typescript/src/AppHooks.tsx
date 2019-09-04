import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster/hooks';


function AppHooks (props: React.Props<any>) {


    const ref: React.RefObject<FlexmonsterReact.FlexmonsterReference> = React.useRef<FlexmonsterReact.FlexmonsterReference>(null);   
    
    
    const onReportComplete = () => {
        const flexmonsterRef: FlexmonsterReact.FlexmonsterReference | null = ref.current;
        if (flexmonsterRef) {
            console.log(">>>>", flexmonsterRef.flexmonster().getReport());
        }
    }

    return <div><FlexmonsterReact.Pivot ref={ref} toolbar={true} ready={() => onReportComplete()} width="100%"/> </div>;
}

export default AppHooks;
