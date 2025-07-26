import React, { useState } from 'react';
import S from './style';
import Text from '../../components/text/size';
import Radio from '../../components/radio/Radio';
import Container from '../../components/layout/Container';

const Caution = () => {

    const [selectedCaution, setSelectedCaution] = useState([]);
    const filterCaution = (id) => {
        setSelectedCaution((prev) => 
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    return (
        <Container style={{padding:0}}>
            <S.InputWrapper>
              <S.inputinline>
                    <S.NamekgWrap onClick={() => filterCaution(1)} selected={selectedCaution.includes(1)} style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>만지는 거 싫어!<br/></Text.Body2>
                        <Text.Body3>나는 예민해요</Text.Body3>
                        <Radio checked={selectedCaution.includes(1)} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={() => filterCaution(2)} selected={selectedCaution.includes(2)} style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>친구 무서워요<br/></Text.Body2>
                        <Text.Body3>나를 보호해주세요</Text.Body3>
                        <Radio checked={selectedCaution.includes(2)} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={() => filterCaution(3)} selected={selectedCaution.includes(3)} style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>알러지가 있어요<br/></Text.Body2>
                        <Text.Body3>다 먹을 수 없어요😢</Text.Body3>
                        <Radio checked={selectedCaution.includes(3)} size="M" mt="20"/>
                    </S.NamekgWrap >
                   <S.NamekgWrap onClick={() => filterCaution(4)} selected={selectedCaution.includes(4)}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>소리에 놀라요<br/></Text.Body2>
                        <Text.Body3>나는 소리에 민감해요!</Text.Body3>
                        <Radio checked={selectedCaution.includes(4)} size="M" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinline>
            </S.InputWrapper>
        </Container>
    );
};

export default Caution;