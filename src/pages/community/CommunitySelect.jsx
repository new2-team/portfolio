import React, { useState } from 'react';
import S from './style';
import SelectBox from '../../components/selectBox/SelectBox';
import BasicInput from '../../components/input/BasicInput';

const CommunitySelect = () => {
  return (
    <>
      <S.Search>
        <SelectBox 
        options={["전체","내용","제목","작성자"]} placeholder='전체'/>
        <S.SearchInput>
          <BasicInput type="text" placeholder="검색어를 입력하세요" />
          <img src="/assets/icons/search.svg" width={30} height={30} alt="검색" />
        </S.SearchInput>
        </S.Search>
        <S.Filter>
          <S.FilterNew>최신순</S.FilterNew>
          <S.FilterHot>인기순</S.FilterHot>
          <S.FilterMy>내가 쓴 게시글</S.FilterMy>
          <S.FilterFriend>내 친구가 쓴 게시글</S.FilterFriend>
        </S.Filter>
    </>
  );
};

export default CommunitySelect;