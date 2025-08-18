import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import S from "./style";
import Text from "../../components/text/size";
import BasicButton from "../../components/button/BasicButton";
import { Link } from "react-router-dom";

// 4단계: 회원가입 완료 페이지
const SignUpComplete = () => {
    const location = useLocation();
    
    // Redux에서 사용자 정보 가져오기 (우선순위)
    const currentUser = useSelector((state) => state.user.currentUser);
    // localStorage에서 사용자 이름 가져오기 (백업)
    const userNameFromStorage = localStorage.getItem('userName');
    
    // 소셜 로그인 여부 확인
    const isSocialLogin = location.state?.isSocialLogin || false;
    
    // 사용자 이름 결정 (Redux > localStorage > 기본값)
    const userName = currentUser?.name || userNameFromStorage || '사용자';

    return (
        <>
            <S.SignUpCompleteWrapper>
                <S.CompleteIcon>
                    <img src="/assets/icons/complete-check.svg" alt="회원가입 완료" />
                </S.CompleteIcon>

                <S.CompleteTitle> 
                    <Text.Body1>
                        {isSocialLogin 
                            ? `${userName}님의 소셜 로그인 회원가입이 완료되었습니다!`
                            : `${userName}님의 회원가입이 완료되었습니다!`
                        }
                    </Text.Body1>
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
