import * as React from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import * as H from "history";

import PivotTableDemo from '../ReactFlexmonsterExamples/PivotTableDemo';
import WithHighcharts from '../ReactFlexmonsterExamples/WithHighcharts';
import WithAmcharts from '../ReactFlexmonsterExamples/WithAmcharts';
import UsingAPICalls from '../ReactFlexmonsterExamples/UsingAPICalls';
import HandlingEvents from '../ReactFlexmonsterExamples/HandlingEvents';
import UpdatingData from '../ReactFlexmonsterExamples/UpdatingData';
import CustomizingToolbar from '../ReactFlexmonsterExamples/CustomizingToolbar';
import CustomizingGrid from '../ReactFlexmonsterExamples/CustomizingGrid';

type Props = { location: H.Location<H.History.LocationState> | undefined };

const ExamplesContainer = (props: Props) => {

    const { location } = props;
    return (
        <div className="pivot-example-container">
            <Switch location={location}>
                <Route path="/pivot-table-demo" component={PivotTableDemo} exact />
                <Route path="/with-highcharts" component={WithHighcharts} />
                <Route path="/with-amcharts" component={WithAmcharts}/>
                <Route path="/using-api-calls" component={UsingAPICalls} />
                <Route path="/handling-events" component={HandlingEvents} />
                <Route path="/updating-data" component={UpdatingData} />
                <Route path="/customize-toolbar" component={CustomizingToolbar} />
                <Route path="/customize-grid" component={CustomizingGrid} />
                <Route exact path="/**">
                    <Redirect to="/pivot-table-demo" />
                </Route>
            </Switch>
        </div>
    );

}

export default withRouter(ExamplesContainer);
