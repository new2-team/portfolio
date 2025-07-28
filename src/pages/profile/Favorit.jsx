import React, { forwardRef, useImperativeHandle, useState } from 'react';
import S from './style';
import Text from '../../components/text/size';
import Radio from '../../components/radio/Radio';
import Container from '../../components/layout/Container';

const Favorit = forwardRef((_, ref) => {

    const [selectedFavorite, setSelectedFavorite] = useState([]);

    useImperativeHandle(ref, () => ({
        getValue: () => ({
            isValid: selectedFavorite.length > 0,
            value: selectedFavorite
        })
    }));

    const selectFavorite = (id) => {
        setSelectedFavorite((prev) => 
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    return (
            <Container style={{padding:0}}>
            <S.InputWrapper>
                <S.inputinline>
                    <S.NamekgWrap onClick={() => selectFavorite(1)} selected={selectedFavorite.includes(1)} style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>간식이 좋아<br/></Text.Body2>
                        <Text.Body3>육포, 개껌, 치즈...</Text.Body3>
                        <Radio checked={selectedFavorite.includes(1)} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={() => selectFavorite(2)} selected={selectedFavorite.includes(2)} style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>산책이 짱!<br/></Text.Body2>
                        <Text.Body3>산책 없이 못살아!</Text.Body3>
                        <Radio checked={selectedFavorite.includes(2)} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={() => selectFavorite(3)} selected={selectedFavorite.includes(3)} style={{marginRight:'30px'}}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>쉬는 게 최고<br/></Text.Body2>
                        <Text.Body3>힐링이 최고다 멍!</Text.Body3>
                        <Radio checked={selectedFavorite.includes(3)} size="M" mt="20"/>
                    </S.NamekgWrap>
                   <S.NamekgWrap onClick={() => selectFavorite(4)} selected={selectedFavorite.includes(4)}>
                        <S.radioselect></S.radioselect>
                        <Text.Body2 style={{textAlign:"center", margin:"10px 0 6px 0", fontWeight:"bold"}}>애카 가자!<br/></Text.Body2>
                        <Text.Body3>친구들이 제일 좋아!</Text.Body3>
                        <Radio checked={selectedFavorite.includes(4)} size="M" mt="20"/>
                    </S.NamekgWrap>
                </S.inputinline>
            </S.InputWrapper>
        </Container>
    );
});

export default Favorit;