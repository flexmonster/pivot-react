import React from "react";

interface IProps {
    labelChecked: string;
    labelUnChecked: string;
    triggerFunction: (state: boolean) => void;
}

interface IState {
    isChecked: boolean;
}

export default class ToggleButton extends React.Component<IProps, IState> {

    labelChecked: string;
    labelUnChecked: string;

    constructor(props: IProps) {
        super(props);

        this.state = {
            isChecked: true
        };
        this.labelChecked = props.labelChecked;
        this.labelUnChecked = props.labelUnChecked;
        this.parentsComponentTriggerFunction = props.triggerFunction;
    }

    parentsComponentTriggerFunction: (state: boolean) => void;

    onToggleSwitchClicked = () => {
        const newState = !this.state.isChecked
        this.parentsComponentTriggerFunction(newState);
        this.setState({
            isChecked: newState
        });
    }

    render = () => {

        return (
            <div className="toggle-switch noselect" id="id" onClick={this.onToggleSwitchClicked}>
                <input className="button-checkbox" id="labelOn" type="checkbox" checked={this.state.isChecked} readOnly/>
                <label className="button-checkbox-label">
                    <span className="on">{!this.state.isChecked ? this.labelUnChecked : this.labelChecked}</span>
                </label>
            </div>
        );
    }

}