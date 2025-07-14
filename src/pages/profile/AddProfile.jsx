import React, { useState } from 'react';
import BasicButton from '../../components/button/BasicButton';
import S from './style';
import Text from '../../components/text/size';
import BasicInput from '../../components/input/BasicInput';
import Container from '../../components/layout/Container';
import { ReactComponent as CalendarIcon } from "../../components/icons/calendar.svg";
import { ReactComponent as SearchIcon } from "../../components/icons/search.svg";
import SelectBox from "../../components/selectBox/SelectBox";
import Radio from '../../components/radio/Radio';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef } from "react";



const AddProfile = () => {
    
    
    const { register, handleSubmit, formState: {isSubmitting, isSubmitted, errors}, control, setValue } = useForm({ mode: "onChange" });
    const calendarRef = useRef(null);
    const [selectedGender, setSelectedGender] = useState(""); 
    const [selectedBreed, setSelectedBreed] = useState("");
    const [customBreed, setCustomBreed] = useState("");
    const [address, setAddress] = useState("");
    const [selectedNeutralization, setselectedNeutralization] = useState("")
    const [selected, setSelected] = useState("")

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

    //onValid, onInvalid

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
                        {...register("name", {
                            required: true
                        })}
                        />
                        {errors.name?.type === "required" && (
                        <span style={{color:"#f74c26"}}>이름을 입력해주세요.</span>
                        )}
                        </S.NamekgWrap>
                    <S.NamekgWrap >
                        <S.CaptionTitlewrap>몸무게</S.CaptionTitlewrap>
                        <S.InputButtonWrapper >
                            <BasicInput type="text" placeholder=""
                            {...register("weight", {
                                required: true
                            })}
                            />
                            {errors.weight?.type === "required" && (
                            <span style={{color:"#f74c26"}}>몸무게를 입력해주세요.</span>
                            )}                            
                            <Text.Body3>kg</Text.Body3>
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
                            {errors.weight?.type === "required" && (
                            <span style={{color:"#f74c26"}}>생년월일을 입력해주세요.</span>
                            )}                         
                            <CalendarIcon width={30} height={30} 
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
                            onClick={() => setSelectedGender('male')}>
                                남아
                            </BasicButton>
                        </S.NamekgWrap>
                        <S.NamekgWrap>
                            <BasicButton 
                            basicButton="superSmall" 
                            variant={selectedGender === "female" ? "filled" : "default"}
                            style={{width:"100%"}}
                            onClick={() => setSelectedGender('female')}>                                
                            여아
                            </BasicButton>
                        </S.NamekgWrap>
                    </S.inputinline>
                </S.InputReguler>
                <S.InputReguler >
                    <S.CaptionTitlewrap>주소</S.CaptionTitlewrap>
                    <S.InputButtonWrapper onClick={handleSearchAddress} style={{cursor:"pointer"}}>
                        <BasicInput 
                        type="text" 
                        value={address}
                        placeholder="도로명 주소를 검색하세요"
                        readOnly />
                        <SearchIcon width={30} height={30} />
                    </S.InputButtonWrapper>
                </S.InputReguler>
                <S.InputReguler >
                    <S.CaptionTitlewrap>품종</S.CaptionTitlewrap>
                    <S.InputButtonWrapper>
                        <SelectBox
                            options={BREEDS}
                            placeholder="강아지 품종을 선택하세요."
                            onSelect={(v) => setSelectedBreed(v)}
                            style={{width:"100%"}}/>
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
                                padding: "10px"
                             }}
                            ></BasicInput>
                        </S.InputButtonWrapper>
                    )}
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
                                />
                            <input
                                id="profile"
                                style={{ display: "none" }}
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />                            
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
               <S.inputinline>
                    <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect src='/assets/img/progile/personality/popularPuppy.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나는 개인싸!<br/></Text.Body2>
                        <Text.Body3>누구와도 잘 지내요</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect src='/assets/img/progile/personality/popularPuppy.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나를 따르라!<br/></Text.Body2>
                        <Text.Body3>가만히 있지 못해요!</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나랑만 있어줘...<br/></Text.Body2>
                        <Text.Body3>애착형이고 애교가 많아요</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>모든 건 규칙적!<br/></Text.Body2>
                        <Text.Body3>루틴과 규칙을 좋아해요</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinline>
                <S.inputinline>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.CaptionTitlewrap >우리 멍이가 좋아하는 것은?
                         <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
                </S.inputinline>
               <S.inputinline>
                    <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>간식이 좋아<br/></Text.Body2>
                        <Text.Body3>육포, 개껌, 치즈...</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>산책이 짱!<br/></Text.Body2>
                        <Text.Body3>산책 없이 못살아!</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>쉬는 게 최고<br/></Text.Body2>
                        <Text.Body3>힐링이 최고다 멍!</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>애카 가자!<br/></Text.Body2>
                        <Text.Body3>친구들이 제일 좋아!</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinline>
                <S.inputinline>
                        <S.CaptionTitlewrap>주의해 주세요!
                         <span style={{ color: '#CE5347', fontSize:'small' ,fontWeight: 'normal'}}>&nbsp;&nbsp;다중선택가능</span></S.CaptionTitlewrap>
                </S.inputinline>
               <S.inputinline>
                    <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>만지는 거 싫어!<br/></Text.Body2>
                        <Text.Body3>나는 예민해요</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>친구 무서워요<br/></Text.Body2>
                        <Text.Body3>나를 보호해주세요</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>알러지가 있어요<br/></Text.Body2>
                        <Text.Body3>다 먹을 수 없어요😢</Text.Body3>
                        <Radio size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소리에 놀라요<br/></Text.Body2>
                        <Text.Body3>나는 소리에 민감해요!</Text.Body3>
                        <Radio size="M" mt="20"/>
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

