'use client'
import * as React from 'react';
// FM must be imported like this so we can use refs
import * as FlexmonsterReact from "react-flexmonster";
import Flexmonster from 'flexmonster';
import "flexmonster/lib/flexmonster.amcharts.js";
import "flexmonster/lib/flexmonster.highcharts.js";

// A custom type so we can pass a reference along with other Flexmonster params
type PivotProps = Flexmonster.Params & {
    pivotRef?: React.ForwardedRef<FlexmonsterReact.Pivot>;
  }
  
const PivotWrapper: React.FC<PivotProps> = ({ pivotRef, ...params}) => {
    return (
        <FlexmonsterReact.Pivot
            {...params}
            ref={pivotRef}
        />
    )
}

export default PivotWrapper;
