import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexColumn, flexSpaceBetween } from "../../styles/common";

const S = {};

S.LoginWrapper = styled.div`
  width: 600px;
  margin: auto;
  padding: 150px 0;
  ${spacingProps}

  h4{
    text-align: center;
    color: ${({ theme }) => theme.PALLETE.primary.main};
    font-weight: 600;
  }
`;

S.InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0;
  margin-top: 40px;
`;

S.Options = styled.div`
  ${flexSpaceBetween}
  margin-top: 16px;
`;

S.LinkGroup = styled.div`
  display: flex;
`;

S.ButtonWrapper = styled.div`
  ${flexColumn};
  gap: 16px 0;
  margin-top: 32px
`;

S.PasswordText = styled.div`
  padding-left: 8px;
  margin-left: 8px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 14px;
    background-color: #acacac;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default S;
