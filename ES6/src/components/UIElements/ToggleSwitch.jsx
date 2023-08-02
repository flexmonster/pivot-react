import React, { useState } from 'react';

function ToggleSwitch(props) {
  const [isChecked, setIsChecked] = useState(true);

  const onToggleSwitchClicked = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    props.triggerFunction(newState);
  };

  return (
    <div className="toggle-switch noselect" id={props.id} onClick={onToggleSwitchClicked}>
      <input className="button-checkbox" id={props.labelChecked} type="checkbox" checked={isChecked} readOnly />
      <label className="button-checkbox-label">
        <span className="on">{!isChecked ? props.labelUnChecked : props.labelChecked}</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
