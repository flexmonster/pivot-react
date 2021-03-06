import React from "react";

export default class ToggleButton extends React.Component {

    constructor(props) {
        super(props);

        this.props = props;
        this.state = {
            isChecked: true
        };
        this.labelChecked = props.labelChecked;
        this.labelUnChecked = props.labelUnChecked;
        this.parentsComponentTriggerFunction = props.triggerFunction;
    }

    onToggleSwitchClicked = () => {
        const newState = !this.state.isChecked
        this.parentsComponentTriggerFunction(newState);
        this.setState({
            isChecked: newState
        });
    }

    render = () => {

        return (
            <div className="toggle-button noselect" id="id" onClick={this.onToggleSwitchClicked}>
                <input className="button-checkbox" id="labelOn" type="checkbox" checked={this.state.isChecked} readOnly/>
                <label className="button-checkbox-label">
                    <span className="on">{this.state.isChecked ? this.labelChecked: this.labelUnChecked}</span>
                </label>
            </div>
        );
    }

}