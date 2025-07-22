import React from "react";
import S from "./style";
import Text from "../../components/text/size";

const KakaoTab = () => {
  return (
    <S.SocialLoginTabWrapper color="kakao">
      <S.KakaoIcon>
          <img src="/assets/img/kakao-L.png" alt="kakao"/>
      </S.KakaoIcon>

      <S.TabText color="kakao">
        카카오톡 1초 로그인 / 회원가입
      </S.TabText>
    </S.SocialLoginTabWrapper>
  )
};

export default KakaoTab;