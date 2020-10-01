import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/flexmonster.css';
//You can use a different theme by specifying the corresponding path
//For example, to load the Green theme:
//import 'flexmonster/theme/green/flexmonster.css';

class PivotTableDemo extends React.Component {
    render() {
        return (
            <>
                <h3 className="page-title">Simple Usage Example</h3>
                <div className="App">
                    <FlexmonsterReact.Pivot 
                        toolbar={true} 
                        width="100%"
                        report="https://cdn.flexmonster.com/reports/report.json"
                        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                    />
                </div>
            </>
        );
    }
}

export default PivotTableDemo;
