import React, { useEffect, useImperativeHandle, useState } from 'react';
import BasicButton from '../../components/button/BasicButton';
import S from './style';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import Container from '../../components/layout/Container';
import SelectBox from "../../components/selectBox/SelectBox";
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import Radio from '../../components/radio/Radio';
import Checkbox from '../../components/checkbox/Checkbox';
import DatePickerSingle from './DatePickerSingle';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';


const AddProfile = () => {
    
    const calendarRef = useRef(null);
    const fileInputRef = useRef(null);
    const { register, handleSubmit, formState: {isSubmitting}, control, setValue, getValues } = useForm({ mode: "onChange" });
    const [selectedCharactor, setSelectedCharactor] = useState(1);
    const [selectedFavorite, setSelectedFavorite] = useState([1]);
    const [selectedCautions, setSelectedCautions] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [thumbnail, setThumbnail] = useState(null); //상태 수정을 위한 경로
    const location = useLocation();
    const navigate = useNavigate();

    const isEditMode = location.state?.mode === 'edit';
    const userData = location.state?.userData || {};

    const [form, setForm] = useState({
        name: isEditMode ? userData.name || '' : '',
        weight: isEditMode ? userData.weight || '' : '',
        birthDate: isEditMode ? userData.birthDate || '' : '',
        gender: isEditMode ? userData.gender || '' : 'male',
        breed: isEditMode ? userData.breed || '' : '',
        custombreed: isEditMode ? userData.custombreed || '' : '',
        address: isEditMode ? userData.address || '' : '',
        neutralization: isEditMode ? userData.neutralization || '' : '',
        imageSrc: isEditMode ? userData.imageSrc || '' : '',
        nickname: isEditMode ? userData.nickname || '' : '',
        favoriteSnack: isEditMode ? userData.favoriteSnack || '' : '',
        walkingCourse: isEditMode ? userData.walkingCourse || '' : '',
        messageToFriend: isEditMode ? userData.messageToFriend || '' : '',
        charactor: isEditMode ? userData.charactor || '' : '',
        favorites: isEditMode ? userData.favorites || '' : '',
        cautions: isEditMode ? userData.cautions || '' : '',
    });
    const [validationErrors, setValidationErrors] = useState({}); // isValid: false
    const [hasSubmitted, setHasSubmitted] = useState(false);

         // 기본정보 유효성 검사 (formData와 form 상태 모두 확인)
    const validateAllFields = (formData) => {
        const errors = {};

        // 검증할 필드 목록
        const fieldChecks = [
            { key: "name",           value: formData.name || form.name,                 message: "이름을 입력해주세요." },
            { key: "weight",         value: formData.weight || form.weight,             message: "몸무게를 입력해주세요." },
            { key: "birthDate",      value: formData.birthDate || form.birthDate,       message: "생년월일을 입력해주세요." },
            { key: "gender",         value: formData.gender || form.gender,             message: "성별을 선택해주세요." },
            { key: "address",        value: form.address,                               message: "주소를 검색해주세요." },
            { key: "breed",          value: form.breed,                                 message: "품종을 선택해주세요." },
            { key: "profilePhoto",   value: form.imageSrc,                              message: "프로필 사진을 등록해주세요." },
            { key: "nickname",       value: formData.nickname || form.nickname,         message: "별명을 입력해주세요." },
            { key: "favoriteSnack",  value: formData.favoriteSnack || form.favoriteSnack, message: "좋아하는 간식을 입력해주세요." },
            { key: "walkingCourse",  value: formData.walkingCourse || form.walkingCourse, message: "좋아하는 산책코스를 입력해주세요." },
            { key: "messageToFriend", value: formData.messageToFriend || form.messageToFriend, message: "새 친구에게 한마디를 입력해주세요." },
            { key: "Charactor",      value: formData.Charactor || form.charactor,       message: "우리 멍이의 성격을 선택해주세요" },
            { key: "Favorit",        value: formData.favorites || form.favorites,       message: "우리 멍이가 좋아하는 것을 선택해주세요" },
        ];

    // 반복 처리 (빈 값이면 에러 추가)
    fieldChecks.forEach(({ key, value, message }) => {
        const isEmpty = value === undefined || value === null || 
                       (typeof value === "string" && value.trim() === "");
        if (isEmpty) {
            errors[key] = message;
        }
    });

    console.log("검증 중인 데이터:", { formData, form, errors }); // 디버깅용
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



    const handleSearchAddress = () => {
        new window.daum.Postcode({
        oncomplete: function (data) {
            setForm({...form, address: data.roadAddress});// 선택된 도로명 주소 설정
        },
        }).open();
    };
    

    const BREEDS = ["말티푸", "시츄", "골든리트리버", "푸들", "보더콜리", "비숑프리제",
        "포메라니안", "닥스훈트", "치와와", "요크셔테리어", "이탈리안 그레이하운드", "퍼그",
         "기타" 
    ];


    //이미지선택
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){ 
        const reader = new FileReader()
        reader.onloadend = () => {
            setForm({...form, imageSrc: reader.result})
        }

        reader.readAsDataURL(file)
    }}

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleThumbnailUpload = async () => {
    //이미지 처리할 땐 데이터 용량을 알지 못하기 때문에 비동기로 처리한다.
        if(!thumbnail){
            alert("파일을 선택해주세요.")
            return;
        }

        const formData = new FormData();
        formData.append("thumbnail", thumbnail)

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/images/thumbnail', { //뒤에는 경로를 만들어줬음
                method : 'POST', //옵션객체 열었음/ 추가하는 거니까 post 아니면 업데이트,수정이면 put으로 보내도됨
                headers : { //로그인된 사용자만 가능하니까(토큰있는 사용자) 토큰을 같이 보냄
                    "Authorization" : `Bearer ${localStorage.getItem("jwtToken")}`
                },//Authorization: 허가 ,, Bearer 토큰 값을 알려주는 거임
                body : formData //백엔드에서 받으니까 처림됨
            })

            if(!response.ok){ alert("이미지 업로드 실패!"); return;}

            const data = await response.json()
            console.log(data)

        } catch (error) {
            console.log("handleThumbnailUpload error")
            console.error(error)            
        }
    }

    const handleInputClick = () => {
        calendarRef.current.setOpen(true);
        console.log(calendarRef.current)
    };

    const handleGenderClick = (gender) => {
        setForm({...form, gender});
        setValue('gender', gender, { shouldValidate: true }); // 유효성 검사도 동시에 트리거
    };

    const selectCharactor = (id) => {
        console.log("선택된 값", id)
        setSelectedCharactor(id);
        setForm({...form, charactor: id});
        setValue("charactor", id, {shouldValidate: true});
        console.log("setValue 후 form 값", getValues("charactor"))
    };

    const selectFavorite = (id) => {
        console.log("선택된 값", id)
        setSelectedFavorite((prev) => {
            const updated = prev.includes(id) 
            ? prev.filter((v) => v !== id) : [...prev, id]

            setForm({...form, favorites: updated});
            setValue("favorite", updated, {shouldValidate: true});
            console.log("filter 후 ", updated)
            return updated;
    })};

    const selectCautions = (id) => {
        console.log("선택된 값", id)
        setSelectedCautions((prev) => {
            const updated = prev.includes(id) 
            ? prev.filter((v) => v !== id) : [...prev, id]

            setForm({...form, cautions: updated});
            setValue("cautions", updated, {shouldValidate: true});
            console.log("filter 후 ", updated)
            return updated
        });
    };

    const isFormValid = () => Object.keys(validateAllFields(form)).length === 0;

    // 입력값 변경 핸들러 (예시)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };


    const handleFormSubmit = (data) => {
        setHasSubmitted(true);
        const errors = validateAllFields(form);
        setValidationErrors(errors);
        
        if (Object.keys(errors).length > 0) {
            const requiredSections = [];
            
            // 기본정보 체크
            if (errors.name || errors.weight || errors.birthDate || errors.gender || errors.address || errors.breed) {
                requiredSections.push('기본정보');
            }
            
            // 프로필 카드 체크
            if (errors.profilePhoto || errors.nickname || errors.favoriteSnack || errors.walkingCourse || errors.messageToFriend) {
                requiredSections.push('프로필 카드 정보');
            }
            
            // 필수 기타정보 체크
            if (errors.Charactor || errors.Favorit) {
                requiredSections.push('기타 정보');
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
            navigate('/profile/add-health'); // 등록 후 다음 단계 페이지
            }
        };


    return (
        <div style={{marginTop:"195px",marginBottom:"550px"}}>
            <S.TitleWrap> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold'}}>기본정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
            <S.inputinline>
                <S.NamekgWrap style={{marginRight:'30px'}}>
                    <S.CaptionTitlewrap >내 이름은,</S.CaptionTitlewrap>
                    <BasicInput 
                    type="text" 
                    placeholder="멍이의 이름을 입력해주세요"
                    {...register("name", {
                        required: true, 
                        onChange: (e) => setForm({...form, name: e.target.value})})}
                    />
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.name}
                        message={validationErrors.name}   
                    />
                </S.NamekgWrap>
                <S.NamekgWrap >
                    <S.CaptionTitlewrap>몸무게</S.CaptionTitlewrap>
                    <S.InputButtonWrapper >
                        <Text.Body3>kg</Text.Body3>
                        <BasicInput s type="text" placeholder=""
                        {...register("weight", {
                            required: true,
                            onChange: (e) => setForm({...form, weight: e.target.value})})}
                        /> 
                    </S.InputButtonWrapper>
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.weight}
                        message={validationErrors.weight}  
                    />
                </S.NamekgWrap>
            </S.inputinline>
            <S.InputReguler style={{position:'relative'}}>
                <S.CaptionTitlewrap>생년월일</S.CaptionTitlewrap>
                <div style={{position:'relative', width:'100%'}}>
                    <BasicInput
                    value={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""}
                    placeholder="생년월일을 입력해주세요"
                    required
                    onClick={() => calendarRef.current?.setFocus()}
                    />
                    <img src="/assets/icons/calendar.svg" 
                        width={30} height={30} alt="캘린더" 
                        onClick={() => calendarRef.current?.setFocus()
                        }
                        style={{
                            right:"10px", 
                            top:"50%", 
                            transform:"translateY(-50%)", 
                            cursor: "pointer", 
                            position:'absolute'
                        }} 
                    />
                    <Controller 
                        name="birthDate" 
                        control={control}
                        rules={{ required: "생년월일을 선택해주세요" }}
                        render={({ field }) => ( 
                            <DatePickerSingle 
                            ref={calendarRef} 
                            selected={field.value} 
                            onChange={(date) => {
                                setSelectedDate(date);
                                setForm(prev => ({...prev, birthDate: date}))
                            }}/>
                        )}
                    /> 
                </div>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.birthDate}
                    message={validationErrors.birthDate}  
                />
            </S.InputReguler>
            <S.InputReguler>
                <S.CaptionTitlewrap>성별</S.CaptionTitlewrap>
                <S.inputinline>
                    <S.NamekgWrap style={{marginRight:"30px"}}>
                        <BasicButton 
                        basicButton="superSmall" 
                        variant={form.gender === "male" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => handleGenderClick('male')}>
                            남
                        </BasicButton>
                    </S.NamekgWrap>
                    <S.NamekgWrap>
                        <BasicButton
                        basicButton="superSmall" 
                        variant={form.gender === "female" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => handleGenderClick('female')}>                                
                        여
                        </BasicButton>
                    </S.NamekgWrap>
                </S.inputinline>
                <input
                    type='hidden'
                    {...register("gender", {required:"성별을 선택해주세요.", 
                        validate: (value) => value === "male" || value === "female" || "성별을 선택해주세요."
                    })}
                />
                <ErrorMessage
                    show={hasSubmitted && validationErrors.gender}
                    message={validationErrors.gender}  
                />
            </S.InputReguler>
            <S.InputReguler>
                <S.CaptionTitlewrap>주소</S.CaptionTitlewrap>
                    <div 
                    onClick={handleSearchAddress} 
                    style={{
                        width:'100%',
                        display:'flex',
                        alignItems: 'center',
                        cursor:"pointer",
                        }}>
                    <BasicInput 
                    type="text" 
                    value={form.address}
                    placeholder="도로명 주소를 검색하세요"
                    readOnly
                    {...register("address", {
                        required: "주소를 검색해주세요"
                    })}
                    />
                    <img 
                    src="/assets/icons/search.svg" 
                    width={30} height={30} 
                    alt="검색" />
                </div>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.address}
                    message={validationErrors.address}  
                />
            </S.InputReguler>
            <S.InputReguler >
                <S.CaptionTitlewrap>품종</S.CaptionTitlewrap>
                <S.InputButtonWrapper>
                    <SelectBox
                        options={BREEDS}
                        placeholder="강아지 품종을 선택하세요."
                        {...register("breed", {required: true})}
                        onSelect={(v) => setForm({...form, breed: v})}
                        style={{width:"100%", cursor:"pointer"}}
                        />
                </S.InputButtonWrapper>
                {form.breed  === "기타" && (
                    <S.InputButtonWrapper style={{marginTop:"10px"}}>
                        <BasicInput
                        type="text"
                        placeholder="직접 입력해주세요"
                            value={form.custombreed}
                            onChange={(e) => setForm({...form, custombreed: e.target.value})}
                            style={{
                            width: "100%",
                            height: "64px",
                            padding: "20px 24px"
                            }}
                        />
                    </S.InputButtonWrapper>
                )}
                <ErrorMessage
                    show={hasSubmitted && validationErrors.breed}
                    message={validationErrors.breed}  
                />
            </S.InputReguler>

            {/* 프로필 카드 섹션 */}
            <S.TitleWrap style={{marginTop:"42px"}}> 
                <Text.Body2>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold'}}>프로필 카드 정보</S.highlight>
                </Text.Body2>
            </S.TitleWrap>
            <S.inputinline>
                <S.NamekgWrap style={{display:"flex", justifyContent:"center"}} >
                    <S.CaptionTitlewrap style={{position:"static", height:"auto", textAlign:"center"}}>
                    대표 프로필 사진 <br/><br/>
                    우리 멍이의 대표 프로필 사진을 등록해주세요.</S.CaptionTitlewrap>
                    <S.Profile 
                        src={form.imageSrc || "/assets/img/progile/camera.png"} 
                        style={{marginTop:"30px", cursor:"pointer"}}
                        onClick={handleClick}
                        {...register("profilePhoto", {
                        required: true,
                        onChange: (e) => setForm({...form, profilePhoto: e.target.value})})}
                    />
                    <input
                        id="profile"
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.profilePhoto}
                        message={validationErrors.profilePhoto}  
                    />
                </S.NamekgWrap>
                    <S.NamekgWrap >
                        <S.CaptionTitlewrap >별명</S.CaptionTitlewrap>
                        <BasicInput 
                            type="text" placeholder="간식요정"
                        {...register("nickname", {
                            required: true,
                            onChange: (e) => setForm({...form, nickname: e.target.value})})}
                        />
                        <ErrorMessage 
                            show={hasSubmitted && validationErrors.nickname}
                            message={validationErrors.nickname}  
                        />
                        <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 간식</S.CaptionTitlewrap>
                        <BasicInput 
                            type="text" placeholder="육포, 치즈, 연어 ..."
                        {...register("favoriteSnack", {
                            required: true,
                            onChange: (e) => setForm({...form, favoriteSnack: e.target.value})})}
                        />
                        <ErrorMessage
                            show={hasSubmitted && validationErrors.favoriteSnack}
                            message={validationErrors.favoriteSnack}  
                        />
                        <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 산책코스</S.CaptionTitlewrap>
                        <BasicInput 
                            type="text" placeholder="집 주변 공원"
                        {...register("walkingCourse", {
                            required: true,
                            onChange: (e) => setForm({...form, walkingCourse: e.target.value})})}
                        />
                        <ErrorMessage
                            show={hasSubmitted && validationErrors.walkingCourse}
                            message={validationErrors.walkingCourse}  
                        />
                        <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>새 친구에게 한마디!</S.CaptionTitlewrap>
                        <BasicInput 
                            style={{height:"100px"}} type="text" placeholder="친구들과 뛰어 놀 준비 완료!"
                        {...register("messageToFriend", {
                            required: true,
                            onChange: (e) => setForm({...form, messageToFriend: e.target.value})})}
                        />
                        <ErrorMessage
                            show={hasSubmitted && validationErrors.messageToFriend}
                            message={validationErrors.messageToFriend}  
                        />
                    </S.NamekgWrap>                
            </S.inputinline>
            <S.TitleWrap style={{marginTop:"42px"}}> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold'}}>기타 정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
                    {/*  기타정보-강아지 성격 */}
            <S.inputinline style={{display:'flex', alignItems:'flex-start'}}>
                <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.CaptionTitlewrap style={{width:'auto', marginRight:'10px'}}>우리 멍이의 성격은? </S.CaptionTitlewrap>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.Charactor}
                    message={validationErrors.Charactor}  
                />
            </S.inputinline>
            <S.inputinline>
                <S.NamekgWrap style={{marginRight:'30px'}} 
                        onClick={()=>selectCharactor(1)} selectedCharactor={selectedCharactor === 1}>
                    <S.radioselect src='/assets/img/progile/personality/popularity.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나는 개인싸!<br/></Text.Body2>
                    <Text.Body3>누구와도 잘 지내요</Text.Body3>
                    <Radio checked={selectedCharactor === 1} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap  style={{marginRight:'30px'}} onClick={()=>selectCharactor(2)} selectedCharactor={selectedCharactor === 2}>
                    <S.radioselect src='/assets/img/progile/personality/leader.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나를 따르라!<br/></Text.Body2>
                    <Text.Body3>가만히 있지 못해요!</Text.Body3>
                    <Radio checked={selectedCharactor === 2} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap style={{marginRight:'30px'}} onClick={()=>selectCharactor(3)} selectedCharactor={selectedCharactor === 3}>
                    <S.radioselect src='/assets/img/progile/personality/attractiveness.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나랑만 있어줘...<br/></Text.Body2>
                    <Text.Body3>애착형이고 애교가 많아요</Text.Body3>
                    <Radio checked={selectedCharactor === 3} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(4)} selectedCharactor={selectedCharactor === 4}>
                    <S.radioselect src='/assets/img/progile/personality/shy.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>조금 조심스럽개!<br/></Text.Body2>
                    <Text.Body3>수줍음이 많아요</Text.Body3>
                    <Radio checked={selectedCharactor === 4} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinline>
                <input
                    type='hidden'
                    {...register("charactor", {
                        required:"멍이의 성격을 선택해주세요", 
                        validate: (value) => {
                            const validOptions = [1, 2, 3, 4];
                            return validOptions.includes(value) || "멍이의 성격을 선택해주세요"
                    }})}
                />

            {/*  기타정보-강아지 취향 */}
            <S.inputinline style={{display:'flex', alignItems:'flex-start'}}>
                <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.CaptionTitlewrap style={{width:'auto', marginRight:'10px'}}>우리 멍이가 좋아하는 것은?
                        <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.Favorit }
                    message={validationErrors.Favorit }  
                />
            </S.inputinline>
            <S.inputinline>
                <S.NamekgWrap onClick={() => selectFavorite(1)} selected={selectedFavorite.includes(1)} style={{marginRight:'30px'}}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/snack.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>간식이 좋아<br/></Text.Body2>
                    <Text.Body3>육포, 개껌, 치즈...</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(1)} size="L" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(2)} selected={selectedFavorite.includes(2)} style={{marginRight:'30px'}}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/walk.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>산책이 짱!<br/></Text.Body2>
                    <Text.Body3>산책 없이 못살아!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(2)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(3)} selected={selectedFavorite.includes(3)} style={{marginRight:'30px'}}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/healing.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>쉬는 게 최고<br/></Text.Body2>
                    <Text.Body3>힐링이 최고다 멍!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(3)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(4)} selected={selectedFavorite.includes(4)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/friend.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>애카 가자!<br/></Text.Body2>
                    <Text.Body3>친구들이 제일 좋아!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(4)} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinline>

            {/* 기타정보-강아지 주의할 점 */}
            <S.inputinline>
                <S.CaptionTitlewrap>주의해 주세요!
                    <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
            </S.inputinline>
            <S.inputinline>
                <S.NamekgWrap onClick={() => selectCautions(1)} selected={selectedCautions.includes(1)} style={{marginRight:'30px'}}>
                    <S.radioselect src='/assets/img/progile/Caution/touch.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>만지는 거 싫어!<br/></Text.Body2>
                    <Text.Body3>나는 예민해요</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(1)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(2)} selected={selectedCautions.includes(2)} style={{marginRight:'30px'}}>
                    <S.radioselect src='/assets/img/progile/Caution/bark.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>친구 무서워요<br/></Text.Body2>
                    <Text.Body3>나를 보호해주세요</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(2)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(3)} selected={selectedCautions.includes(3)} style={{marginRight:'30px'}}>
                    <S.radioselect src='/assets/img/progile/Caution/Allergy.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>알러지가 있어요<br/></Text.Body2>
                    <Text.Body3>다 먹을 수 없어요😢</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(3)} size="M" mt="20"/>
                </S.NamekgWrap >
                <S.NamekgWrap onClick={() => selectCautions(4)} selected={selectedCautions.includes(4)}>
                    <S.radioselect src='/assets/img/progile/Caution/sound.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소리에 놀라요<br/></Text.Body2>
                    <Text.Body3>나는 소리에 민감해요!</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(4)} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinline>
            <S.CaptionTitlewrap>
                <Text.Body1>
                    <S.highlight style={{ fontWeight: 'bold'}}>선택 정보</S.highlight>
                </Text.Body1>
            </S.CaptionTitlewrap>
            <S.inputinline style={{marginTop:"24px"}}>
                <S.Content>
                    <Text.Body3>중성화 유무</Text.Body3>
                </S.Content>
                <S.NamekgWrap style={{marginRight:'30px'}}>
                    <BasicButton 
                        basicButton="superSmall" 
                        variant={form.neutralization === "yes" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => setForm({...form, neutralization: 'yes'})}>
                        유
                    </BasicButton>
                </S.NamekgWrap>
                <S.NamekgWrap>
                    <BasicButton 
                        basicButton="superSmall" 
                        variant={form.neutralization === "none" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() =>  setForm({...form, neutralization: 'none'})}>
                        무
                    </BasicButton>
                </S.NamekgWrap>
            </S.inputinline>
            <S.InputReguler onSubmit={handleFormSubmit} style={{marginTop:"182px"}}>
                <BasicButton 
                basicButton="superSmall" 
                variant="filled"
                style={{width:"200px",
                    cursor:'pointer'
                }}
                onClick={handleFormSubmit}
                type='submit'
                disabled={isSubmitting}>
                    다음
                </BasicButton>
            </S.InputReguler>
        </div>
    );
};

export default AddProfile;