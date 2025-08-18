import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserStatus } from "../../components/modules/user";
import BasicButton from "../../components/button/BasicButton";
import Text from "../../components/text/size";
import BasicInput from "../../components/input/BasicInput";
import S from "../../components/input/style";
import ErrorInput from "../../components/input/ErrorInput";
import PasswordInput from "../../components/input/PasswordInput";
import ButtonWithInput from "../../components/input/ButtonWithInput";
import Checkbox from "../../components/checkbox/Checkbox";
import CheckboxWithLabel from "../../components/checkbox/CheckboxWithLabel";
import RadioWithLabel from "../../components/radio/RadioWithLabel";
import Radio from "../../components/radio/Radio";
import SelectBox from "../../components/selectBox/SelectBox";
import Accordion from "../../components/accordion/Accordion";
import Container from "../../components/layout/Container";
import MiniFooter from "../../components/layout/footer/MiniFooter";
import RadioGroupExample from "../../components/radio/RadioGroupExample";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // 소셜 로그인 처리
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get('accessToken');
    
    if (accessToken) {
      // URL에서 accessToken 제거
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
      
      // 토큰 저장
      localStorage.setItem('jwt_token', accessToken);
      
      // 토큰으로 사용자 정보 가져오기
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log('소셜 로그인 응답 데이터:', responseData);
            
            const { user, isNewUser, message } = responseData;
            
            // 사용자 정보 저장
            dispatch(setUser(user));
            dispatch(setUserStatus(true));
            
            console.log('사용자 정보:', user);
            console.log('신규 회원 여부:', isNewUser);
            console.log('메시지:', message);
            
            // 신규 회원이거나 프로필이 없으면 프로필 등록 페이지로 이동
            if (isNewUser || !user.dogProfile) {
              console.log('신규 회원 또는 프로필 없음 - 프로필 등록 페이지로 이동');
              navigate('/profile/add');
            } else {
              // 기존 회원이고 프로필이 있으면 메인 페이지 유지
              console.log('기존 회원 - 메인 페이지 유지');
            }
          } else {
            console.error('토큰 검증 실패');
            localStorage.removeItem('jwt_token');
            dispatch(setUserStatus(false));
          }
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error);
          localStorage.removeItem('jwt_token');
          dispatch(setUserStatus(false));
        }
      };

      fetchUserInfo();
    }
  }, [location, navigate, dispatch]);

  return (
    <Container>
      <section>
        <Text.H1 fontWeight={600} mt="100" p={100} color={"blue"}>
          안녕하세요!!
        </Text.H1>
        <Text.Caption2 mt="50" fontWeight={900} color={"orange"}>
          헬로
        </Text.Caption2>

        <BasicButton basicButton="superSmall" variant="gray">
          텍스트
          <img src="/assets/icons/arrow-right.svg" width={30} height={30} alt="오른쪽" />
        </BasicButton>

        <BasicButton roundButton="medium" variant="filled">
          더보기
        </BasicButton>

        <Text.Body2 color={"red"}>정지우입니다</Text.Body2>

        {/*인풋 감싸는 전체 영역*/}
        <S.InputWrapper mt="30" mb="30">
          {/*기본 인춧*/}
          <BasicInput type="text" placeholder="아이디를 입력하세요" />
          {/*비밀번호 전용 인풋*/}
          <PasswordInput />
          {/*인풋 + 버튼*/}
          <ButtonWithInput
            placeholder="아이디를 입력하세요"
            buttonText="중복확인"
            variant="default"
          />

          {/*인풋 + 버튼*/}
          <ButtonWithInput
            placeholder="아이디를 입력하세요"
            buttonText="사용가능"
            variant="filled"
          />

          {/*인풋  + 캘린더 아이콘*/}
          <S.InputButtonWrapper>
            <BasicInput type="text" placeholder="" />
            <img src="/assets/icons/calendar.svg" width={30} height={30} alt="캘린더" />
          </S.InputButtonWrapper>

          {/*인풋 + 아래로 향하는 화살표*/}
          <S.InputButtonWrapper>
            <BasicInput type="text" placeholder="" />
            <img src="/assets/icons/arrow-down.svg" width={30} height={30} alt="아래" />
          </S.InputButtonWrapper>

          {/*인풋 + 검색 아이콘*/}
          <S.InputButtonWrapper>
            <BasicInput type="text" placeholder="" />
            <img src="/assets/icons/search.svg" width={30} height={30} alt="검색" />
          </S.InputButtonWrapper>

          {/*인풋 + 닫기 아이콘*/}
          <S.InputButtonWrapper>
            <BasicInput type="text" placeholder="" />
            <img src="/assets/icons/close.svg" width={30} height={30} alt="닫기" />
          </S.InputButtonWrapper>

          {/*인풋 + 위로 향하는 화살표 아이콘*/}
          <S.InputButtonWrapper>
            <BasicInput type="text" placeholder="" />
            <img src="/assets/icons/arrow-up.svg" width={30} height={30} alt="위" />
          </S.InputButtonWrapper>

          {/*인풋 + 텍스트*/}
          <S.InputButtonWrapper>
            <BasicInput type="text" placeholder="" />
            <Text.Body3>kg</Text.Body3>
          </S.InputButtonWrapper>

          <ErrorInput
            type="text"
            placeholder="비밀번호를 입력해주세요."
            mt="30"
          />

          {/*셀렉박스*/}
          <SelectBox
            options={["정지우", "이민주", "박희진", "김유진"]}
            placeholder="선택하세요."
            onSelect={(v) => console.log("선택된 값:", v)}
          />
        </S.InputWrapper>

        {/*기본 체크박스*/}
        <Checkbox />

        {/*체크박스 + 텍스트*/}
        <CheckboxWithLabel label="ddfdf" />

        {/*라디오버튼 + 텍스트*/}
        <RadioWithLabel size="L" label="Text 1" mt="30" />
        <RadioWithLabel size="L" label="Text 2" />
        <RadioWithLabel size="M" label="Text 3" />
        <RadioWithLabel size="S" label="Text 4" />

        {/*기본 라디오 버튼*/}
        <Radio size="M" mt="20" />

        {/*아코디언*/}
        <div>
          <Accordion
            question="Q. 환불은 어떻게 하나요?"
            answer="A. 마이페이지 > 결제내역에서 환불 요청이 가능합니다."
          />

          <Accordion
            question="Q. 위치는 어디에요?"
            answer="A. 주소 내역에서 보실 수 있습니다."
          />

          <Accordion
            question="Q. 강아지는 몇명까지 등록 가능해요?"
            answer="A. 총 1마리만 등록 가능합니다."
          />
        </div>
      </section>
      <MiniFooter></MiniFooter>


<RadioGroupExample/>
    </Container>



 
  );
};

export default Main;
