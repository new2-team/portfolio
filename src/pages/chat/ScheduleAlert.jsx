import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import theme from '../../styles/theme.js';
import S from './style.js';


const ScheduleAlert = ({ chat }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  const [activeTab, setActiveTab] = useState('schedule'); // 일정, 이미지 탭
  const [schedules, setSchedules] = useState([]);

  // chat 객체 받은거 넣기
  const activeChat = chat || {
    id: 0,
    target_name: '채팅방을 선택해주세요',
    target_profile_img: '/assets/img/chat/dogEmptyProfile.png',
  };

  const images = [
    { id: 1, src: '/assets/img/chat/soul.png', alt: 'soul' },
    { id: 2, src: '/assets/img/chat/choco.png', alt: 'choco' },
    { id: 3, src: '/assets/img/chat/jude.png', alt: 'jude' },
    { id: 1, src: '/assets/img/chat/soul.png', alt: 'soul' },
    { id: 2, src: '/assets/img/chat/choco.png', alt: 'choco' },
    { id: 3, src: '/assets/img/chat/jude.png', alt: 'jude' },
    { id: 1, src: '/assets/img/chat/soul.png', alt: 'soul' },
    { id: 2, src: '/assets/img/chat/choco.png', alt: 'choco' },
    { id: 3, src: '/assets/img/chat/jude.png', alt: 'jude' },
    { id: 1, src: '/assets/img/chat/soul.png', alt: 'soul' },
    { id: 2, src: '/assets/img/chat/choco.png', alt: 'choco' },
    { id: 3, src: '/assets/img/chat/jude.png', alt: 'jude' },
  ];

  // chat객체의 id로 schedule 객체의 title만 가져오기
  // -> 현재 날짜 이후의 날짜의 schedule title만 가져오기
  // 최신 일정 -> 상단에 띄우기

  // 넘겨받은 chat객체에 id를 받아서 그걸로 api연동 
  // -> message객체의 이미지 배열 -> 이미지 url뿌리기
  // 최신 이미지 보낸시간 -> 상단에 띄우기

  useEffect(() => {
    const getComingSchedules = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/calendar/api/coming-schedules?user_id=${user_id}&chat_id=${chat._id}`
        );

        if (!res.ok) throw new Error(`서버 응답 에러: ${res.status}`);
        const data = await res.json();
        console.log("다가오는 일정 : ", data);
        setSchedules(data.comingSchedules ?? []);
      } catch (err) {
        console.error("일정 불러오기 실패: ", err)
      }
    };

    getComingSchedules();
  }, [user_id, chat?._id]);

  return (
    <S.ScheduleAlert>
      <S.ScheduleProfileSection>
        <S.ScheduleProfileAvatar src={activeChat.target_profile_img} alt={activeChat.target_name} />
        <S.ScheduleProfileName>{activeChat.target_name}</S.ScheduleProfileName>
      </S.ScheduleProfileSection>

      <S.ScheduleTabs>
        <S.ScheduleTabButton
          className={activeTab === 'schedule' ? 'active' : ''}
          onClick={() => setActiveTab('schedule')}
        >
          일정
        </S.ScheduleTabButton>
        <S.ScheduleTabButton
          className={activeTab === 'images' ? 'active' : ''}
          onClick={() => setActiveTab('images')}
        >
          이미지
        </S.ScheduleTabButton>
      </S.ScheduleTabs>

      {activeTab === 'schedule' ? (
        <S.ScheduleList>
          {schedules.map((schedule) => (
            // 일정 아이템 클릭되게 해서 -> 일별 캘린더로 이동하게 하기
            <S.ScheduleItem key={schedule._id}>
              <S.ScheduleIcon>
                <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.secondary.main, width: '24px', height: '24px' }} />
              </S.ScheduleIcon>
              <S.ScheduleText>
                <S.ScheduleLabel>예정된 일정</S.ScheduleLabel>
                <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
              </S.ScheduleText>
              <S.ScheduleDivider />
            </S.ScheduleItem>
            // touchable로 감싸기
          ))}
        </S.ScheduleList>
      ) : (
        <S.ScheduleImageGallery>
          {images.map((img) => (
            <S.ScheduleGalleryImg key={img.id} src={img.src} alt={img.alt} />
          ))}
        </S.ScheduleImageGallery>
      )}
    </S.ScheduleAlert>
  );
};

export default ScheduleAlert;
