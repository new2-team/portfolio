import React, { useState } from "react";
import S from "./style";
import Text from "../text/size";

const CheckboxWithLabel = ({ label, checked, onChange }) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(false);
  const isChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!isChecked);
  };

  return (
    <S.CheckboxWithLabelWrapper onClick={handleClick}>
      <img
        src={isChecked ? "/assets/icons/check-on.png" : "/assets/icons/check-off.png"}
        width={20}
        height={20}
        alt={isChecked ? "체크됨" : "체크안됨"}
      />
      <Text.Body3 ml="10" fontWeight="600">
        {label}
      </Text.Body3>
    </S.CheckboxWithLabelWrapper>
  );
};

export default CheckboxWithLabel;
