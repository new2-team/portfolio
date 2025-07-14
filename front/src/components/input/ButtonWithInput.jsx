// components/input/ButtonWithInput.jsx
import React from "react";
import S from "./style";
import BasicInput from "./BasicInput";
import BasicButton from "../button/BasicButton";

const ButtonWithInput = ({
  status = "default",
  placeholder = "",
  buttonText = "",
  onClick,
  variant = "default",
  value,
  onChange,
  ...rest
}) => {
  return (
    <S.InputButtonWrapper>
      <BasicInput
        status={status}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <BasicButton roundButton="superSmall" variant={variant} onClick={onClick}>
        {buttonText}
      </BasicButton>
    </S.InputButtonWrapper>
  );
};

export default ButtonWithInput;
