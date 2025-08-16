import React, { useRef, useState } from 'react';
import Container from '../../components/layout/Container';
import S from './style';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import BasicInput from '../../components/input/BasicInput';
import Radio from '../../components/radio/Radio';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import DatePickerSingle from './DatePickerSingle';
import { useLocation, useNavigate } from 'react-router-dom';

const AddHealthProfile = () => {
    const { register, formState: {isSubmitting, errors} , control, setValue, getValues } = useForm({ mode: "onChange" });

    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [vaccination, setVaccination] = useState(['DHPP']); 
    const [selectedSymptom, setSelectedSymptom] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.state?.mode === 'edit';
    const userData = location.state?.userData || {};

    const [form, setForm] = useState({
        vaccine : isEditMode ? userData.vaccine || '' : '',
        hospital : isEditMode ? userData.hospital || '' : '',
        visit : isEditMode ? userData.visit || '' : '',
        lastDay : isEditMode ? userData.lastDay || '' : '',
        Cause : isEditMode ? userData.Cause || '' : '',
        Symptom : isEditMode ? userData.Symptom || '' : '',
    });
    
    const [validationErrors, setValidationErrors] = useState({}); // isValid: false
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const validateAllFields = (formData) => {
        const errors = {};

        // 검증할 필드 목록
        const fieldChecks = [
            { key: "vaccine",  value: formData.vaccine || form.vaccine, message: "예방 접종 이력을 선택해주세요." },
            { key: "hospital",  value: formData.hospital || form.hospital, message: "병원이름을 입력해주세요" },
            { key: "visit", value: formData.visit || form.visit, message: "병원 방문 주기를 입력해주세요" },
            { key: "lastDay", value: formData.lastDay || form.lastDay, message: "마지막 방문일을 선택해주세요" },
        ];

    // 반복 처리 (빈 값이면 에러 추가)
    fieldChecks.forEach(({ key, value, message }) => {
        const isEmpty = value === undefined || value === null || 
                       (typeof value === "string" && value.trim() === "");
        if (isEmpty) {
            errors[key] = message;
        }
    });

    console.log("병원이력 검증 중인 데이터:", { formData, form, errors }); // 디버깅용
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

      const selectSymptom = (id) => {
        console.log("선택된 값", id)
        setSelectedSymptom(id);
        setForm({...form, Symptom: id});
        setValue("Symptom", id, {shouldValidate: true});
        console.log("setValue 후 form 값", getValues("Symptom"))
    };

    const handleFormSubmit = (data) => {
        setHasSubmitted(true);
        const errors = validateAllFields(form);
        setValidationErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            const requiredSections = [];
            
            // 기본정보 체크
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
            console.log("폼 유효! 제출데이터");

            if (isEditMode) {
            // 수정 모드일 때 처리 (예: 수정 API 호출 등)
            console.log("수정 모드 - 프로필 수정 로직 실행");
            // 수정 작업 완료 후 다음 페이지 이동 or 목록 페이지 등
            navigate('/profile/edit-complete'); // 예시 경로
            } else {
            // 신규 등록 모드일 때 처리
            console.log("등록 모드 - 신규 프로필 등록 로직 실행");
            navigate('/sign-up/complete'); // 등록 후 다음 단계 페이지
            }
        };



    return (
        <Container style={{marginTop:"195px",marginBottom:"550px"}}>
            <S.InputWrapper>
                <S.TitleWrap > 
                    <Text.Body1>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.highlight style={{ fontWeight: 'bold'}}>예방접종이력</S.highlight>
                        <span style={{ color: '#CE5347', fontWeight: 'normal', fontSize:"small"}}>&nbsp;&nbsp;다중선택가능&nbsp;</span>
                    </Text.Body1>
                </S.TitleWrap>
                <S.inputinline>
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
                <S.TitleWrap > 
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
                <S.TitleWrap > 
                    <Text.Body1>
                        <S.highlight style={{ fontWeight: 'bold'}}>알러지 정보</S.highlight>
                    </Text.Body1>
                </S.TitleWrap>
                <S.NamekgWrap style={{width:"100%"}}>
                    <BasicInput type="text" placeholder="알러지 원인"
                    {...register("Cause", {
                        onChange: (e) => setForm({...form, Cause: e.target.value})})}></BasicInput>
                </S.NamekgWrap>
                <S.Content style={{height:"30px"}}>
                    <Text.Body3>알러지 증상</Text.Body3>
                </S.Content>
               <S.inputinlinehealth>
                    <S.NamekgWrap style={{marginRight:'30px', justifyContent: 'space-between'}}
                        onClick={()=>selectSymptom(1)} selectedSymptom={selectedSymptom === 1}>
                        <S.radioselect src='/assets/img/progile/Allergy/itchy.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>가려움증<br/></Text.Body2>
                        <Text.Body3>(간지러움)</Text.Body3>
                        <Radio checked={selectedSymptom === 1} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px', justifyContent: 'space-between'}}
                        onClick={()=>selectSymptom(2)} selectedSymptom={selectedSymptom === 2}>
                        <S.radioselect src='/assets/img/progile/Allergy/skin rash.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>피부 발진 및 붉어짐<br/></Text.Body2>
                        <Radio checked={selectedSymptom === 2} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px', justifyContent: 'space-between'}}
                        onClick={()=>selectSymptom(3)} selectedSymptom={selectedSymptom === 3}>
                        <S.radioselect src='/assets/img/progile/Allergy/eye.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>눈물 흘림 및 눈 주위 가려움<br/></Text.Body2>
                        <Text.Body3>(눈 염증)</Text.Body3>
                        <Radio checked={selectedSymptom === 3} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px', justifyContent: 'space-between'}}
                        onClick={()=>selectSymptom(4)} selectedSymptom={selectedSymptom === 4}>
                        <S.radioselect src='/assets/img/progile/Allergy/ear.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>귀 염증<br/></Text.Body2>
                        <Text.Body3>(외의염)</Text.Body3>
                        <Radio checked={selectedSymptom === 4} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{justifyContent: 'space-between'}}
                        onClick={()=>selectSymptom(5)} selectedSymptom={selectedSymptom === 5}>
                        <S.radioselect src='/assets/img/progile/Allergy/indigestion.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소화문제<br/></Text.Body2>
                        <Text.Body3>(설사, 구토 등)</Text.Body3>
                        <Radio checked={selectedSymptom === 5} style={{}}size="M" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinlinehealth>
                <S.InputReguler onSubmit={handleFormSubmit} style={{marginTop:"182px"}}>
                    <BasicButton 
                    basicButton="superSmall" 
                    variant="filled" 
                    style={{width:"200px",
                    cursor:'pointer'}}
                    onClick={handleFormSubmit}
                    type='submit'
                    disabled={isSubmitting}>
                        다음
                    </BasicButton>
                </S.InputReguler>
            </S.InputWrapper>
        </Container>
    );
};

export default AddHealthProfile;