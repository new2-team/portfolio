import React, { useEffect, useState } from 'react';
import BasicButton from '../../components/button/BasicButton';
import S from './style';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import SelectBox from "../../components/selectBox/SelectBox";
import { Controller, useForm } from 'react-hook-form';
import { useRef } from "react";
import Radio from '../../components/radio/Radio';
import Checkbox from '../../components/checkbox/Checkbox';
import DatePickerSingle from './DatePickerSingle';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

const AddProfile = ({ onProfileComplete }) => {
    const calendarRef = useRef(null);
    const fileInputRef = useRef(null);
    const location = useLocation();
    
    // React Hook Form 설정
    const { register, handleSubmit, control, setValue, watch, formState: { isSubmitting } } = useForm({ 
        mode: "onChange" 
    });
    
    // 편집 모드 확인
    const isEditMode = location.state?.mode === 'edit';
    const userData = location.state?.userData || {};
    
    // 선택 상태 관리
    const [selectedCharactor, setSelectedCharactor] = useState(1);
    const [selectedFavorite, setSelectedFavorite] = useState([1]);
    const [selectedCautions, setSelectedCautions] = useState([]); // 선택사항이므로 빈 배열
    const [selectedDate, setSelectedDate] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    
    // 검증 상태
    const [validationErrors, setValidationErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // 초기값 설정
    useEffect(() => {
        if (!isEditMode) {
            // 신규 등록 시 기본값 설정
            setValue("charactor", 1);
            setValue("favorites", 1);
            setValue("cautions", []); // 선택사항이므로 빈 배열
            setValue("gender", "male");
        }
    }, [isEditMode, setValue]);

    // 품종 옵션
    const BREEDS = [
        "말티푸", "시츄", "골든리트리버", "푸들", "보더콜리", "비숑프리제",
        "포메라니안", "닥스훈트", "치와와", "요크셔테리어", "이탈리안 그레이하운드", "퍼그", "기타"
    ];

    // 주소 검색
    const handleSearchAddress = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                setValue("address", data.roadAddress);
            },
        }).open();
    };

    // 이미지 선택
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 성별 선택
    const handleGenderClick = (gender) => {
        setValue('gender', gender, { shouldValidate: true });
    };

    // 성격 선택
    const selectCharactor = (id) => {
        setSelectedCharactor(id);
        setValue("charactor", id, { shouldValidate: true });
    };

    // 좋아하는 것 선택 (다중선택)
    const selectFavorite = (id) => {
        setSelectedFavorite((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            setValue("favorites", updated, { shouldValidate: true });
            return updated;
        });
    };

    // 주의할 점 선택 (다중선택)
    const selectCautions = (id) => {
        setSelectedCautions((prev) => {
            const updated = prev.includes(id) 
                ? prev.filter((v) => v !== id) 
                : [...prev, id];
            setValue("cautions", updated, { shouldValidate: true });
            return updated;
        });
    };

    // 폼 제출
    const handleFormSubmit = (data) => {
        setHasSubmitted(true);
        
        // 숫자를 실제 타이틀로 변환하는 함수
        const getCharactorTitle = (id) => {
            switch(id) {
                case 1: return "나는 개인싸! (누구와도 잘 지내요)";
                case 2: return "나를 따르라! (가만히 있지 못해요!)";
                case 3: return "나랑만 있어줘... (애착형이고 애교가 많아요)";
                case 4: return "조금 조심스럽개! (수줍음이 많아요)";
                default: return "";
            }
        };

        const getFavoriteTitle = (id) => {
            switch(id) {
                case 1: return "간식이 좋아 (육포, 개껌, 치즈...)";
                case 2: return "산책이 짱! (산책 없이 못살아!)";
                case 3: return "쉬는 게 최고 (힐링이 최고다 멍!)";
                case 4: return "애카 가자! (친구들이 제일 좋아!)";
                default: return "";
            }
        };

        const getCautionTitle = (id) => {
            switch(id) {
                case 1: return "만지는 거 싫어! (나는 예민해요)";
                case 2: return "친구 무서워요 (나를 보호해주세요)";
                case 3: return "알러지가 있어요 (다 먹을 수 없어요😢)";
                case 4: return "소리에 놀라요 (나는 소리에 민감해요!)";
                default: return "";
            }
        };
        
        // 기본값 설정 및 타이틀로 변환
        const profileData = {
            ...data,
            charactor: getCharactorTitle(data.charactor || selectedCharactor),
            favorites: (data.favorites || selectedFavorite).map(getFavoriteTitle).filter(Boolean),
            cautions: (data.cautions || selectedCautions).map(getCautionTitle).filter(Boolean),
            gender: data.gender || 'male',
            imageSrc: imageSrc
        };
        
        console.log('전송할 프로필 데이터:', profileData);
        
        if (onProfileComplete) {
            onProfileComplete(profileData);
        }
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

    return (
        <div style={{marginTop:"195px",marginBottom:"550px"}}>
            {/* 기본정보 섹션 */}
            <S.TitleWrap> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold', fontSize: '30px'}}>기본정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
            
            {/* 이름과 몸무게 */}
            <S.inputinline>
                <S.NamekgWrap style={{marginRight:'30px'}}>
                    <S.CaptionTitlewrap>내 이름은,</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="멍이의 이름을 입력해주세요"
                        {...register("name", { required: true })}
                    />
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.name}
                        message={validationErrors.name}   
                    />
                </S.NamekgWrap>
                <S.NamekgWrap>
                    <S.CaptionTitlewrap>몸무게</S.CaptionTitlewrap>
                    <S.InputButtonWrapper>
                        <Text.Body3>kg</Text.Body3>
                        <BasicInput 
                            type="text" 
                            placeholder=""
                            {...register("weight", { required: true })}
                        /> 
                    </S.InputButtonWrapper>
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.weight}
                        message={validationErrors.weight}  
                    />
                </S.NamekgWrap>
            </S.inputinline>

            {/* 생년월일 */}
            <S.InputReguler style={{position:'relative'}}>
                <S.CaptionTitlewrap>생년월일</S.CaptionTitlewrap>
                <div style={{position:'relative', width:'100%'}}>
                    <BasicInput
                        defaultValue={selectedDate ? dayjs(selectedDate).format("YYYY-MM-DD") : ""}
                        placeholder="생년월일을 입력해주세요"
                        required
                        readOnly
                        onClick={() => calendarRef.current?.setFocus()}
                    />
                    <img 
                        src="/assets/icons/calendar.svg" 
                        width={30} height={30} alt="캘린더" 
                        onClick={() => calendarRef.current?.setFocus()}
    
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
                                    setValue("birthDate", date);
                                }}
                            />
                        )}
                    /> 
                </div>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.birthDate}
                    message={validationErrors.birthDate}  
                />
            </S.InputReguler>

            {/* 성별 */}
            <S.InputReguler>
                <S.CaptionTitlewrap>성별</S.CaptionTitlewrap>
                <S.inputinline style={{marginTop:"0"}}>
                    <S.NamekgWrap style={{marginRight:"30px"}}>
                        <BasicButton 
                            basicButton="small" 
                            variant={watch("gender") === "male" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => handleGenderClick('male')}>
                            남
                        </BasicButton>
                    </S.NamekgWrap>
                    <S.NamekgWrap>
                        <BasicButton
                            basicButton="small" 
                            variant={watch("gender") === "female" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => handleGenderClick('female')}>                                
                            여
                        </BasicButton>
                    </S.NamekgWrap>
                </S.inputinline>
                <input
                    type='hidden'
                    {...register("gender", {
                        required:"성별을 선택해주세요.", 
                        validate: (value) => value === "male" || value === "female" || "성별을 선택해주세요."
                    })}
                />
                <ErrorMessage
                    show={hasSubmitted && validationErrors.gender}
                    message={validationErrors.gender}  
                />
            </S.InputReguler>

            {/* 주소 */}
            <S.InputReguler>
                <S.CaptionTitlewrap>주소</S.CaptionTitlewrap>
                <div 
                    onClick={handleSearchAddress} 
                    style={{
                        width:'100%',
                        display:'flex',
                        alignItems: 'center',
                        position:'relative',
                        cursor:"pointer",
                    }}>
                    <BasicInput 
                        type="text" 
                        value={watch("address") || ""}
                        placeholder="도로명 주소를 검색하세요"
                        readOnly
                        {...register("address", { required: "주소를 검색해주세요" })}
                    />
                    <img 
                        src="/assets/icons/search.svg" 
                        width={30} height={30} 
                        alt="검색" 
                    />
                </div>
                <ErrorMessage
                    show={hasSubmitted && validationErrors.address}
                    message={validationErrors.address}  
                />
            </S.InputReguler>

            {/* 품종 */}
            <S.InputReguler>
                <S.CaptionTitlewrap>품종</S.CaptionTitlewrap>
                <S.InputButtonWrapper>
                    <SelectBox
                        options={BREEDS}
                        placeholder="강아지 품종을 선택하세요."
                        {...register("breed", {required: true})}
                        onSelect={(v) => setValue("breed", v)}
                        style={{width:"100%", cursor:"pointer"}}
                    />
                </S.InputButtonWrapper>
                {watch("breed") === "기타" && (
                    <S.InputButtonWrapper style={{marginTop:"10px"}}>
                        <BasicInput
                            type="text"
                            placeholder="직접 입력해주세요"
                            {...register("custombreed")}
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
            <S.TitleWrap style={{marginTop:"100px"}}> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold', fontSize: '30px'}}>프로필 카드 정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
            
            <S.inputinline style={{gap:"50px"}}>
                {/* 프로필 사진 */}
                <S.NamekgWrap style={{display:"flex", justifyContent:"center"}}>
                    <S.CaptionTitlewrap style={{textAlign:"center" , fontSize:"20px" , color:"#CE5347"}}>
                        우리 멍이의 대표 프로필 사진을 등록해주세요!
                    </S.CaptionTitlewrap>
                    <S.ProfileWrap onClick={() => fileInputRef.current.click()}>
                        <S.Profile 
                            src={imageSrc || "/assets/img/progile/camera.png"} 
                        />
                    </S.ProfileWrap>
                    <BasicButton
                        roundButton="small"
                        variant="filled"
                        style={{marginTop:"60px" , }}
                        onClick={() => fileInputRef.current.click()}
                    >
                        사진 등록하기
                    </BasicButton>
                  
                    <input
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
                
                {/* 프로필 정보 */}
                <S.NamekgWrap>
                    <S.CaptionTitlewrap>별명</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="간식요정"
                        {...register("nickname", { required: true })}
                        style={{marginTop:"20px"}}
                    />
                    <ErrorMessage 
                        show={hasSubmitted && validationErrors.nickname}
                        message={validationErrors.nickname}  
                    />
                    
                    <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 간식</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="육포, 치즈, 연어 ..."
                        {...register("favoriteSnack", { required: true })}
                        style={{marginTop:"20px"}}
                    />
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.favoriteSnack}
                        message={validationErrors.favoriteSnack}  
                    />
                    
                    <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 산책코스</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="집 주변 공원"
                        {...register("walkingCourse", { required: true })}
                        style={{marginTop:"20px"}}
                    />
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.walkingCourse}
                        message={validationErrors.walkingCourse}  
                    />
                    
                    <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>새 친구에게 한마디!</S.CaptionTitlewrap>
                    <BasicInput 
                        type="text" 
                        placeholder="친구들과 뛰어 놀 준비 완료!"
                        maxLength={15}
                        {...register("messageToFriend", { 
                            required: true,
                            maxLength: {
                                value: 15,
                                message: "15글자 이내로 작성해주세요"
                            }
                        })}
                        style={{marginTop:"20px"}}
                    />
                    <div style={{textAlign: "right", fontSize: "12px", color: "#666", marginTop: "5px"}}>
                        {watch("messageToFriend")?.length || 0}/15
                    </div>
                    <ErrorMessage
                        show={hasSubmitted && validationErrors.messageToFriend}
                        message={validationErrors.messageToFriend}  
                    />
                </S.NamekgWrap>                
            </S.inputinline>

            {/* 기타 정보 섹션 */}
            <S.TitleWrap style={{marginTop:"100px"}}> 
                <Text.Body1>
                    <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                    <S.highlight style={{ fontWeight: 'bold', fontSize: '30px'}}>기타 정보</S.highlight>
                </Text.Body1>
            </S.TitleWrap>
            
            {/* 성격 선택 */}
            <S.inputinline>
                <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                    <Text.Body3><span style={{color: '#CE5347', fontWeight: 'bold' , marginRight:"10px"}}>*</span>우리 멍이의 성격은?</Text.Body3>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(단일선택)</span>
                </S.CaptionTitlewrap>
            </S.inputinline>
            
            <S.inputinlineImg>
                <S.NamekgWrap onClick={()=>selectCharactor(1)}>
                    <S.radioselect src='/assets/img/progile/personality/popularity.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나는 개인싸!<br/></Text.Body2>
                    <Text.Body3>누구와도 잘 지내요</Text.Body3>
                    <Radio checked={selectedCharactor === 1} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(2)}>
                    <S.radioselect src='/assets/img/progile/personality/leader.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나를 따르라!<br/></Text.Body2>
                    <Text.Body3>가만히 있지 못해요!</Text.Body3>
                    <Radio checked={selectedCharactor === 2} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(3)}>
                    <S.radioselect src='/assets/img/progile/personality/attractiveness.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나랑만 있어줘...<br/></Text.Body2>
                    <Text.Body3>애착형이고 애교가 많아요</Text.Body3>
                    <Radio checked={selectedCharactor === 3} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={()=>selectCharactor(4)}>
                    <S.radioselect src='/assets/img/progile/personality/shy.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>조금 조심스럽개!<br/></Text.Body2>
                    <Text.Body3>수줍음이 많아요</Text.Body3>
                    <Radio checked={selectedCharactor === 4} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinlineImg>
            
            <input
                type='hidden'
                {...register("charactor", {
                    required:"멍이의 성격을 선택해주세요", 
                    validate: (value) => {
                        const validOptions = [1, 2, 3, 4];
                        return validOptions.includes(value) || "멍이의 성격을 선택해주세요"
                    }
                })}
            />

            {/* 좋아하는 것 선택 */}
            <S.inputinline>
                <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                    <Text.Body3><span style={{color: '#CE5347', fontWeight: 'bold' , marginRight:"10px"}}>*</span>우리 멍이가 좋아하는 것은?</Text.Body3>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(다중선택가능)</span>
                </S.CaptionTitlewrap>
            </S.inputinline>
            
            <S.inputinlineImg>
                <S.NamekgWrap onClick={() => selectFavorite(1)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/snack.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>간식이 좋아<br/></Text.Body2>
                    <Text.Body3>육포, 개껌, 치즈...</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(1)} size="L" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(2)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/walk.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>산책이 짱!<br/></Text.Body2>
                    <Text.Body3>산책 없이 못살아!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(2)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(3)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/healing.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>쉬는 게 최고<br/></Text.Body2>
                    <Text.Body3>힐링이 최고다 멍!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(3)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectFavorite(4)}>
                    <S.radioselect src='/assets/img/progile/favoriteThing/friend.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>애카 가자!<br/></Text.Body2>
                    <Text.Body3>친구들이 제일 좋아!</Text.Body3>
                    <Checkbox checked={selectedFavorite.includes(4)} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinlineImg>

            {/* 주의할 점 선택 */}
            <S.inputinline>
                <S.CaptionTitlewrap style={{display:'flex', alignItems:'center'}}>
                    <Text.Body3><span style={{color: '#CE5347', fontWeight: 'bold' , marginRight:"10px"}}>*</span>주의해 주세요!</Text.Body3>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(다중선택가능)</span>
                </S.CaptionTitlewrap>
            </S.inputinline>

                        <S.inputinlineImg>
                <S.NamekgWrap onClick={() => selectCautions(1)}>
                    <S.radioselect src='/assets/img/progile/Caution/touch.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>만지는 거 싫어!<br/></Text.Body2>
                    <Text.Body3>나는 예민해요</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(1)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(2)}>
                    <S.radioselect src='/assets/img/progile/Caution/bark.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>친구 무서워요<br/></Text.Body2>
                    <Text.Body3>나를 보호해주세요</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(2)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(3)}>
                    <S.radioselect src='/assets/img/progile/Caution/Allergy.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>알러지가 있어요<br/></Text.Body2>
                    <Text.Body3>다 먹을 수 없어요😢</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(3)} size="M" mt="20"/>
                </S.NamekgWrap>
                <S.NamekgWrap onClick={() => selectCautions(4)}>
                    <S.radioselect src='/assets/img/progile/Caution/sound.png'></S.radioselect>
                    <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소리에 놀라요<br/></Text.Body2>
                    <Text.Body3>나는 소리에 민감해요!</Text.Body3>
                    <Checkbox checked={selectedCautions.includes(4)} size="M" mt="20"/>
                </S.NamekgWrap>
            </S.inputinlineImg>

            {/* 선택 정보 - 중성화 */}
            <S.CaptionTitlewrap style={{marginTop:"100px"}}>
                <Text.Body1>
                    <S.highlight style={{ fontWeight: 'bold'}}>중성화 여부</S.highlight>
                    <span style={{ color: '#CE5347', fontSize:'16px' ,fontWeight: 'bold', marginLeft:'10px'}}>(선택사항)</span>
                </Text.Body1>
            </S.CaptionTitlewrap>
            
            <S.inputinline style={{display:"flex", alignItems:"center"}}>
                <S.NamekgWrap style={{marginRight:'30px'}}>
                    <BasicButton 
                        basicButton="small" 
                        variant={watch("neutralization") === "yes" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => setValue("neutralization", "yes")}>
                        유
                    </BasicButton>
                </S.NamekgWrap>
                <S.NamekgWrap>
                    <BasicButton 
                        basicButton="small" 
                        variant={watch("neutralization") === "none" ? "filled" : "default"}
                        style={{width:"100%"}}
                        onClick={() => setValue("neutralization", "none")}>
                        무
                    </BasicButton>
                </S.NamekgWrap>
            </S.inputinline>

            {/* 제출 버튼 */}
            <S.InputReguler onSubmit={handleFormSubmit} style={{marginTop:"182px"}}>
                <BasicButton 
                    basicButton="superSmall" 
                    variant="filled"
                    style={{width:"200px", cursor:'pointer'}}
                    onClick={handleSubmit(handleFormSubmit)}
                    type='submit'
                    disabled={isSubmitting}>
                    다음
                </BasicButton>
            </S.InputReguler>
        </div>
    );
};

export default AddProfile;