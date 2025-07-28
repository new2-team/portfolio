import React, { useState } from 'react';
import Container from '../../components/layout/Container';
import S from './style';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import BasicInput from '../../components/input/BasicInput';
import Radio from '../../components/radio/Radio';
import { useForm } from 'react-hook-form';

const AddHealthProfile = () => {
        const {  formState: {errors} } = useForm({ mode: "onChange" });
    
    const [vaccination, setVaccination] = useState([]); 

    const toggleVaccination = (type) => {
        setVaccination((prev) => {
        const isSelected = prev.includes(type);

      if (type === "none") {
        return isSelected ? [] : ["none"];
      }

    const withoutNone = prev.filter((v) => v !== "none");

      if (isSelected) {
        return withoutNone.filter((v) => v !== type);
      } else {
        return [...withoutNone, type];
      }
    });
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
                        {errors.vaccination?.type === "required" && (
                            <span style={{color:"#f74c26"}}>최소 1개의 백신이력을 선택해주세요.</span>
                            )}
                </S.inputinline>
                <S.TitleWrap > 
                    <Text.Body1>
                        <span style={{ color: '#CE5347', fontWeight: 'bold'}}>*&nbsp;</span>
                        <S.highlight style={{ fontWeight: 'bold'}}>병원 정보</S.highlight>
                    </Text.Body1>
                </S.TitleWrap>
                <S.NamekgWrap style={{width:"100%"}}>
                    <BasicInput type="text" placeholder="병원 이름"></BasicInput>
                </S.NamekgWrap>
                <S.InputButtonWrapper >
                    <BasicInput type="text" placeholder="병원 방문 주기"/>
                    <Text.Body3>개월</Text.Body3>
                </S.InputButtonWrapper>   
                <S.InputButtonWrapper>
                    <BasicInput type="text" placeholder="마지막 방문일" style={{boxSizing:"border-box"}}/>
                    <img src="/assets/icons/calendar.svg" width={30} height={30} alt="캘린더" />
                </S.InputButtonWrapper>
                <S.TitleWrap > 
                    <Text.Body1>
                        <S.highlight style={{ fontWeight: 'bold'}}>알러지 정보</S.highlight>
                    </Text.Body1>
                </S.TitleWrap>
                <S.NamekgWrap style={{width:"100%"}}>
                    <BasicInput type="text" placeholder="알러지 원인"></BasicInput>
                </S.NamekgWrap>
                <S.Content>
                    <Text.Body3>알러지 증상</Text.Body3>
                </S.Content>
               <S.inputinline>
                    <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>가려움증<br/></Text.Body2>
                        <Text.Body3>(간지러움)</Text.Body3>
                        <Radio size="S" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>피부 발진 및 붉어짐<br/></Text.Body2>
                        <Radio size="S" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>눈물 흘림 및 눈 주위 가려움<br/></Text.Body2>
                        <Text.Body3>(눈 염증)</Text.Body3>
                        <Radio size="S" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>귀 염증<br/></Text.Body2>
                        <Text.Body3>(외의염)</Text.Body3>
                        <Radio size="S" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소화문제<br/></Text.Body2>
                        <Text.Body3>(설사, 구토 등)</Text.Body3>
                        <Radio size="S" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinline>
                <S.InputReguler style={{marginTop:"182px"}}>
                    <BasicButton basicButton="superSmall" variant="default" style={{width:"200px"}}>
                        다음
                    </BasicButton>
                </S.InputReguler>
            </S.InputWrapper>
        </Container>
    );
};

export default AddHealthProfile;