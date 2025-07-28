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
import Charactor from './Charactor';
import Favorit from './Favorit';
import Caution from './Caution';
import { isValid } from 'date-fns';



const AddProfile = () => {
    
    const calendarRef = useRef(null);
    const fileInputRef = useRef(null);
    const charactorRef = useRef();
    const favoritRef = useRef();
    const cautionRef = useRef();

    const { register, handleSubmit, formState: {isSubmitting, errors}, control, setValue } = useForm({ mode: "onChange" });
    const[selectedCharactor, setSelectedCharactor] = useState();
    const [thumbnail, setThumbnail] = useState(null); //상태 수정을 위한 경로
    const [form, setForm] = useState({
        name:'',
        weight:'',
        birthDate: null,
        gender:'',
        breed:'',
        custombreed:'',
        address:'',
        neutralization:'',
        imageSrc:'',
        nickname:'',
        favoriteSnack:'',
        walkingCourse:'',
        messageToFriend:'',
        charactor:null,
        favorites:[],
        cautions:[],
    });

    const [validationErrors, setValidationErrors] = useState({ isValid: false});
    const [hasSubmitted, setHasSubmitted] = useState(false);

         // 기본정보 유효성 검사 (formData와 form 상태 모두 확인)
        const validateAllFields = (formData) => {
            const errors = {};

            const name = formData.name || form.name;
            if (!name || name.trim() === '') {
                errors.name = "이름을 입력해주세요.";
            }
            
            const weight = formData.weight || form.weight;
            if (!weight || weight.trim() === '') {
                errors.weight = "몸무게를 입력해주세요.";
            }
            
            const birthDate = formData.birthDate || form.birthDate;
            if (!birthDate) {
                errors.birthDate = "생년월일을 입력해주세요.";
            }
            
            const gender = formData.gender || form.gender;
            if (!gender) {
                errors.gender = "성별을 선택해주세요.";
            }
            
            const address = form.address; // 주소는 form 상태에서만 관리
            if (!form.address || address.trim() === '') {
                errors.address = "주소를 검색해주세요.";
            }
            
            const breed = form.breed; // 품종은 form 상태에서만 관리
            if (!breed) {
                errors.breed = "품종을 선택해주세요.";
            }

            // 프로필 카드 유효성 검사
            if (!form.imageSrc) {
                errors.profilePhoto = "프로필 사진을 등록해주세요.";
            }
            
            const nickname = formData.nickname || form.nickname;
            if (!nickname || nickname.trim() === '') {
                errors.nickname = "별명을 입력해주세요.";
            }
            
            const favoriteSnack = formData.favoriteSnack || form.favoriteSnack;
            if (!favoriteSnack || favoriteSnack.trim() === '') {
                errors.favoriteSnack = "좋아하는 간식을 입력해주세요.";
            }
            
            const walkingCourse = formData.walkingCourse || form.walkingCourse;
            if (!walkingCourse || walkingCourse.trim() === '') {
                errors.walkingCourse = "좋아하는 산책코스를 입력해주세요.";
            }
            
            const messageToFriend = formData.messageToFriend || form.messageToFriend;
            if (!messageToFriend || messageToFriend.trim() === '') {
                errors.messageToFriend = "새 친구에게 한마디를 입력해주세요.";
            }

            // if (charactorRef.current){
            //     const charactorValue = charactorRef.current.getValue();
                const charactorValue = form.charactor
                if (!charactorValue) {
                    errors.Charactor = "우리 멍이의 성격을 선택해주세요";
                }
            

            // if (favoritRef.current){
                const favoritValue = favoritRef.current.getValue();
                if (!favoritValue.isValid) {
                    errors.Favorit = "우리 멍이가 좋아하는 것을 선택해주세요";
                // }
            }

            console.log('검증 중인 데이터:', { formData, form, errors }); // 디버깅용
            return errors;
        };

    const ErrorMessage = ({ show, message}) => {
        if (!show) return null;
        return (
            <div style={{textAlign:"center"}}>
                <span style={{color:"#f74c26"}}>{message}</span>
            </div>
        );
    };

        useImperativeHandle(charactorRef, () => ({
        validate: () => {
            return { isValid: selectedCharactor !== null };
        },
        getValue: () => selectedCharactor,
    }));
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

    const handleGenderClick = (gender) => {
        setForm({...form, gender});
        setValue('gender', gender, { shouldValidate: true }); // 유효성 검사도 동시에 트리거
    };

    const handleFormSubmit = (data) => {
        setHasSubmitted(true);
        
        const errors = validateAllFields(data);
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
        // 다음 단계로 이동하는 로직mergedData
    
        };


    return (
        <Container style={{marginTop:"195px",marginBottom:"550px"}}>
            <S.InputWrapper>
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
                <S.InputReguler>
                    <S.CaptionTitlewrap>생년월일</S.CaptionTitlewrap>
                    <S.InputButtonWrapper>
                        <Controller 
                            name="birthDate"
                            control={control}
                            rules={{ required: "생년월일을 선택해주세요" }}
                            render={({ field }) => (
                                <DatePicker
                                // display='block'
                                selected={field.value}
                                onChange={(date) => {
                                    field.onChange(date);
                                    setForm({...form, birthDate: date})
                                }}
                                dateFormat="yyyy-MM-dd"
                                placeholderText="YYYY-MM-DD"
                                customInput={<BasicInput style={{ width: "300px"}}/>}
                                ref={calendarRef}
                                />
                            )}
                            />
                        <img src="/assets/icons/calendar.svg" width={30} height={30} alt="캘린더" 
                            onClick={() => calendarRef.current?.setFocus()}
                            style={{ position: "absolute", cursor: "pointer", marginLeft: "8px" }}/>
                    </S.InputButtonWrapper>
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
                                남아
                            </BasicButton>
                        </S.NamekgWrap>
                        <S.NamekgWrap>
                            <BasicButton
                            basicButton="superSmall" 
                            variant={form.gender === "female" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => handleGenderClick('female')}>                                
                            여아
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
                <S.InputReguler >
                    <S.CaptionTitlewrap>주소</S.CaptionTitlewrap>
                        <S.InputButtonWrapper 
                        onClick={handleSearchAddress} 
                        style={{
                            display:'flex',
                            alignItems: 'center',
                            position:'relative',
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
                        alt="검색" 
                        style={{
                            position:'absolute',
                            right:'10px'}}/>
                    </S.InputButtonWrapper>
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
                            style={{width:"100%"}}
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
                            src={form.imageSrc} 
                            style={{marginTop:"30px"}}
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
                <Charactor
                    ref={charactorRef}/>

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
                <Favorit
                    ref={favoritRef}/>

                {/* 기타정보-강아지 주의할 점 */}
                <S.inputinline>
                    <S.CaptionTitlewrap>주의해 주세요!
                        <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
                </S.inputinline>

                <Caution
                    ref={cautionRef}/>
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
                <S.InputReguler style={{marginTop:"182px"}}>
                    <BasicButton 
                    basicButton="superSmall" 
                    variant="filled"
                    style={{width:"200px",
                        cursor:'pointer'
                    }}
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}>
                        다음
                    </BasicButton>
                </S.InputReguler>
            </S.InputWrapper>
        </Container>
    );
};

export default AddProfile;