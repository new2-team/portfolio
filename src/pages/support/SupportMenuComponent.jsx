import React from 'react';
import S from './style';
import { Link } from 'react-router-dom';


const SupportMenuComponent = ({activeMenu}) => {
  return (
    <S.MenuLineWrapper>
      <S.MenuLine />
      <S.MenuWrapper>
        <Link to ="/faq">
          <S.FAQButton isActive={activeMenu === 'faq'} >FAQ</S.FAQButton>
        </Link>
        <S.BetweenButton  >ㆍ</S.BetweenButton>
        <Link to="/customer-inquiry">
          <S.InquiryButton isActive={activeMenu === 'inquiry'}>1:1문의</S.InquiryButton>
        </Link>
      </S.MenuWrapper>
      <S.MenuLine />
    </S.MenuLineWrapper>
  );
};

export default SupportMenuComponent;