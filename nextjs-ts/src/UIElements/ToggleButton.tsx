import React, { useState } from "react";

interface ToggleButtonProps {
    labelChecked: string;
    labelUnChecked: string;
    id: string;
    triggerFunction: (state: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
    const { labelChecked, labelUnChecked, triggerFunction, id } = props;
    const [isChecked, setIsChecked] = useState<boolean>(true);

    const onToggleSwitchClicked = () => {
        const newState = !isChecked;
        triggerFunction(newState);
        setIsChecked(newState);
    };

    return (
        <div className="toggle-button noselect" id={id} onClick={onToggleSwitchClicked}>
            <input className="button-checkbox" id={labelChecked} type="checkbox" checked={isChecked} readOnly />
            <label className="button-checkbox-label">
                <span className="on">{isChecked ? labelChecked : labelUnChecked}</span>
            </label>
        </div>
    );
};

export default ToggleButton;