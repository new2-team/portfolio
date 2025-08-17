import React from "react";
import S from "./style";
import Text from "../../components/text/size";
import BasicButton from "../../components/button/BasicButton";
import { Link } from "react-router-dom";

// 4단계: 회원가입 완료 페이지
const SignUpComplete = () => {
    // localStorage에서 사용자 이름 가져오기
    const userName = localStorage.getItem('userName') || '사용자';

    return (
        <>
            <S.SignUpCompleteWrapper>
                <S.CompleteIcon>
                    <img src="/assets/icons/complete-check.svg" alt="회원가입 완료" />
                </S.CompleteIcon>

                <S.CompleteTitle> 
                    <Text.Body1>{userName}님의 회원가입이 완료되었습니다!</Text.Body1>
                </S.CompleteTitle>

            <S.CompleteButtonWrapper>

            <Link to="/dbti-question">
                <BasicButton basicButton="medium" variant="filled">
                    MBTI 검사
                </BasicButton>
            </Link>

            <Link to="/main">
              <BasicButton basicButton="medium" variant="default">
                홈으로 이동
              </BasicButton>
            </Link>
            </S.CompleteButtonWrapper>
            
            </S.SignUpCompleteWrapper>  
        </>
    );
};

export default SignUpComplete;
