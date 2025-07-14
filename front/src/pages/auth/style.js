import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import {flexCenter, flexColumn, flexSpaceBetween} from "../../styles/common";

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
  ${spacingProps}
`;

S.Options = styled.div`
  ${flexSpaceBetween};
  ${spacingProps}
`;

S.LinkGroup = styled.div`
  display: flex;
  ${spacingProps}
`;

S.ButtonWrapper = styled.div`
  ${flexColumn};
  gap: 16px 0;
  ${spacingProps}
`;

S.PasswordText = styled.div`
  position: relative;
  ${spacingProps}

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

S.SocialLogin = styled.div`
  ${spacingProps}
`;


S.TitleArea = styled.div`
  width: 100%;
  ${flexCenter};
  ${spacingProps}
  
  p {
    padding: 0 18px;
    color: ${({ theme }) => theme.PALLETE.text.sub};
  }
`;

S.TitleLine = styled.div`
  width: 100%;
  height: 2px;
  background-color: #999;
  flex: 1;
  ${spacingProps}
`;

S.IConArea = styled.div`
  ${flexCenter};
  ${spacingProps};
  gap: 0 24px;
`;

S.Icon = styled.a`
  width: 45px;
  height: 45px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

export default S;
