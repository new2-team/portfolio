import React from "react";
import S from "./style";
import Text from "../../components/text/size";

const NaverTab = () => {
  return (
    <S.SocialLoginTabWrapper color="naver">
      <S.NaverIcon>
        <img src="/assets/img/naver-L.png" alt="naver"/>
      </S.NaverIcon>
      <S.TabText color="naver">
        네이버 1초 로그인 / 회원가입
      </S.TabText>
    </S.SocialLoginTabWrapper>
  )
};

export default NaverTab;