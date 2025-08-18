import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../../components/modules/user';
import S from './style';
import BasicButton from '../../components/button/BasicButton';
import Text from "../../components/text/size";
import BasicInput from "../../components/input/BasicInput";
import PasswordInput from "../../components/input/PasswordInput";
import ButtonWithInput from "../../components/input/ButtonWithInput";
import SelectBox from "../../components/selectBox/SelectBox";

// 필수 표시용 스타일드 span
const RequiredSpan = styled.span`
  color: ${({ theme }) => theme.PALLETE.primary.main};
`;

const SignUpInfo = () => {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [selectedEmailDomain, setSelectedEmailDomain] = useState('');
  const [showCustomDomain, setShowCustomDomain] = useState(false);
  const [isUserIdChecked, setIsUserIdChecked] = useState(false); // 중복확인 상태
  const [userIdCheckMessage, setUserIdCheckMessage] = useState(''); // 중복확인 메시지
  
  const {
    register, handleSubmit, getValues, watch, setValue, formState: {isSubmitting, isSubmitted, errors, isValid }
  } = useForm({ mode: "onChange" })

  // 모든 필수 필드의 값 감시
  const userId = watch("userId");
  const password = watch("password");
  const passwordConfirm = watch("passwordConfirm");
  const name = watch("name");
  const phone = watch("phone");
  const birthday = watch("birthday");

  // 년도, 월, 일 옵션 생성
  const years = Array.from({ length: 100 }, (_, i) => 2024 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);



  // 중복확인 함수
  const handleUserIdCheck = async (e) => {
    console.log('중복확인 버튼 클릭됨!'); // 디버깅 로그 추가
    e.preventDefault(); // 폼 제출 방지
    e.stopPropagation(); // 이벤트 전파 방지
    
    const currentUserId = watch("userId");
    console.log('현재 입력된 아이디:', currentUserId); // 디버깅 로그 추가
    
    if (!currentUserId) {
      setUserIdCheckMessage('아이디를 먼저 입력해주세요.');
      setIsUserIdChecked(false);
      return;
    }
    
    // 아이디 형식 검증
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/;
    if (!userIdRegex.test(currentUserId)) {
      setUserIdCheckMessage('영문과 숫자를 포함한 6자리 이상으로 입력해주세요.');
      setIsUserIdChecked(false);
      return;
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/check-userid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: currentUserId
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setUserIdCheckMessage('사용 가능한 아이디입니다.');
        setIsUserIdChecked(true);
      } else {
        setUserIdCheckMessage(result.message || '이미 사용 중인 아이디입니다.');
        setIsUserIdChecked(false);
      }
    } catch (error) {
      console.error('중복확인 오류:', error);
      setUserIdCheckMessage('중복확인 중 오류가 발생했습니다.');
      setIsUserIdChecked(false);
    }
  };

  // 이메일 도메인 선택 핸들러
  const handleEmailDomainSelect = (domain) => {
    setSelectedEmailDomain(domain);
    if (domain === "직접입력") {
      setShowCustomDomain(true);
    } else {
      setShowCustomDomain(false);
      // 선택된 도메인을 폼에 설정
      const emailValue = watch("email");
      if (emailValue) {
        setValue("email", `${emailValue}@${domain}`);
      }
    }
  };

  // 모든 필수 필드가 입력되었는지 확인
  const isAllRequiredFilled = 
    userId && 
    password && 
    passwordConfirm && 
    name && 
    phone && 
    birthday &&
    !errors.userId &&
    !errors.password &&
    !errors.passwordConfirm &&
    !errors.name &&
    !errors.phone &&
    !errors.birthday;

  // 디버깅용 로그
  console.log('Form validation:', {
    userId, password, passwordConfirm, name, phone, birthday,
    errors: Object.keys(errors),
    isAllRequiredFilled
  });

  // 비밀번호 유효성 검사 (대소문자, 숫자, 특수문자 포함 8자 이상)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 생년월일 상태 변경 감지
  useEffect(() => {
    if (birthYear && birthMonth && birthDay) {
      const formattedBirthday = `${birthYear}-${birthMonth.toString().padStart(2, '0')}-${birthDay.toString().padStart(2, '0')}`;
      setValue("birthday", formattedBirthday);
      console.log('Birthday updated via useEffect:', formattedBirthday);
    }
  }, [birthYear, birthMonth, birthDay, setValue]);

  return (

      <form onSubmit={handleSubmit(async (datas) => {
        console.log('폼 데이터:', datas);
        
        // 중복확인 완료 여부 확인
        if (!isUserIdChecked) {
          alert('아이디 중복확인을 완료해주세요.');
          return;
        }
        
        try {
          // 디버깅: 전송할 데이터 확인
          const requestData = {
            user_id: datas.userId,
            password: datas.password,
            name: datas.name,
            tel: datas.phone,
            birth: datas.birthday,
            email: datas.email ? `${datas.email}@${selectedEmailDomain === "직접입력" ? datas.customDomain : selectedEmailDomain}` : null
          };
          console.log('전송할 데이터:', requestData);
          console.log('환경변수 URL:', process.env.REACT_APP_BACKEND_URL);
          
          // 1단계: 기본 회원가입 (임시 데이터만 반환, DB 저장 안함)
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '회원가입 중 오류가 발생했습니다.');
          }

          const result = await response.json();
          console.log('기본 정보 입력 성공:', result);

          // 임시 데이터를 localStorage에 저장 (DB 저장 안됨)
          localStorage.setItem('tempUserData', JSON.stringify(result.tempData));
          
          // 다음 단계로 이동 (프로필 등록)
          navigate('/sign-up/profile');
        } catch (error) {
          console.error('회원정보 입력 오류:', error);
          alert(error.message);
        }
      })}>
        
        <S.SignUpInfoWrapper>

        {/*아이디*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            아이디 <RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <ButtonWithInput
              placeholder="아이디를 입력해주세요."
              buttonText="중복확인"
              variant="default"
              onButtonClick={handleUserIdCheck}
              {...register("userId", {
                required: true,
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/,
                  message: "영문과 숫자를 포함한 6자리 이상으로 입력해주세요"
                },
                onChange: (e) => {
                  // 아이디가 변경되면 중복확인 상태 초기화
                  setIsUserIdChecked(false);
                  setUserIdCheckMessage('');
                }
              })}
            />
            {userIdCheckMessage && (
              <S.ConfirmMessage style={{ 
                color: isUserIdChecked ? '#4CAF50' : '#f44336',
                marginTop: '8px'
              }}>
                {userIdCheckMessage}
              </S.ConfirmMessage>
            )}
            {errors && errors?.userId?.type === "required" && (
              <S.ConfirmMessage>아이디를 입력해주세요</S.ConfirmMessage>
            )}
            {errors && errors?.userId?.type === "pattern" && (
              <S.ConfirmMessage>영문과 숫자를 포함한 6자리 이상으로 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*비밀번호*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            비밀번호 <RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <PasswordInput 
              placeholder="비밀번호를 입력해주세요."
              {...register("password", {
                required: true,
                pattern: {
                  value: passwordRegex
                }
              })}
            />
            {errors && errors?.password?.type === "required" && (
              <S.ConfirmMessage>비밀번호를 입력해주세요</S.ConfirmMessage>
            )}
            {errors && errors?.password?.type === "pattern" && (
              <S.ConfirmMessage>대소문자, 숫자, 특수문자를 포함한 8자 이상으로 입력해주세요.</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*비밀번호 확인*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            비밀번호 확인<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <PasswordInput 
              placeholder="비밀번호를 다시 입력해주세요."
              {...register("passwordConfirm", {
                required: true,
                validate: {
                  matchPassword: (passwordConfirm) => {
                    const { password } = getValues();
                    return password === passwordConfirm
                  }
                }
              })}
            />
            {errors && errors?.passwordConfirm && (
              <S.ConfirmMessage>비밀번호가 일치하지 않습니다.</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*이름*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            이름<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <BasicInput 
              type="text" 
              placeholder="이름을 입력해주세요." 
              {...register("name", {
                required: true
              })}
            />
            {errors && errors?.name?.type === "required" && (
              <S.ConfirmMessage>이름을 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*휴대폰 번호*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            휴대폰 번호<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <BasicInput 
              type="text" 
              placeholder="휴대폰 번호를 입력해주세요." 
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "하이픈(-)을 제외한 숫자만 입력해주세요"
                }
              })}
            />
            {errors && errors?.phone?.type === "required" && (
              <S.ConfirmMessage>휴대폰 번호를 입력해주세요</S.ConfirmMessage>
            )}
            {errors && errors?.phone?.type === "pattern" && (
              <S.ConfirmMessage>하이픈(-)을 제외한 숫자만 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*생년월일*/}
        <S.SignUpInfoInputWrapper>
          <Text.Body2 fontWeight="600">
            생년월일<RequiredSpan>*</RequiredSpan>
          </Text.Body2>
          <S.InputErrorWrapper>
            <S.BirthdayWrapper>
              <SelectBox
                options={years.map(year => year.toString())}
                placeholder="년도"
                onSelect={(value) => {
                  console.log('Year selected:', value);
                  setBirthYear(value);
                }}
              />
              <SelectBox
                options={months.map(month => month.toString())}
                placeholder="월"
                onSelect={(value) => {
                  console.log('Month selected:', value);
                  setBirthMonth(value);
                }}
              />
              <SelectBox
                options={days.map(day => day.toString())}
                placeholder="일"
                onSelect={(value) => {
                  console.log('Day selected:', value);
                  setBirthDay(value);
                }}
              />
            </S.BirthdayWrapper>
            <input 
              type="hidden" 
              {...register("birthday", { required: true })}
            />
            {errors && errors?.birthday?.type === "required" && (
              <S.ConfirmMessage>생년월일을 입력해주세요</S.ConfirmMessage>
            )}
          </S.InputErrorWrapper>
        </S.SignUpInfoInputWrapper>

        {/*이메일*/}
        <S.SignUpInfoInputWrapper>
                      <Text.Body2 fontWeight="600">
            이메일
          </Text.Body2>
          <S.EmailWrapper>
            <BasicInput 
              type="text" 
              placeholder="이메일을 입력해주세요. (선택사항)" 
              {...register("email")}
            />
            <Text.Button2>@</Text.Button2>    
            <SelectBox
              options={["gmail.com", "naver.com", "daum.net", "nate.com" , "직접입력"]}
              placeholder="선택하세요."
              onSelect={handleEmailDomainSelect}
            />
            {showCustomDomain && (
              <BasicInput 
                type="text" 
                placeholder="도메인을 입력해주세요." 
                {...register("customDomain")}
              />
            )}
          </S.EmailWrapper>
        </S.SignUpInfoInputWrapper>

        <S.ConfirmButtonWrapper>
          <BasicButton 
            variant={isAllRequiredFilled ? "filled" : "disabled"} 
            basicButton="medium" 
            size="large"
            disabled={!isAllRequiredFilled || isSubmitting}
            type="submit"
          >
            확인
          </BasicButton>
        </S.ConfirmButtonWrapper>
        </S.SignUpInfoWrapper>
      </form>
  );
};

export default SignUpInfo; 