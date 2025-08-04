// Must be a client component because we pass a function in the beforetoolbarcreated param
"use client";
import { useRef } from "react";
// Types are static, so we can safely import them to use in refs
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster Pivot
const FlexmonsterPivot = dynamic(() => import("@/UIElements/PivotWrapper"), {
  ssr: false,
  loading: () => <h1>Loading Flexmonster...</h1>,
});

export default function CustomizingToolba() {
  const pivotRef: React.RefObject<Pivot | null> = useRef<Pivot>(null);

  const customizeToolbar = (toolbar: Flexmonster.Toolbar) => {
    let tabs = toolbar.getTabs();
    toolbar.getTabs = () => {
      tabs = [];
      // Add a new tab
      tabs.push({
        id: "fm-tab-newtab",
        title: "New Tab",
        handler: () => showInfo(),
        icon: toolbar.icons.open,
      });
      return tabs;
    };
  };

  const showInfo = () => {
    pivotRef.current?.flexmonster.alert({
      title: "Customizing Flexmonster",
      message:
        "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' rel='noopener noreferrer' href='https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
      type: "info",
      blocking: false,
    });
  };

  return (
    <>
      <h1 className="page-title">Customizing the Toolbar</h1>

      <div className="description-blocks first-description-block">
        <p>You can add, remove, and update the Toolbar tabs.</p>
        <p>
          In this demo, we've removed all the tabs and added a custom <strong>New Tab</strong>. See our docs to learn more about the Toolbar and its
          customization:{" "}
          <a
            href="https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react"
            target="_blank"
            rel="noopener noreferrer"
            className="title-link"
          >Customizing the Toolbar</a>.
        </p>
      </div>

      <FlexmonsterPivot
        ref={pivotRef}
        toolbar={true}
        height={600}
        report="https://cdn.flexmonster.com/github/demo-report.json"
        beforetoolbarcreated={customizeToolbar}
        //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
      />
    </>
  );
}
