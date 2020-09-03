import React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";

import PivotTable from '../../ReactFlexmonsterExamples/PivotTable';
import PivotTableAndHighcharts from '../../ReactFlexmonsterExamples/PivotTableAndHighcharts';
import APICallsAndEvents from '../../ReactFlexmonsterExamples/APICallsAndEvents';
import PivotTableHooks from '../../ReactFlexmonsterExamples/PivotTableHooks';
import './ExamplesContainer.css';


function ExamplesContainer({location}) {

    return (
        <div className="pivotContent">
            <Switch location={location}>                    
                <Route path="/" component={PivotTable} exact/>
                <Route path="/highcharts" component={PivotTableAndHighcharts}/>
                <Route path="/api-calls" component={APICallsAndEvents}/>
                <Route path="/hooks" component={PivotTableHooks}/>
            </Switch>
        </div>
    );

}

export default withRouter(ExamplesContainer);