import React from "react";
import S from "./style";
import Text from "../../components/text/size";

const KakaoTab = () => {
  return (
    <S.SocialLoginTabWrapper color="#FAE100">
      <S.KakaoIcon>
          <img src="/assets/img/kakao-L.png" alt="kakao"/>
      </S.KakaoIcon>

      <Text.Body1>카카오톡 1초 로그인 / 회원가입</Text.Body1>
    </S.SocialLoginTabWrapper>
  )
};

export default KakaoTab;