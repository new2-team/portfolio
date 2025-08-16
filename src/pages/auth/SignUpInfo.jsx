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
        
        try {
          // 2단계: 회원정보 입력 API 호출
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: datas.userId,
              password: datas.password,
              name: datas.name,
              phone: datas.phone,
              birthday: datas.birthday,
              email: datas.email ? `${datas.email}@${selectedEmailDomain === "직접입력" ? datas.customDomain : selectedEmailDomain}` : null
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || '회원정보 입력에 실패했습니다.');
          }

          const result = await response.json();
          console.log('회원정보 입력 성공:', result);

          // 사용자 이름을 localStorage에 저장
          localStorage.setItem('userName', datas.name);
          
          // 임시 사용자 정보를 localStorage에 저장 (프로필 등록 단계에서 사용)
          localStorage.setItem('tempUserData', JSON.stringify({
            userId: datas.userId,
            name: datas.name,
            phone: datas.phone,
            birthday: datas.birthday,
            email: datas.email ? `${datas.email}@${selectedEmailDomain === "직접입력" ? datas.customDomain : selectedEmailDomain}` : null
          }));
          
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
              {...register("userId", {
                required: true,
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,}$/,
                  message: "영문과 숫자를 포함한 6자리 이상으로 입력해주세요"
                }
              })}
            />
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
            이메일<RequiredSpan></RequiredSpan>
          </Text.Body2>
          <S.EmailWrapper>
            <BasicInput 
              type="text" 
              placeholder="이메일을 입력해주세요." 
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