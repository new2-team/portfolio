import React from 'react';
import S from './style';
import CommunityInputContainer from './CommunityInputContainer';
import CommunitySelect from './CommunitySelect';
import CommunityNoText from './CommunityNoText';
import Accordion from '../../components/accordion/Accordion';
import ButtonWithInput from '../../components/input/ButtonWithInput';

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
      </S.Background>
    </>
  );
};    

export default Community;