import * as React from "react";
import * as FlexmonsterReact from 'react-flexmonster';
import 'flexmonster';
import 'flexmonster/flexmonster.css';
//You can use a different theme by specifying the corresponding path
//For example, to load the Green theme:
//import 'flexmonster/theme/green/flexmonster.css';

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
                "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' href='https://www.flexmonster.com/doc/customizing-toolbar/'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
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
                    How to <a target="_blank" className="title-link" rel="noopener noreferrer" href="https://www.flexmonster.com/doc/customizing-toolbar/">customize the Toolbar</a>
                    &nbsp;example
                </h3>

                <FlexmonsterReact.Pivot toolbar={true}
                    ref={this.pivotRef}
                    report="https://cdn.flexmonster.com/reports/report.json"
                    beforetoolbarcreated={this.customizeToolbar}
                    //licenseKey="XXXX-XXXX-XXXX-XXXX-XXXX"
                />
            </>
        );
    }
}