import React, { useState } from "react";
import { ReactComponent as RadioOnIcon } from "../icons/radio-on.svg";
import { ReactComponent as RadioOffIcon } from "../icons/radio-off.svg";
import S from "./style";

const Radio = ({ checked, onChange, size = "M", ...props }) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!isChecked);
  };

  const iconSize = getSize(size);

  return (
    <S.RadioWrapper onClick={handleClick} {...props}>
      {isChecked ? (
        <RadioOnIcon width={iconSize} height={iconSize} />
      ) : (
        <RadioOffIcon width={iconSize} height={iconSize} />
      )}
    </S.RadioWrapper>
  );
};

const getSize = (size) => {
  switch (size) {
    case "L":
      return 50;
    case "M":
      return 30;
    case "S":
      return 15;
    default:
      return 30;
  }
};

export default Radio;
