import React from 'react';
import S from './style';
import CommunityInputContainer from './CommunityInputContainer';
import CommunitySelect from './CommunitySelect';
import CommunityNoText from './CommunityNoText';
import Accordion from '../../components/accordion/Accordion';

const Community = () => {
  return (
    < >
      <S.Background >
        <S.Wrapper>
          <CommunitySelect/>
          <CommunityInputContainer/>
          <CommunityNoText/>
          <S.MoreTextBoxWrapper>
            <S.MoreTextBox>더보기</S.MoreTextBox>
          </S.MoreTextBoxWrapper>
        </S.Wrapper>
        <Accordion question="자주 하는 질문1" answer="자주 하는 질문1 답변" />
      </S.Background>
    </>
  );
};    

export default Community;