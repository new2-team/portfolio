// SignIn.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/layout/Container';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import PasswordInput from '../../components/input/PasswordInput';
import CheckboxWithLabel from '../../components/checkbox/CheckboxWithLabel';
import S from './style';
import BasicButton from '../../components/button/BasicButton';

const helperLinks = [
    { label: "아이디 찾기", to: "/find-id" },
    { label: "비밀번호 찾기", to: "/find-password" },
];

const SignIn = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const isActive = id.trim() !== '' && pw.trim() !== '';

  return (
    <Container>
      <S.LoginWrapper>
          <Text.H4>로그인</Text.H4>
          <S.InputWrapper>
            <BasicInput
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <PasswordInput
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={e => setPw(e.target.value)}
            />
          </S.InputWrapper>

          <S.Options>
            <CheckboxWithLabel label="아이디 기억하기" />

            <S.LinkGroup>
              {helperLinks.map(({ label, to }) =>
                label === "비밀번호 찾기" ? (
                  <S.PasswordText key={to}>
                    <Text.Body3
                      as={Link}
                      to={to}
                      mr="16px"
                    >
                      {label}
                    </Text.Body3>
                  </S.PasswordText>
                ) : (
                  <Text.Body3
                    as={Link}
                    key={to}
                    to={to}
                    mr="16px"
                  >
                    {label}
                  </Text.Body3>
                )
              )}
            </S.LinkGroup>
          </S.Options>

          <S.ButtonWrapper>
            <BasicButton
              basicButton="large"
              variant="filled"
              disabled={!isActive}
            >
              로그인
            </BasicButton>
            <BasicButton basicButton="large" variant="default">
              회원가입
            </BasicButton>
          </S.ButtonWrapper>

          <div>
            
          </div>

      </S.LoginWrapper>
    </Container>
  );
};

export default SignIn;