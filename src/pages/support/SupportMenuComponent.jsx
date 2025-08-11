import React from 'react';
import S from './style';
import { Link } from 'react-router-dom';


const SupportMenuComponent = ({activeMenu}) => {
  return (
      <S.MenuWrapper>
        <Link to ="/support/faq">
          <S.FAQButton isActive={activeMenu === 'faq'} >FAQ</S.FAQButton>
        </Link>
        <S.BetweenButton  >ㆍ</S.BetweenButton>
        <Link to="/support/inquiry-list">
          <S.InquiryButton isActive={activeMenu === 'inquiry'}>1:1문의</S.InquiryButton>
        </Link>
      </S.MenuWrapper>
  );
};

export default SupportMenuComponent;