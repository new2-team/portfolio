// SignIn.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../../components/modules/user';
import Container from '../../components/layout/Container';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import PasswordInput from '../../components/input/PasswordInput';
import CheckboxWithLabel from '../../components/checkbox/CheckboxWithLabel';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import SocialLogin from './components/SocialLogin';
import { useInput } from '../../hooks/useInput';
import { useToggle } from '../../hooks/useToggle';

const helperLinks = [
    { label: "아이디 찾기", to: "/find-id" },
    { label: "비밀번호 찾기", to: "/find-password" },
];

const SignIn = () => {
  // useInput 훅으로 입력값 상태 관리
  const [id, onChangeId] = useInput('');
  const [pw, onChangePw] = useInput('');
  // useToggle 훅으로 체크박스 상태 관리
  const [rememberId, toggleRememberId] = useToggle(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 입력값이 모두 있을 때만 버튼 활성화
  const isActive = id.trim() !== '' && pw.trim() !== '';

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    try {
      // 로그인 API 호출
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: id,
          password: pw,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인에 실패했습니다.');
      }

      const result = await response.json();
      console.log('로그인 성공:', result);

      // 로그인 성공 시 리덕스에 사용자 정보와 로그인 상태 저장
      dispatch(setUser(result.user));
      dispatch(setUserStatus(true));
      
      // 아이디 기억하기 체크 시 localStorage 저장
      if (rememberId) {
        localStorage.setItem('rememberedId', id);
      } else {
        localStorage.removeItem('rememberedId');
      }
      
      // 메인 페이지로 이동
      navigate('/main');
    } catch (error) {
      console.error('로그인 오류:', error);
      alert(error.message);
    }
  };

  return (
    <Container>
      <S.LoginWrapper>
          <Text.H4>로그인</Text.H4>
          <S.InputWrapper>
            <BasicInput
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={onChangeId}
            />
            <PasswordInput
              placeholder="비밀번호를 입력하세요"
              value={pw}
              onChange={onChangePw}
            />
          </S.InputWrapper>

          <S.Options>
            {/* useToggle 훅으로 체크박스 상태 관리 */}
            <CheckboxWithLabel label="아이디 기억하기" checked={rememberId} onChange={toggleRememberId} />

            <S.LinkGroup>
              {/* 비밀번호 찾기 링크 */}
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
              onClick={isActive ? handleLogin : undefined} // 활성화 시에만 로그인 시도
            >
              로그인
            </BasicButton>
            <BasicButton basicButton="large" variant="default" as={Link} to="/sign-up">
              회원가입
            </BasicButton>
          </S.ButtonWrapper>

          <SocialLogin/> 

      </S.LoginWrapper>
    </Container>
  );
};

export default SignIn;