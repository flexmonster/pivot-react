import * as React from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import * as H from "history";

import PivotTable from '../../ReactFlexmonsterExamples/PivotTable';
import PivotTableAndHighcharts from '../../ReactFlexmonsterExamples/PivotTableAndHighcharts';
import PivotApiCalls from '../../ReactFlexmonsterExamples/PivotAPICalls';
import PivotTableHooks from '../../ReactFlexmonsterExamples/PivotTableHooks';
import PivotEvents from '../../ReactFlexmonsterExamples/PivotEvents';
import PivotUpdateData from '../../ReactFlexmonsterExamples/PivotUpdateData';
import PivotCustomizeToolbar from '../../ReactFlexmonsterExamples/PivotCustomizeToolbar';
import PivotCustomizeGrid from '../../ReactFlexmonsterExamples/PivotCustomizeGrid';
import './ExamplesContainer.css';

type Props = { location: H.Location<H.History.LocationState> | undefined };

const ExamplesContainer = (props: Props) => {

    const { location } = props;
    return (
        <div className="pivotContent">
            <Switch location={location}>
                <Route path="/" component={PivotTable} exact />
                <Route path="/highcharts" component={PivotTableAndHighcharts} />
                <Route path="/api-calls" component={PivotApiCalls} />
                <Route path="/calling-events" component={PivotEvents} />
                <Route path="/hooks" component={PivotTableHooks} />
                <Route path="/updating-data" component={PivotUpdateData} />
                <Route path="/customize-toolbar" component={PivotCustomizeToolbar} />
                <Route path="/customize-grid" component={PivotCustomizeGrid} />
            </Switch>
        </div>
    );

}

export default withRouter(ExamplesContainer);