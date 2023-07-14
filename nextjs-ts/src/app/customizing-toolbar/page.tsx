// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
// Types are static, so we can safely import it for use in references
import type {Pivot} from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const PivotWrap = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
  });

// Forward ref because PivotWrap is imported dynamically and we need to pass a ref to it
const ForwardRefPivot = React.forwardRef<Pivot, Flexmonster.Params>((props, ref?: React.ForwardedRef<Pivot>) => 
  <PivotWrap {...props} pivotRef={ref}/>
)

export default function CustomizingToolba() {

    const pivotRef: React.RefObject<Pivot> = React.useRef<Pivot>(null);

    const showInfo = () => {
        pivotRef.current?.flexmonster.alert({
            title: "Customizing Flexmonster",
            message:
                "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' rel='noopener noreferrer' href='https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
            type: "info",
            blocking: false,
        });
    }

    const customizeToolbar = (toolbar: Flexmonster.Toolbar) => {
        let tabs = toolbar.getTabs();
        toolbar.getTabs = () => {
            tabs = [];
            // add new tab
            tabs.push({
                id: "fm-tab-newtab",
                title: "New Tab",
                handler: () => showInfo(),
                icon: toolbar.icons.open,
            });
            return tabs;
        };
    }

    return (
        <>
            <h1 className="page-title">Customizing the Toolbar</h1>

            <div className="description-blocks first-description-block">
                <p>You can add, remove, and update the Toolbar tabs.</p>
                <p>In this demo, we’ve removed all the tabs and added a custom <strong>New Tab</strong>.
                    See our docs to learn more about the Toolbar and its
                    customization: <a href="https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Customizing the Toolbar</a>.
                </p>
            </div>

            <ForwardRefPivot
                ref={pivotRef}
                toolbar={true}
                width="100%"
                height={600}
                report="https://cdn.flexmonster.com/github/demo-report.json"
                beforetoolbarcreated={customizeToolbar}
            //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
        </>
    );

}