import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexCenter, flexColumn, flexColumnCenter, flexSpaceBetween } from "../../styles/common";
import Text from "../../components/text/size";

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




S.SocialLogin = styled.div`
  margin-top: 80px;
`;

S.TitleArea = styled.div`
  ${flexCenter};
  gap: 20px;
`;

S.TitleLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #acacac;
  flex: 1;
`;

S.IConArea = styled.div`
  ${flexCenter}
  margin-top: 20px;
  gap: 24px;
`;

S.Icon = styled.div`
  width: 44px; 
  height: 44px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

S.SocialTabWrapper = styled.div`
  ${flexColumnCenter};
  gap: 20px;
  width: 100%;
  padding-top: 80px;
`;

S.SocialLoginTabWrapper = styled.div`
  width: 100%;
  ${flexCenter};
  padding: 20px 0;
  border-radius: 10px;
  cursor: pointer;
  gap: 24px;
  background: ${({ color, theme }) =>
    color
      ? color === "kakao"
        ? theme.PALLETE.kakao
        : color === "naver"
        ? theme.PALLETE.naver
        : color
      : "#fff"};
`;

S.TabText = styled(Text.Body3)`
  color: ${({ color, theme }) => (color === "naver" ? "#fff" : color === "kakao" ? "#111" : theme.PALLETE.text.main)};
  font-weight: 600;
`;

S.NaverIcon = styled.div`
  width: 30px; 
  height: 30px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

S.KakaoIcon = styled.div`
  width: 30px; 
  height: 30px;

  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;







export default S;
