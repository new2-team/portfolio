import React from 'react';
import S from './style';

const Friends = (friends) => {
 return (
  <div>
   <S.MyFriend>내친구</S.MyFriend>
   <S.FriendsList>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
    <S.FriendCard/>
   </S.FriendsList>
  </div>
 );
};

export default Friends;