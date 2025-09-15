import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../../modules/user';
import dayjs from 'dayjs';
import Checkbox from '../../components/checkbox/Checkbox';
import BasicButton from '../../components/button/BasicButton';
import BasicInput from '../../components/input/BasicInput';
import Text from '../../components/text/size';
import S from './style';
import DatePickerSingle from './DatePickerSingle';

// 증상 타이틀 변환 함수
const getSymptomTitle = (id) => {
    switch(id) {
        case 1: return "가려움증";
        case 2: return "피부 발진";
        case 3: return "소화불량";
        case 4: return "눈 충혈";
        case 5: return "귀 염증";
        default: return "";
    }
};

const AddHealthProfile = () => {
    const { register, formState: {isSubmitting, errors} , control, setValue, getValues } = useForm({ mode: "onChange" });

    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [vaccination, setVaccination] = useState(['DHPP']); 
    const [selectedSymptoms, setSelectedSymptoms] = useState([]); // 빈 배열로 시작 (기본값 없음)
    const [selectedFavorites, setSelectedFavorites] = useState([1]); // 좋아하는 것들 다중선택 (기본값: 1번 선택)
    const [selectedCautions, setSelectedCautions] = useState([1]); // 주의사항 다중선택 (기본값: 1번 선택)

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isEditMode = location.state?.mode === 'edit';
    const userData = location.state?.userData || {};

    const [form, setForm] = useState({
        vaccine : isEditMode ? userData.vaccine || ['DHPP'] : ['DHPP'], // 기본값 설정
        hospital : isEditMode ? userData.hospital || '' : '',
        visit : isEditMode ? userData.visit || '' : '',
        lastDay : isEditMode ? userData.lastDay || '' : '',
        Cause : isEditMode ? userData.Cause || '' : '',
        Symptom : isEditMode ? userData.Symptom || '' : '',
        favorites : isEditMode ? userData.favorites || [1] : [1], // 기본값: 1번 선택
        cautions : isEditMode ? userData.cautions || [1] : [1], // 기본값: 1번 선택
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // 초기값 설정
    useEffect(() => {
        if (!isEditMode) {
            // 신규 등록 시 기본값 설정
            setForm(prev => ({
                ...prev,
                vaccine: ['DHPP'],
                favorites: [1],
                cautions: [1]
            }));
            // vaccination 상태도 동기화
            setVaccination(['DHPP']);
            setSelectedFavorites([1]);
            setSelectedCautions([1]);
        }
    }, [isEditMode]);

    const validateAllFields = (formData) => {
        const errors = {};

        // 검증할 필드 목록
        const fieldChecks = [
            { key: "vaccine",  value: formData.vaccine || form.vaccine || vaccination, message: "예방 접종 이력을 선택해주세요." },
            { key: "hospital",  value: formData.hospital || form.hospital, message: "병원이름을 입력해주세요" },
            { key: "visit", value: formData.visit || form.visit, message: "병원 방문 주기를 입력해주세요" },
            { key: "lastDay", value: formData.lastDay || form.lastDay, message: "마지막 방문일을 선택해주세요" },

        ];

        // 반복 처리 (빈 값이면 에러 추가)
        fieldChecks.forEach(({ key, value, message }) => {
            const isEmpty = value === undefined || value === null || 
                           (typeof value === "string" && value.trim() === "") ||
                           (Array.isArray(value) && value.length === 0); // 배열이 비어있는 경우도 체크
            if (isEmpty) {
                errors[key] = message;
            }
        });

        console.log("병원이력 검증 중인 데이터:", { formData, form, vaccination, errors }); // 디버깅용
        return errors;
    };

    // 에러 메시지 컴포넌트
    const ErrorMessage = ({ show, message }) => {
        if (!show) return null;
        return (
            <div style={{ textAlign: "center" }}>
                <span style={{ color: "#f74c26" }}>{message}</span>
            </div>
        );
    };

    const toggleVaccination = (type) => {
        setVaccination((prev) => {
            const isSelected = prev.includes(type);
        
            let newVaccination;
            if (type === "none") {
                newVaccination = isSelected ? [] : ["none"];
            } else {
                const withoutNone = prev.filter((v) => v !== "none");
                if (isSelected) {
                    newVaccination = withoutNone.filter((v) => v !== type);
                } else {
                    newVaccination = [...withoutNone, type];
                }
            }
            setForm((prevForm) => ({
                ...prevForm,
                vaccine: newVaccination,
            }));
            return newVaccination;
        });
    };

    // 알러지 증상 선택 (다중선택)
    const selectSymptom = (id) => {
        setSelectedSymptoms((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            setForm({...form, Symptom: updated});
            setValue("Symptom", updated, {shouldValidate: true});
            return updated;
        });
    };

    // 좋아하는 것들 선택 (다중선택)
    const selectFavorite = (id) => {
        setSelectedFavorites((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            setForm({...form, favorites: updated});
            setValue("favorites", updated, {shouldValidate: true});
            return updated;
        });
    };

    // 주의사항 선택 (다중선택)
    const selectCaution = (id) => {
        setSelectedCautions((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            setForm({...form, cautions: updated});
            setValue("cautions", updated, {shouldValidate: true});
            return updated;
        });
    };

    const handleFormSubmit = async () => {  // data 파라미터 제거
        setHasSubmitted(true);
        
        // 현재 폼 상태에서 데이터 가져오기
        const currentFormData = getValues(); // react-hook-form의 getValues 사용
        
        // vaccination 상태와 form 상태를 통합하여 최종 데이터 생성
        const finalData = {
            ...currentFormData,
            vaccine: Array.isArray(vaccination) && vaccination.length > 0 ? vaccination : (Array.isArray(form.vaccine) ? form.vaccine : ['DHPP']),
            hospital: currentFormData.hospital || form.hospital,
            visit: currentFormData.visit || form.visit,
            lastDay: currentFormData.lastDay || form.lastDay,
            Cause: currentFormData.Cause || form.Cause,
            Symptom: currentFormData.Symptom || form.Symptom || (selectedSymptoms.length > 0 ? selectedSymptoms : []),
            favorites: Array.isArray(currentFormData.favorites) && currentFormData.favorites.length > 0 ? currentFormData.favorites : 
                     (Array.isArray(form.favorites) && form.favorites.length > 0 ? form.favorites : 
                     (Array.isArray(selectedFavorites) && selectedFavorites.length > 0 ? selectedFavorites : [1])),
            cautions: Array.isArray(currentFormData.cautions) && currentFormData.cautions.length > 0 ? currentFormData.cautions : 
                     (Array.isArray(form.cautions) && form.cautions.length > 0 ? form.cautions : 
                     (Array.isArray(selectedCautions) && selectedCautions.length > 0 ? selectedCautions : [1]))
        };
        
        console.log("=== finalData 생성 확인 ===");
        console.log("vaccination:", vaccination);
        console.log("form.vaccine:", form.vaccine);
        console.log("finalData.vaccine:", finalData.vaccine);
        console.log("최종 제출 데이터:", finalData);
        
        const errors = validateAllFields(finalData);
        setValidationErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            const requiredSections = [];
            
            if (errors.vaccine) {
                requiredSections.push('예방접종이력');
            }

            if (errors.hospital || errors.visit || errors.lastDay) {
                requiredSections.push('병원정보');
            }
            

            
            if (requiredSections.length > 0) {
                alert(`다음 섹션을 완성해주세요: ${requiredSections.join(', ')}`);
            } else {
                alert('필수 항목을 모두 완성해주세요😄');
            }
            return;
        }

        // 모든 유효성 검사 통과
        console.log("폼 유효! 제출데이터", finalData);

        if (isEditMode) {
            console.log("수정 모드 - 프로필 수정 로직 실행");
            navigate('/profile/edit-complete');
        } else {
            // 신규 등록 모드일 때 처리 - 최종 회원가입 완료 API 호출
            try {
                // localStorage에서 임시 사용자 정보 가져오기
                const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
                
                if (!tempUserData.user_id) {
                    alert('사용자 정보가 없습니다. 다시 로그인해주세요.');
                    return;
                }
                
                // 간단하게 필요한 데이터만 전송
                const simpleData = {
                    user_id: tempUserData.user_id,
                    name: tempUserData.name,
                    tel: tempUserData.tel,
                    birth: tempUserData.birth,
                    email: tempUserData.email,
                    ad_yn: tempUserData.ad_yn,
                    pri_yn: tempUserData.pri_yn,
                    type: tempUserData.type || 'k', // 소셜 로그인 타입
                    // 소셜 로그인 사용자는 password가 없으므로 제외
                    ...(tempUserData.password && { password: tempUserData.password }),
                    // 강아지 프로필 (이미지 경로만)
                    dogProfile: {
                        name: tempUserData.dogProfile?.name,
                        weight: tempUserData.dogProfile?.weight,
                        birthDate: tempUserData.dogProfile?.birthDate,
                        gender: tempUserData.dogProfile?.gender,
                        address: tempUserData.dogProfile?.address,
                        breed: tempUserData.dogProfile?.breed,
                        custombreed: tempUserData.dogProfile?.custombreed,
                        nickname: tempUserData.dogProfile?.nickname,
                        favoriteSnack: tempUserData.dogProfile?.favoriteSnack,
                        walkingCourse: tempUserData.dogProfile?.walkingCourse,
                        messageToFriend: tempUserData.dogProfile?.messageToFriend,
                        charactor: tempUserData.dogProfile?.charactor,
                        favorites: tempUserData.dogProfile?.favorites || [1], // 실제 선택된 값들 사용
                        cautions: tempUserData.dogProfile?.cautions || [1],  // 실제 선택된 값들 사용
                        neutralization: tempUserData.dogProfile?.neutralization,
                        profileImage: tempUserData.dogProfile?.profileImage || null // 이미지 경로만
                    },
                    // 건강정보
                    healthProfile: {
                        vaccine: ['DHPP'],
                        hospital: finalData.hospital || '',
                        visitCycle: finalData.visit || '',
                        lastVisit: finalData.lastDay || null,
                        allergyCause: finalData.Cause || '',
                        allergySymptom: (finalData.Symptom || []).map(getSymptomTitle).filter(Boolean)
                    }
                };

                console.log('간단한 데이터로 전송:');
                console.log('프로필 이미지 경로:', simpleData.dogProfile.profileImage);
                console.log('favorites (선택된 값들):', simpleData.dogProfile.favorites);
                console.log('cautions (선택된 값들):', simpleData.dogProfile.cautions);
                console.log('allergySymptom (원본):', finalData.Symptom);
                console.log('allergySymptom (변환됨):', simpleData.healthProfile.allergySymptom);
                console.log('데이터 크기:', JSON.stringify(simpleData).length, 'bytes');
                
                // 최종 단계: 모든 정보를 한번에 DB에 저장
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/complete-registration`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(simpleData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || '회원가입 완료 중 오류가 발생했습니다.');
                }

                const result = await response.json();
                console.log('회원가입 완료 성공:', result);
                
                // 사용자 이름을 localStorage에 저장 (SignUpComplete에서 사용)
                if (tempUserData.name) {
                    localStorage.setItem('userName', tempUserData.name);
                    console.log('userName localStorage에 저장됨:', tempUserData.name);
                }
                
                // Redux에 로그인 상태와 사용자 정보 설정 (헤더 변경용)
                dispatch(setUser({
                    user_id: tempUserData.user_id,
                    name: tempUserData.name,
                    email: tempUserData.email,
                    profileImage: tempUserData.dogProfile?.profileImage || null
                }));
                dispatch(setUserStatus(true));
                
                // 프로필 이미지 경로를 localStorage에 저장 (새로고침 시 복원용)
                if (tempUserData.dogProfile?.profileImage) {
                    localStorage.setItem('profileImage', tempUserData.dogProfile.profileImage);
                    console.log('프로필 이미지 경로 localStorage에 저장됨:', tempUserData.dogProfile.profileImage);
                } else {
                    console.log('프로필 이미지 경로가 없음:', tempUserData.dogProfile?.profileImage);
                }
                
                console.log('=== 프로필 이미지 저장 확인 ===');
                console.log('tempUserData.dogProfile:', tempUserData.dogProfile);
                console.log('localStorage profileImage:', localStorage.getItem('profileImage'));
                
                // user_id도 localStorage에 저장 (새로고침 시 로그인 상태 유지용)
                localStorage.setItem('user_id', tempUserData.user_id);
                console.log('user_id localStorage에 저장됨:', tempUserData.user_id);
                
                // 회원가입 완료! localStorage 정리 (프로필 이미지는 유지)
                localStorage.removeItem('tempUserData');
                
                // 임시 토큰을 실제 토큰으로 변경 (소셜 로그인 사용자)
                const tempAccessToken = localStorage.getItem('tempAccessToken');
                if (tempAccessToken) {
                    localStorage.setItem('accessToken', tempAccessToken);
                    localStorage.removeItem('tempAccessToken');
                }
                
                // 회원가입 완료 페이지로 이동
                navigate('/sign-up/complete');
            } catch (error) {
                console.error('회원가입 완료 오류:', error);
                alert(error.message);
            }
        }
    };

    // 회원가입 완료 처리
    const handleCompleteRegistration = async () => {
        try {
            console.log('=== 회원가입 완료 처리 시작 ===');
            
            // tempUserData에서 사용자 정보 가져오기
            const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
            console.log('tempUserData:', tempUserData);
            
            if (!tempUserData.user_id) {
                throw new Error('사용자 정보를 찾을 수 없습니다. 다시 시도해주세요.');
            }

            // 소셜 로그인 사용자인지 확인
            const isSocialLogin = tempUserData.provider && tempUserData.provider !== 'local';
            
            if (isSocialLogin) {
                // 소셜 로그인 사용자: 소셜 로그인 완료 API 호출
                console.log('소셜 로그인 사용자 - 소셜 로그인 완료 API 호출');
                
                const accessToken = tempUserData.accessToken;
                if (!accessToken) {
                    throw new Error('소셜 로그인 토큰을 찾을 수 없습니다.');
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/social-complete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        user_id: tempUserData.user_id,
                        email: tempUserData.email,
                        name: tempUserData.name,
                        provider: tempUserData.provider,
                        dogProfile: tempUserData.dogProfile,
                        healthProfile: {
                            vaccine: form.vaccine,
                            hospital: form.hospital,
                            visit: form.visit,
                            lastDay: form.lastDay,
                            Cause: form.Cause,
                            Symptom: form.Symptom,
                            favorites: form.favorites,
                            cautions: form.cautions
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error('소셜 로그인 완료 처리 중 오류가 발생했습니다.');
                }

                const result = await response.json();
                console.log('소셜 로그인 완료 결과:', result);

                // 소셜 로그인 완료 후 로그인 상태로 설정
                dispatch(setUserStatus(true));
                
                // localStorage 정리 및 설정
                localStorage.setItem('jwt_token', accessToken);
                localStorage.setItem('userName', tempUserData.name);
                localStorage.setItem('user_id', tempUserData.user_id);
                localStorage.setItem('email', tempUserData.email);
                
                // 프로필 이미지가 있으면 저장
                if (tempUserData.dogProfile?.profileImage) {
                    localStorage.setItem('profileImage', tempUserData.dogProfile.profileImage);
                }
                
                // 임시 데이터 정리
                localStorage.removeItem('tempUserData');
                localStorage.removeItem('socialUserData');
                
                // 회원가입 완료 페이지로 이동
                navigate('/sign-up/complete');
                
            } else {
                // 일반 회원가입 사용자: 기존 로직 유지
                console.log('일반 회원가입 사용자 - 기존 로직 실행');
                
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/complete-registration`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: tempUserData.user_id,
                        email: tempUserData.email,
                        name: tempUserData.name,
                        dogProfile: tempUserData.dogProfile,
                        healthProfile: {
                            vaccine: form.vaccine,
                            hospital: form.hospital,
                            visit: form.visit,
                            lastDay: form.lastDay,
                            Cause: form.Cause,
                            Symptom: form.Symptom,
                            favorites: form.favorites,
                            cautions: form.cautions
                        }
                    })
                });

                if (!response.ok) {
                    throw new Error('회원가입 완료 처리 중 오류가 발생했습니다.');
                }

                const result = await response.json();
                console.log('회원가입 완료 결과:', result);

                // localStorage에 사용자 정보 저장
                localStorage.setItem('userName', tempUserData.name);
                localStorage.setItem('user_id', tempUserData.user_id);
                localStorage.setItem('email', tempUserData.email);
                
                // 프로필 이미지가 있으면 저장
                if (tempUserData.dogProfile?.profileImage) {
                    localStorage.setItem('profileImage', tempUserData.dogProfile.profileImage);
                }
                
                // user_id도 localStorage에 저장 (새로고침 시 로그인 상태 유지용)
                localStorage.setItem('user_id', tempUserData.user_id);
                console.log('user_id localStorage에 저장됨:', tempUserData.user_id);
                
                // 회원가입 완료! localStorage 정리 (프로필 이미지는 유지)
                localStorage.removeItem('tempUserData');
                
                // 회원가입 완료 페이지로 이동
                navigate('/sign-up/complete');
            }
        } catch (error) {
            console.error('회원가입 완료 오류:', error);
            alert(error.message);
        }
    };

    return (
        <div style={{marginTop:"195px",marginBottom:"550px" , padding : 0}}>
            <S.InputWrapper>
                <S.TitleWrap> 
                    <Text.Body1>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.highlight style={{ fontWeight: 'bold'}}>예방접종이력</S.highlight>
                        <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(다중선택가능)</span>
                    </Text.Body1>
                </S.TitleWrap>
                <S.inputinline style={{marginTop:"0"}}>
                    <S.NamekgWrap style={{marginRight:'30px'}}>
                        <BasicButton
                            basicButton="superSmall" 
                            variant={vaccination.includes("DHPP") ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => toggleVaccination('DHPP')}>
                            종합 백신(DHPP or DHPPL)
                        </BasicButton>
                    </S.NamekgWrap>
                    <S.NamekgWrap style={{marginRight:'30px'}}>
                        <BasicButton 
                            basicButton="superSmall" 
                            variant={vaccination.includes("obedient") ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => toggleVaccination('obedient')}>
                            광견병 백신
                        </BasicButton>
                    </S.NamekgWrap>
                    <S.NamekgWrap>
                        <BasicButton
                            basicButton="superSmall" 
                            variant={vaccination.includes("none") ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => toggleVaccination('none')}>
                            접종 이력 없음
                        </BasicButton>
                    </S.NamekgWrap>
                </S.inputinline>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.vaccine}
                    message={validationErrors.vaccine}   
                />
                <S.TitleWrap style={{marginTop:"50px"}}> 
                    <Text.Body1>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.highlight style={{ fontWeight: 'bold'}}>병원 정보</S.highlight>
                    </Text.Body1>
                </S.TitleWrap>
                <S.NamekgWrap style={{width:"100%"}}>
                    <BasicInput type="text" placeholder="병원 이름"
                    {...register("hospital", {
                        required: true,
                        onChange: (e) => setForm({...form, hospital: e.target.value})})}></BasicInput>
                </S.NamekgWrap>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.hospital}
                    message={validationErrors.hospital}   
                />
                <S.InputButtonWrapper >
                    <BasicInput type="text" placeholder="병원 방문 주기"
                    {...register("visit", {
                        required: true,
                        onChange: (e) => setForm({...form, visit: e.target.value})})}/>
                    <Text.Body3>개월</Text.Body3>
                </S.InputButtonWrapper>  
                <ErrorMessage
                    show={hasSubmitted && validationErrors.visit}
                    message={validationErrors.visit}   
                />
                <S.InputButtonWrapper>
                    <Controller 
                        name="lastDay" 
                        control={control}
                        rules={{ required: "마지막 방문일을 선택해주세요" }}
                        render={({ field }) => ( 
                            <div style={{position:'relative', width:'100%'}}>
                                <BasicInput
                                    {...field}  // value, onChange 등 포함
                                    value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                                    placeholder="마지막 방문일"
                                    readOnly // 달력에서만 선택 가능하도록 읽기전용 처리
                                    onClick={() => calendarRef.current?.setFocus()}
                                />
                                <img src="/assets/icons/calendar.svg" 
                                    width={30} height={30} alt="캘린더" 
                                    onClick={() => calendarRef.current?.setFocus()}
                                    style={{
                                        right:"24px", 
                                        top:"50%", 
                                        transform:"translateY(-50%)", 
                                        cursor: "pointer", 
                                        position:'absolute'
                                    }} 
                                />
                                <DatePickerSingle 
                                ref={calendarRef} 
                                selected={field.value ? new Date(field.value) : null} 
                                onChange={(date) => {
                                    field.onChange(date);
                                    setSelectedDate(date);
                                    setForm((prev) => ({...prev, lastDay: date}))
                                }}/>
                            </div>
                        )}
                    /> 
                </S.InputButtonWrapper>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.lastDay}
                    message={validationErrors.lastDay}   
                />
                <S.TitleWrap style={{marginTop:"50px"}}> 
                    <Text.Body1>
                        <S.highlight style={{ fontWeight: 'bold'}}>알러지 정보</S.highlight>
                        <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(선택사항)</span>
                    </Text.Body1>
                </S.TitleWrap>
                <S.NamekgWrap style={{width:"100%"}}>
                    <BasicInput type="text" placeholder="어떤 음식을 먹으면 알러지 발생하나요?"
                    {...register("Cause", {
                        onChange: (e) => setForm({...form, Cause: e.target.value})})}></BasicInput>
                </S.NamekgWrap>
                <S.inputinline>
                    <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                        <Text.Body3>알러지 증상을 골라주세요!</Text.Body3>
                        <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(다중선택가능)</span>
                    </S.CaptionTitlewrap>
                </S.inputinline>
               <S.inputinlinehealth>
                    <S.NamekgWrap onClick={()=>selectSymptom(1)} style={{height:'17vw'}}>
                        <S.radioselect src='/assets/img/progile/Allergy/Itchy.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"20px 0 6px 0", fontWeight:"bold"}}>가려움증<br/></Text.Body2>
                        <Text.Body3>(간지러움)</Text.Body3>
                        <Checkbox checked={selectedSymptoms.includes(1)} size="M" mt="20" style={{marginTop:'auto'}}/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={()=>selectSymptom(2)} style={{height:'17vw'}}>
                        <S.radioselect src='/assets/img/progile/Allergy/skin rash.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"20px 0 6px 0", fontWeight:"bold"}}>피부 발진 및 붉어짐<br/></Text.Body2>
                        <Text.Body3>(피부 문제)</Text.Body3>
                        <Checkbox checked={selectedSymptoms.includes(2)} size="M" mt="20" style={{marginTop:'auto'}}/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={()=>selectSymptom(3)} style={{height:'17vw'}}>
                        <S.radioselect src='/assets/img/progile/Allergy/eye.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"20px 0 6px 0", fontWeight:"bold"}}>눈물 흘림 및 눈 주위 가려움<br/></Text.Body2>
                        <Text.Body3>(눈 염증)</Text.Body3>
                        <Checkbox checked={selectedSymptoms.includes(3)} size="M" mt="20" style={{marginTop:'auto'}}/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={()=>selectSymptom(4)} style={{height:'17vw'}}>
                        <S.radioselect src='/assets/img/progile/Allergy/ear.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"20px 0 6px 0", fontWeight:"bold"}}>귀 염증<br/></Text.Body2>
                        <Text.Body3>(외이염)</Text.Body3>
                        <Checkbox checked={selectedSymptoms.includes(4)} size="M" mt="20" style={{marginTop:'auto'}}/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={()=>selectSymptom(5)} style={{height:'17vw'}}>
                        <S.radioselect src='/assets/img/progile/Allergy/indigestion.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"20px 0 6px 0", fontWeight:"bold"}}>소화문제<br/></Text.Body2>
                        <Text.Body3>(설사, 구토 등)</Text.Body3>
                        <Checkbox checked={selectedSymptoms.includes(5)} size="M" mt="20" style={{marginTop:'auto'}}/>
                    </S.NamekgWrap>
                </S.inputinlinehealth>
            
                <S.InputReguler style={{marginTop:"182px"}}>
                    <BasicButton 
                    basicButton="superSmall" 
                    variant="filled" 
                    style={{width:"200px", cursor:'pointer'}}
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}>
                        다음
                    </BasicButton>
                </S.InputReguler>
            </S.InputWrapper>
        </div>
    );
};

export default AddHealthProfile;