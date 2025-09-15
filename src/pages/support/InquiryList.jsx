import React from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import Container from '../../components/layout/Container';
import BasicButton from '../../components/button/BasicButton';
import RadioWithLabel from '../../components/radio/RadioWithLabel';
import BasicInput from '../../components/input/BasicInput';
import ButtonWithInput from '../../components/input/ButtonWithInput';
import { Link } from 'react-router-dom';
import List from './component/List';

const InquiryList = () => {
 return (
  <S.InquiryWrapper>
   <SupportMenuComponent activeMenu="inquiry" />
   <div>
    <S.InquiryTitle>1:1 문의</S.InquiryTitle>
    <div>
        <S.InquiryTitleBottom>
            문의사항을 보내주시면 친절하게 답변하겠습니다. <br />
            1:1문의를 주말에 남겨 주시는 고객님께는 평일 9:00 ~ 18:00 에 순차적으로 답변 드리도록 하겠습니다.
        </S.InquiryTitleBottom>
    </div>
   </div>
   <S.InquiryBodyWrapper>
    <Link to={"/support/customer-inquiry"}>
    <BasicButton children={"문의하기"} variant={"filled"} basicButton={"medium"} />
    </Link>
    <S.RadioInputWrapper>
        <RadioWithLabel label='내가 쓴 글' />
        <S.SerachInput>
         <ButtonWithInput placeholder='작성자를 입력하세요' buttonText='검색' />
        </S.SerachInput>
    </S.RadioInputWrapper>
    <S.ListWrapper>
        <List />
    </S.ListWrapper>
   </S.InquiryBodyWrapper>
  </S.InquiryWrapper>
 );
};

export default InquiryList;