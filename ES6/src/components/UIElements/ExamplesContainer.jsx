import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";

import PivotTableDemo from '../ReactFlexmonsterExamples/PivotTableDemo';
import WithHighcharts from '../ReactFlexmonsterExamples/WithHighcharts';
import WithAmcharts4 from '../ReactFlexmonsterExamples/WithAmcharts4';
import WithAmcharts from '../ReactFlexmonsterExamples/WithAmcharts';
import UsingAPICalls from '../ReactFlexmonsterExamples/UsingAPICalls';
import HandlingEvents from '../ReactFlexmonsterExamples/HandlingEvents';
import UpdatingData from '../ReactFlexmonsterExamples/UpdatingData';
import CustomizingToolbar from '../ReactFlexmonsterExamples/CustomizingToolbar';
import CustomizingGrid from '../ReactFlexmonsterExamples/CustomizingGrid';

function ExamplesContainer() {

    return (
        <div className="pivot-example-container">
            <Routes>
                <Route path="/pivot-table-demo" element={<PivotTableDemo/>}/>
                <Route path="/with-highcharts" element={<WithHighcharts/>}/>
                <Route path="/with-amcharts4" element={<WithAmcharts4/>}/> 
                <Route path="/with-amcharts" element={<WithAmcharts/>}/> 
                <Route path="/using-api-calls" element={<UsingAPICalls/>}/>
                <Route path="/handling-events" element={<HandlingEvents/>}/>
                <Route path="/updating-data" element={<UpdatingData/>}/>
                <Route path="/customizing-toolbar" element={<CustomizingToolbar/>}/>
                <Route path="/customizing-grid" element={<CustomizingGrid/>}/>
                <Route path="/" element={<Navigate to="/pivot-table-demo" />} />
            </Routes>

        </div>
    );

}

export default ExamplesContainer;
