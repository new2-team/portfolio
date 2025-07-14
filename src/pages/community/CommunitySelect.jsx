import React, { useState } from 'react';
import S from './style';
import searchImg from "../../components/icons/search.svg";
import SelectBox from '../../components/selectBox/SelectBox';
import BasicInput from '../../components/input/BasicInput';
import { ReactComponent as SearchIcon } from "../../components/icons/search.svg";
const CommunitySelect = () => {


  return (
    <>
      <S.Search>
        {/* <S.SearchSelect id="searchSel">
          <option value="">전체</option>
          <option value="op2">내용</option>
          <option value="op3">제목</option>
          <option value="op4">작성자</option>
        </S.SearchSelect> */}
        <SelectBox 
        options={["전체","내용","제목","작성자"]} placeholder='전체'/>
        <S.SearchInput>
          <BasicInput type="text" placeholder="검색어를 입력하세요" />
          <SearchIcon width={30} height={30} />
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