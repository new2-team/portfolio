import React from 'react';
import S from './style';
import CalendarWidget from '../calendar/calendarWidget/CalendarWidget';
import ChattingWidget from '../chat/ChattingWidget';
import Profile from './mypageComponent/profile/Profile';

// 프로필
// 친구 목록
// 캘린더
// 채팅

const MyPage = () => {
    return (
        <S.Wrapper>
            <S.FirstWrapper>
                <S.Profile>
                    <Profile/>
                </S.Profile>
                <S.Friends>
                    {/* <p>내 친구</p> */}
                </S.Friends>
            </S.FirstWrapper>
            <S.SecondWrapper>
                <CalendarWidget/>
                <S.Chat>
                    <ChattingWidget/>
                </S.Chat>
            </S.SecondWrapper>

        </S.Wrapper>
    );
};

export default MyPage;