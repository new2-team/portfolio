import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import S from './style.js';


const ScheduleAlert = ({ chat }) => {
  const [activeTab, setActiveTab] = useState('schedule');
  // const [name, setname] = useState(chat.name);

  const activeChat = chat || {
    id: 0,
    name: '',
    avatar: '/assets/img/chat/dogEmptyProfile.png',
  };

  const schedules = [
    { id: 1, title: 'Taking a walk by the Han River' },
    { id: 2, title: "Soul's birthday party" },
  ]; 

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

  return (
    <S.ScheduleAlert>
      <S.ScheduleProfileSection>
        <S.ScheduleProfileAvatar src={activeChat.avatar} alt={activeChat.name} />
        <S.ScheduleProfileName>{activeChat.name}</S.ScheduleProfileName>
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
          {schedules.map((s) => (
            <S.ScheduleItem key={s.id}>
              <S.ScheduleIcon>
                <FontAwesomeIcon icon={faCircleCheck} />
              </S.ScheduleIcon>
              <S.ScheduleText>
                <S.ScheduleLabel>예정된 일정</S.ScheduleLabel>
                <S.ScheduleTitle>{s.title}</S.ScheduleTitle>
              </S.ScheduleText>
              <S.ScheduleDivider />
            </S.ScheduleItem>
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
