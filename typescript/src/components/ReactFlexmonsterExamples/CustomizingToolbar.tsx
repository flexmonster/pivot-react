import * as React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';

export default class CustomizingToolbar extends React.Component<any, {}> {

    private pivotRef: React.RefObject<FlexmonsterReact.Pivot> = React.createRef<FlexmonsterReact.Pivot>();
    private flexmonster!: Flexmonster.Pivot;

    componentDidMount() {
        this.flexmonster = this.pivotRef.current!.flexmonster;
    }

    showInfo = () => {
        this.flexmonster.alert({
            title: "Customizing Flexmonster",
            message:
                "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' href='https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
            type: "info",
            blocking: false,
        });
    }

    customizeToolbar = (toolbar: Flexmonster.Toolbar) => {
        let tabs = toolbar.getTabs();
        toolbar.getTabs = () => {
            tabs = [];
            // add new tab
            tabs.push({
                id: "fm-tab-newtab",
                title: "New Tab",
                handler: () => this.showInfo(),
                icon: toolbar.icons.open,
            });
            return tabs;
        };
    }

    render() {
        return (
            <>
                <h3 className="page-title">
                    Customizing <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react">the Toolbar</a>
                </h3>

                <FlexmonsterReact.Pivot
                    ref={this.pivotRef}
                    toolbar={true}
                    width="100%"
                    height={600}
                    report="https://cdn.flexmonster.com/github/demo-report.json"
                    beforetoolbarcreated={this.customizeToolbar}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}