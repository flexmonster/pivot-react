// Must be a client component because we pass function in the beforetoolbarcreated param
"use client"
import * as React from "react";
// Types are static, so we can safely import it for use in references
import type { Pivot } from "react-flexmonster";
import dynamic from "next/dynamic";

// Wrapper must be imported dynamically, since it contains Flexmonster pivot
const PivotWrap = dynamic(() => import('@/UIElements/PivotWrapper'), {
    ssr: false,
    loading: () => <h1>Loading Flexmonster...</h1>
});

export default function UpdatingData() {

    const pivotRef: React.RefObject<Pivot | null> = React.useRef<Pivot>(null);

    let data = [
        {
            Category: "Accessories",
            Size: "262 oz",
            Color: "red",
            Destination: "Australia",
            "Business Type": "Specialty Bike Shop",
            Country: "Australia",
            Price: 100,
            Quantity: 225,
            Discount: 23,
        },
        {
            Category: "Components",
            Size: "235 oz",
            Color: "green",
            Destination: "Australia",
            "Business Type": "Warehouse",
            Country: "Australia",
            Price: 200,
            Quantity: 1950,
            Discount: 51,
        },
    ];

    const onReady = () => {
        // Connect Flexmonster to the data
        pivotRef.current?.flexmonster.connectTo({ data: data });
    }

    const updateTheData = () => {
        // If the data in React got updated, for example:
        data = [
            {
                Category: "Accessories",
                Size: "262 oz",
                Color: "red",
                Destination: "Australia",
                "Business Type": "Specialty Bike Shop",
                Country: "Australia",
                Price: Math.floor(Math.random() * Math.floor(1000)),
                Quantity: 225,
                Discount: 23,
            },
            {
                Category: "Components",
                Size: "307 oz",
                Color: "white",
                Destination: "United Kingdom",
                "Business Type": "Warehouse",
                Country: "Canada",
                Price: Math.floor(Math.random() * Math.floor(1000)),
                Quantity: 8212,
                Discount: 55,
            },
        ];
        // then the data needs to be updated in Flexmonster as well
        // this can be done via Flexmonster's updateData() API call:
        pivotRef.current?.flexmonster.updateData({ data: data });
    }

    return (
        <>
            <h1 className="title-one page-title">Updating the data in Flexmonster</h1>

            <div className="description-blocks first-description-block">
                <p>
                    This demo shows how to refresh the data at runtime and keep the slice, options, and formatting the same.
                </p>
                <p>Try it yourself: configure the component as you wish and click the <strong>UPDATE DATA</strong> button.</p>
                <p>Learn more about updating the data
                    in <a href="https://www.flexmonster.com/api/updatedata/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">our documentation</a>.
                </p>
            </div>

            <button className="button-red" onClick={updateTheData}>Update data</button>

            <PivotWrap
                ref={pivotRef}
                toolbar={true}
                beforetoolbarcreated={toolbar => {
                    toolbar.showShareReportTab = true;
                }}
                shareReportConnection={{
                    url: "https://olap.flexmonster.com:9500"
                }}
                width="100%"
                height={400}
                ready={onReady}
            //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
            />
        </>
    );

}