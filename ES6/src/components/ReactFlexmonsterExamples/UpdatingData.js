import React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';

export default class UpdatingData extends React.Component {

    data = [
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

    onReady = () => {
        // Connect Flexmonster to the data
        this.refs.pivot.flexmonster.connectTo({ data: this.data });
    }

    updateTheData = () => {
        // If the data in React got updated, for example:
        this.data = [
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
        this.refs.pivot.flexmonster.updateData({ data: this.data });
    }

    render() {
        return (
            <>
                <h3 className="title-one page-title">
                    <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/api/updatedata/?r=rm_react">Updating the data</a> in Flexmonster
                </h3>

                <button className="button-red" onClick={this.updateTheData}>Update data</button>
                <FlexmonsterReact.Pivot
                    ref="pivot"
                    toolbar={true}
                    beforetoolbarcreated={toolbar => {
                        toolbar.showShareReportTab = true;
                    }}
                    shareReportConnection={{
                        url: "https://olap.flexmonster.com:9500"
                    }}
                    width="100%"
                    height={600}
                    ready={this.onReady}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}
