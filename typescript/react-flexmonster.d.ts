import * as React from "react";
import "@types/flexmonster";

declare module 'react-flexmonster' {

    class Pivot extends React.Component<Flexmonster.Params, any>  {
        flexmonster: Flexmonster.Pivot;
    }

}
