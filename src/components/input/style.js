import styled, { css, ThemeProvider } from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexColumn, flexRow } from "../../styles/common";

const S = {};

S.Input = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.PALLETE.background.white};
  border: 1px solid
    ${({ theme, status }) =>
      status === "error" ? theme.PALLETE.text.error : theme.PALLETE.text.sub2};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
  line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};
  padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["24"]}`};
  ${spacingProps}

  &:hover {
    ${({ readOnly }) =>
      !readOnly &&
      css`
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
      `}
  }

  //placeholder 텍스트 색상
  &::placeholder {
    color: ${({ theme }) => theme.PALLETE.text.disabled.weak};
  }

  //입력중일때
  &:focus {
    ${({ readOnly }) =>
      !readOnly &&
      css`
        outline: none;
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
      `}
  }

  //disabled 상태일때
  &:disabled {
    outline: none;
    background-color: ${({ theme }) => theme.PALLETE.background.gray100};
    border: none;
  }

  //입력 다 한 상태
  &:not(:focus):not(:placeholder-shown) {
    border-color: ${({ theme }) => theme.PALLETE.text.main};
  }
`;

S.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  ${spacingProps}
`;

S.ErrorMessage = styled.div`
  color: ${({ theme }) => theme.PALLETE.text.error};
  gap: 0 8px;
  ${flexRow}
  ${spacingProps}
`;

S.InputButtonWrapper = styled.div`
  position: relative;
  ${spacingProps}

  button {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  p {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  img {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

S.PasswordInputWrapper = styled.div`
  ${flexColumn}
`;

S.EyeOn = styled.img.attrs({
  src: "/assets/icons/eye-on.svg",
  alt: "비밀번호 보기"
})`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

S.EyeOff = styled.img.attrs({
  src: "/assets/icons/eye-off.svg",
  alt: "비밀번호 숨기기"
})`
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export default S;
