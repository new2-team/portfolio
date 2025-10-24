import { useNavigate } from 'react-router-dom';
import ComingSchedule from '../calendar/ComingSchedule';
import CompletedSchedule from '../calendar/CompletedSchedule';
import MiniCalendar from '../calendar/MiniCalendar';
import ChatList from '../chat/ChatList';
import Friends from './mypageComponent/friends/Friends';
import S from './style';

// 프로필
// 친구 목록
// 캘린더
// 채팅

const MyPage = () => {
    const navigate = useNavigate();

    const handleCalendarClick = () => {
        navigate('/calendar');
    }
    const handleChatClick = (chat) => {
        navigate('/chatting', { state: { selectedChat: chat } });
    }

    return (
        <S.Wrapper>
            <S.FirstWrapper>
                <S.Profile>
                    프로필
                </S.Profile>
                <S.Friends>
                    <Friends/>
                </S.Friends>
            </S.FirstWrapper>
            <S.SecondWrapper>
                <S.CalendarWrapper>
                    <S.Calendar onClick={handleCalendarClick}>
                        <MiniCalendar />
                    </S.Calendar>
                    <S.Plan onClick={handleCalendarClick}>
                        <ComingSchedule />
                    </S.Plan>
                    <S.Review onClick={handleCalendarClick}>
                        <CompletedSchedule />
                    </S.Review>
                </S.CalendarWrapper>
                <S.Chat >
                    <ChatList onSelectChat={handleChatClick}/>
                </S.Chat>
            </S.SecondWrapper>

        </S.Wrapper>
    );
};

export default MyPage;