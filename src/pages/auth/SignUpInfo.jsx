import React from "react";
import styled, { useTheme } from "styled-components";
import Container from "../../components/layout/Container";
import Text from "../../components/text/size";
import ButtonWithInput from "../../components/input/ButtonWithInput";
import PasswordInput from "../../components/input/PasswordInput";
import S from "./style";
import BasicInput from "../../components/input/BasicInput";

// 필수 표시용 스타일드 span
const RequiredSpan = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

// 2단계: 회원정보 입력 페이지
const SignUpInfo = () => 
    <Container>
        <S.SignUpInfoWrapper>
            <S.SignUpInfoInputWrapper>
                <Text.Body2 fontWeight="600">
                아이디 <RequiredSpan>*</RequiredSpan>
                </Text.Body2>
                <ButtonWithInput
                placeholder="아이디를 입력해주세요."
                buttonText="중복확인"
                variant="default"
            />
            </S.SignUpInfoInputWrapper>

            <S.SignUpInfoInputWrapper>
                <Text.Body2 fontWeight="600">
                비밀번호 <RequiredSpan>*</RequiredSpan>
                </Text.Body2>
                <PasswordInput />
            </S.SignUpInfoInputWrapper>

            <S.SignUpInfoInputWrapper>
                <Text.Body2 fontWeight="600">
                비밀번호 확인<RequiredSpan>*</RequiredSpan>
                </Text.Body2>
                <PasswordInput />
            </S.SignUpInfoInputWrapper>

            <S.SignUpInfoInputWrapper>
                <Text.Body2 fontWeight="600">
                이름<RequiredSpan>*</RequiredSpan>
                </Text.Body2>
                <BasicInput type="text" placeholder="이름을 입력해주세요." />
            </S.SignUpInfoInputWrapper>

            <S.SignUpInfoInputWrapper>
                <Text.Body2 fontWeight="600">
                휴대폰 번호<RequiredSpan>*</RequiredSpan>
                </Text.Body2>
                <BasicInput type="text" placeholder="휴대폰 번호를 입력해주세요." />
            </S.SignUpInfoInputWrapper>

            <S.SignUpInfoInputWrapper>
                <Text.Body2 fontWeight="600">
                생년월일<RequiredSpan>*</RequiredSpan>
                </Text.Body2>
                <S.InputButtonWrapper>
                    <BasicInput type="text" placeholder="" />
                    <img src="/assets/icons/calendar.svg" width={30} height={30} alt="캘린더" />
                </S.InputButtonWrapper>₩
            </S.SignUpInfoInputWrapper>
        </S.SignUpInfoWrapper>
       
    </Container>
    ;

export default SignUpInfo; 