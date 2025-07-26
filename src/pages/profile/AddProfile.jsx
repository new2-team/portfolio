import React, { useState } from 'react';
import BasicButton from '../../components/button/BasicButton';
import S from './style';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import Container from '../../components/layout/Container';
import SelectBox from "../../components/selectBox/SelectBox";
import Radio from '../../components/radio/Radio';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";
import Charactor from './Charactor';
import Favorit from './Favorit';
import Caution from './Caution';
import { flexCenter } from '../../styles/common';



const AddProfile = () => {
    
    
    const { register, handleSubmit, formState: {isSubmitting, isSubmitted, errors}, control, setValue } = useForm({ mode: "onChange" });
    const calendarRef = useRef(null);
    const [selectedGender, setSelectedGender] = useState(""); 
    const [selectedBreed, setSelectedBreed] = useState("");
    const [customBreed, setCustomBreed] = useState("");
    const [address, setAddress] = useState("");
    const [selectedNeutralization, setselectedNeutralization] = useState("")
    const [selected, setSelected] = useState("")
    const [error, setError] = useState('');

    const handleSearchAddress = () => {
        new window.daum.Postcode({
        oncomplete: function (data) {
            setAddress(data.roadAddress); // 선택된 도로명 주소 설정
        },
        }).open();
    };
    

    const BREEDS = ["말티푸", "시츄", "골든리트리버", "푸들", "보더콜리", "비숑프리제",
        "포메라니안", "닥스훈트", "치와와", "요크셔테리어", "이탈리안 그레이하운드", "퍼그",
         "기타" 
    ];

    const [imageSrc, setImageSrc] = useState(null); 
    const fileInputRef = useRef(null);
    const [thumbnail, setThumbnail] = useState(null); //상태 수정을 위한 경로

    //이미지선택
    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){ 
        const reader = new FileReader()
        reader.onloadend = () => {
            setImageSrc(reader.result)
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
        setSelectedGender(gender);
        setValue('gender', gender, { shouldValidate: true }); // 유효성 검사도 동시에 트리거
    };

    const onValid = (data) => {
        console.log("폼 유효! 제출데이터", data);
        setSelected("next");
    };

    const onInvalid = (errors) => {
        console.log("유효성 검사 실패~!", errors);
    }

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
                        {...register("name", {required: true})}
                        />
                        {errors.name?.type === "required" && (
                        <span style={{color:"#f74c26"}}>이름을 입력해주세요.</span>
                        )}
                        </S.NamekgWrap>
                    <S.NamekgWrap >
                        <S.CaptionTitlewrap>몸무게</S.CaptionTitlewrap>
                        <S.InputButtonWrapper >
                            <Text.Body3>kg</Text.Body3>
                            <BasicInput s type="text" placeholder=""
                            {...register("weight", {required: true})}
                            />
                            <div style={{width:"100%", textAlign:"center"}}>
                            {errors.weight?.type === "required" && (
                                <span style={{color:"#f74c26"}}>몸무게를 입력해주세요.</span>
                            )}                            
                            </div>
                        </S.InputButtonWrapper>
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
                            display='block'
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="YYYY-MM-DD"
                            customInput={
                                <BasicInput style={{ width: "100%"}} />
                            }
                            ref={calendarRef}
                            />
                            )}
                            />
                        </S.InputButtonWrapper> 
                        <div>style={{width:"100%", textAlign:"center"}}</div>
                        {errors.birthDate?.type === "required" && (
                            <span style={{color:"#f74c26"}}>생년월일을 입력해주세요.</span>
                            )}                    
                            <img src="/assets/icons/calendar.svg" width={30} height={30} alt="캘린더" 
                        onClick={() => calendarRef.current?.setFocus()}
                        style={{ position: "absolute", cursor: "pointer", marginLeft: "8px" }}/>
                </S.InputReguler>
                <S.InputReguler>
                    <S.CaptionTitlewrap>성별</S.CaptionTitlewrap>
                    <S.inputinline>
                        <S.NamekgWrap style={{marginRight:"30px"}}>
                            <BasicButton 
                            basicButton="superSmall" 
                            variant={selectedGender === "male" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => handleGenderClick('male')}>
                                남아
                            </BasicButton>
                        </S.NamekgWrap>
                        <S.NamekgWrap>
                            <BasicButton
                            basicButton="superSmall" 
                            variant={selectedGender === "female" ? "filled" : "default"}
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
                    <div  style={{width:"100%", textAlign:"center"}}>
                    {errors.gender && (
                        <span style={{color:"#f74c26"}}>
                            {errors.gender.message}
                        </span>
                    )}                            
                    </div>
                </S.InputReguler>
                <S.InputReguler >
                    <S.CaptionTitlewrap>주소</S.CaptionTitlewrap>
                        <S.InputButtonWrapper 
                        onClick={handleSearchAddress} style={{cursor:"pointer"}}>
                        <BasicInput 
                        type="text" 
                        value={address}
                        placeholder="도로명 주소를 검색하세요"
                        readOnly />
                        <img src="/assets/icons/search.svg" width={30} height={30} alt="검색" />
                    </S.InputButtonWrapper>
                    <div style={{width:"100%", textAlign:"center"}}>
                        {errors.address?.type === "required" && (
                        <span style={{color:"#f74c26"}}>품종을 선택해주세요.</span>
                        )}                       
                    </div>
                </S.InputReguler>
                <S.InputReguler >
                    <S.CaptionTitlewrap>품종</S.CaptionTitlewrap>
                    <S.InputButtonWrapper>
                        <SelectBox
                            options={BREEDS}
                            placeholder="강아지 품종을 선택하세요."
                            {...register("breed", {required: true})}
                            onSelect={(v) => setSelectedBreed(v)}
                            style={{width:"100%"}}
                            />
                    </S.InputButtonWrapper>
                    {selectedBreed  === "기타" && (
                        <S.InputButtonWrapper style={{marginTop:"10px"}}>
                            <BasicInput
                            type="text"
                            placeholder="직접 입력해주세요"
                             value={customBreed}
                             onChange={(e) => setCustomBreed(e.target.value)}
                             style={{
                                width: "100%",
                                height: "64px",
                                padding: "20px 24px"
                             }}
                            ></BasicInput>
                        </S.InputButtonWrapper>
                    )}
                    <div style={{width:"100%", textAlign:"center"}}>
                        {errors.breed?.type === "required" && (
                        <span style={{color:"#f74c26"}}>품종을 선택해주세요.</span>
                        )}                         
                    </div>
                </S.InputReguler>
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
                                src={imageSrc} 
                                style={{marginTop:"30px"}}
                                onClick={handleClick}
                                {...register("profilePhoto", {required: true})}
                                />
                            <input
                                id="profile"
                                style={{ display: "none" }}
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        <div style={{width:"100%", textAlign:"center"}}>
                            {errors.profilePhoto?.type === "required" && (
                            <span style={{color:"#f74c26"}}>사진을 등록해주세요</span>
                            )}                         
                        </div>
                    </S.NamekgWrap>
                        <S.NamekgWrap >
                            <S.CaptionTitlewrap >별명</S.CaptionTitlewrap>
                            <BasicInput type="text" placeholder="간식요정"></BasicInput>
                            <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 간식</S.CaptionTitlewrap>
                            <BasicInput type="text" placeholder="육포, 치즈, 연어 ..."></BasicInput>
                            <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>좋아하는 산책코스</S.CaptionTitlewrap>
                            <BasicInput type="text" placeholder="집 주변 공원"></BasicInput>
                            <S.CaptionTitlewrap style={{margin:"70px 0 0 0"}}>새 친구에게 한마디!</S.CaptionTitlewrap>
                            <BasicInput style={{height:"100px"}} type="text" placeholder="친구들과 뛰어 놀 준비 완료!"></BasicInput>                        
                        </S.NamekgWrap>                
                </S.inputinline>
                <S.TitleWrap style={{marginTop:"42px"}}> 
                    <Text.Body1>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.highlight style={{ fontWeight: 'bold'}}>기타 정보</S.highlight>
                    </Text.Body1>
                </S.TitleWrap>

                <S.inputinline>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.CaptionTitlewrap >우리 멍이의 성격은?</S.CaptionTitlewrap>
                </S.inputinline>

                {/*  기타정보-강아지 성격 */}
                <Charactor></Charactor>
                <S.inputinline>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.CaptionTitlewrap >우리 멍이가 좋아하는 것은?
                         <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
                </S.inputinline>

                {/*  기타정보-강아지 취향 */}
                <Favorit></Favorit>
                <S.inputinline>
                        <S.CaptionTitlewrap>주의해 주세요!
                         <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
                </S.inputinline>

                {/* 기타정보-강아지 주의할 점 */}
                    <Caution></Caution>
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
                            variant={selectedNeutralization === "yes" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => setselectedNeutralization('yes')}>
                            유
                        </BasicButton>
                    </S.NamekgWrap>
                    <S.NamekgWrap>
                        <BasicButton 
                            basicButton="superSmall" 
                            variant={selectedNeutralization === "none" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => setselectedNeutralization('none')}>
                            무
                        </BasicButton>
                    </S.NamekgWrap>
                </S.inputinline>
                <S.InputReguler style={{marginTop:"182px"}}>
                    <BasicButton 
                    basicButton="superSmall" 
                    variant={selected === "next" ? "filled" : "default"}
                    style={{width:"200px"}}
                    onClick={handleSubmit(onValid, onInvalid)}
                    disabled={isSubmitting}>
                        다음
                    </BasicButton>
                </S.InputReguler>
            </S.InputWrapper>
        </Container>
    );
};

export default AddProfile;

