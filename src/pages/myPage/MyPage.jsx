import React from 'react';
import S from './style';
import ChattingWidget from '../chat/ChattingWidget';
import Profile from './mypageComponent/profile/Profile';
import Friends from './mypageComponent/friends/Friends';

// 프로필
// 친구 목록
// 캘린더
// 채팅

const MyPage = () => {
    return (
        <S.Wrapper>
            <S.FirstWrapper>
                <S.Profile>
                    
                </S.Profile>
                <S.Friends>
                    <Friends/>
                </S.Friends>
            </S.FirstWrapper>
            <S.SecondWrapper>
                <S.Chat>
                    <ChattingWidget/>
                </S.Chat>
            </S.SecondWrapper>

        </S.Wrapper>
    );
};

export default MyPage;