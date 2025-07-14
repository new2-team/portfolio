import React, { useState } from "react";
import S from "./style";
import { ReactComponent as ErrorIcon } from "../icons/error-red.svg";
import BasicInput from "./BasicInput";
import Text from "../text/size";

const PasswordInput = (props) => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => setVisible((prev) => !prev);

  return (
    <S.PasswordInputWrapper>
      <S.InputButtonWrapper>
        <BasicInput
          type={visible ? "text" : "password"}
          placeholder="비밀번호를 입력하세요"
          {...props}
        />
        {visible ? (
          <S.EyeOn onClick={toggleVisible} />
        ) : (
          <S.EyeOff onClick={toggleVisible} />
        )}
      </S.InputButtonWrapper>

      {/*<S.ErrorMessage mt="8">
                <ErrorIcon width={16} height={16} />
                <Text.Caption3>영대/소문 , 한글 , 숫자 2가지 이상 조합 8자 이상으로 변경해주세요.</Text.Caption3>
            </S.ErrorMessage>*/}
    </S.PasswordInputWrapper>
  );
};

export default PasswordInput;
