import React from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import PivotTable from '../../ReactFlexmonsterExamples/PivotTable';
import PivotTableAndHighcharts from '../../ReactFlexmonsterExamples/PivotTableAndHighcharts';
import PivotApiCalls from '../../ReactFlexmonsterExamples/PivotAPICalls';
import PivotTableHooks from '../../ReactFlexmonsterExamples/PivotTableHooks';
import PivotEvents from '../../ReactFlexmonsterExamples/PivotEvents';
import PivotUpdateData from '../../ReactFlexmonsterExamples/PivotUpdateData';
import PivotCustomizeToolbar from '../../ReactFlexmonsterExamples/PivotCustomizeToolbar';
import PivotCustomizeGrid from '../../ReactFlexmonsterExamples/PivotCustomizeGrid';

function ExamplesContainer({location}) {

    return (
        <div className="pivot-example-container">
            <Switch location={location}>
                <Route path="/pivot-table-demo" component={PivotTable}/>
                <Route path="/with-highcharts" component={PivotTableAndHighcharts}/>
                <Route path="/api-calls" component={PivotApiCalls}/>
                <Route path="/calling-events" component={PivotEvents}/>
                <Route path="/hooks" component={PivotTableHooks}/>
                <Route path="/updating-data" component={PivotUpdateData}/>
                <Route path="/customize-toolbar" component={PivotCustomizeToolbar}/>
                <Route path="/customize-grid" component={PivotCustomizeGrid}/>
                <Route exact path="/**">
                    <Redirect to="/pivot-table-demo" />
                </Route>
            </Switch>
        </div>
    );

}

export default withRouter(ExamplesContainer);