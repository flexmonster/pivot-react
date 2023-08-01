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
                "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' rel='noopener noreferrer' href='https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
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
                <h1 className="page-title">Customizing the Toolbar</h1>

                <div className="description-blocks first-description-block">
                    <p>You can add, remove, and update the Toolbar tabs.</p>
                    <p>In this demo, we’ve removed all the tabs and added a custom <strong>New Tab</strong>.
                        See our docs to learn more about the Toolbar and its 
                        customization: <a href="https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_react" target="_blank" rel="noopener noreferrer" className="title-link">Customizing the Toolbar</a>.
                    </p>
                </div>

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