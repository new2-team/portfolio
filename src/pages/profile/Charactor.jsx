import React, { useState } from 'react';
import S from './style';
import Text from '../../components/text/size';
import Radio from '../../components/radio/Radio';
import Container from '../../components/layout/Container';


const Charactor = () => {

    const [selectedCharactor, setSelectedCharactor] = useState();

    return (
         <Container style={{padding:0}}>
            <S.InputWrapper>
                <S.inputinline>
                    <S.NamekgWrap style={{marginRight:'30px'}} onClick={()=>setSelectedCharactor(1)} selectedCharactor={selectedCharactor === 1}>
                        <S.radioselect src='/assets/img/progile/personality/popularPuppy.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나는 개인싸!<br/></Text.Body2>
                        <Text.Body3>누구와도 잘 지내요</Text.Body3>
                        <Radio checked={selectedCharactor === 1} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap  style={{marginRight:'30px'}} onClick={()=>setSelectedCharactor(2)} selectedCharactor={selectedCharactor === 2}>
                        <S.radioselect src='/assets/img/progile/personality/popularPuppy.png'></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나를 따르라!<br/></Text.Body2>
                        <Text.Body3>가만히 있지 못해요!</Text.Body3>
                        <Radio checked={selectedCharactor === 2} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap style={{marginRight:'30px'}} onClick={()=>setSelectedCharactor(3)} selectedCharactor={selectedCharactor === 3}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>나랑만 있어줘...<br/></Text.Body2>
                        <Text.Body3>애착형이고 애교가 많아요</Text.Body3>
                        <Radio checked={selectedCharactor === 3} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={()=>setSelectedCharactor(4)} selectedCharactor={selectedCharactor === 4}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>모든 건 규칙적!<br/></Text.Body2>
                        <Text.Body3>루틴과 규칙을 좋아해요</Text.Body3>
                        <Radio checked={selectedCharactor === 4} size="M" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinline>                    
            </S.InputWrapper>
      </Container>
    );
};

export default Charactor;