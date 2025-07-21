import React from "react";
import S from "./style";
import Text from "../../components/text/size";

const NaverTab = () => {
  return (
    <S.SocialLoginTabWrapper color="#03C75A">
      <S.NaverIcon>
          <img src="/assets/img/naver-L.png" alt="naver"/>
      </S.NaverIcon>

      <Text.Body1>네이버 1초 로그인 / 회원가입</Text.Body1>
    </S.SocialLoginTabWrapper>
  )
};

export default NaverTab;