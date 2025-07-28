import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexCenter, flexColumn, flexColumnCenter, flexSpaceBetween } from "../../styles/common";
import Text from "../../components/text/size";

const S = {};

// =========================
// 로그인 페이지 스타일
// =========================
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

// =========================
// 약관동의(이용약관) 페이지 스타일
// =========================
S.AllAgreeWrapper = styled.div`
  ${flexCenter};
  justify-content: flex-end;
  margin-top: 200px;
`;

S.TermsWrapper = styled.div`
  ${flexColumn};
  gap: 60px 0;
`;

S.TermsBoxWrapper = styled.div`
  ${flexColumn};
  gap: 20px 0;
  margin-top: 67px;
`;

S.TermsBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 32px 40px;
  background: #fff;
  max-width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

S.TermsTextBox = styled.div`
  ${flexColumn};
  gap: 10px 0;
  ${spacingProps}
`;

S.TermsTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.PALLETE.primary.dark};
`;

S.TermsText = styled.p`
  font-size: 14px;
  color: #888;
`;

S.TermsListDemical = styled.ul`
  list-style: decimal;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
`;

S.TermsListDemicalItem = styled.li`
  font-size: 14px;
  color: #888;
`;

S.TermsList = styled.ul`
  list-style: disc;
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 16px 0;
`;

S.TermsListItem = styled.li`
  font-size: 14px;
  color: #888;
`;

S.CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0 20px;
`;

S.NoticeWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #F8F8F8;
  border-radius: 24px;
  padding: 48px 40px;
  margin-top: 100px;
`;

S.NoticeText = styled.div`
  ${flexColumn};
  margin-left: 40px;
`;

S.NoticeTextTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

S.TermsButtonWrapper = styled.div`
  ${flexCenter};
  margin-top: 200px;
  margin-bottom: 300px;
`;

// =========================
// 소셜 로그인/탭 스타일 (약관동의 1단계에서만 사용)
// =========================
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

S.RequiredText = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
  font-weight: 600;
`;

// =========================
// 회원정보 입력 페이지 스타일
// =========================
S.SignUpInfoWrapper = styled.div`
  ${flexColumn};
  gap: 40px 0;
  margin-top: 150px;
`;

S.SignUpInfoInputWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    min-width: 300px;
  }
`;

export default S;
