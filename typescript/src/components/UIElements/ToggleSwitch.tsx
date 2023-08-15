import React from "react";

type ToggleSwitchProps = {
  triggerFunction: (isChecked: boolean) => void;
  labelChecked: string;
  labelUnChecked: string;
  id: string
};

const ToggleSwitch: React.FC<ToggleSwitchProps> = (props) => {
  const { triggerFunction, labelChecked, labelUnChecked, id } = props;
  const [isChecked, setIsChecked] = React.useState(true);

  const handleToggleSwitchClicked = () => {
    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);
    triggerFunction(newIsChecked);
  };

  return (
    <div className="toggle-switch noselect" id={id} onClick={handleToggleSwitchClicked}>
      <input className="button-checkbox" id={labelChecked} type="checkbox" checked={isChecked} readOnly />
      <label className="button-checkbox-label">
        <span className="on">{!isChecked ? labelUnChecked : labelChecked}</span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
