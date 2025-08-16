import { faClock, faEllipsisVertical, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Text from '../../components/text/size.js';
import ScheduleModal from './ScheduleModal.jsx';
import S from './style.js';

const ChatApp = ({ chat, onToggleScheduleAlert }) => {
  // chat: ChatList에서 선택한 채팅방 객체
  // onToggleScheduleAlert: ScheduleAlert on/off

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const activeChat = chat || {
    id: 0,
    name: '채팅방을 선택해주세요',
    avatar: '/assets/img/chat/dogEmptyProfile.png',
  };

  const messages = [
  {
    id: 1,
    sender: 'me',
    text: '안녕!',
    time: '오전 10:15',
    read: true,
    date: '2025-06-30',
  },
  {
    id: 2,
    sender: 'other',
    text: '사진 보낼게',
    image: '/assets/img/cat.jpg',
    time: '오전 10:16',
    date: '2025-06-30',
  },
  {
    id: 3,
    sender: 'me',
    text: '귀엽다!',
    time: '오전 10:17',
    read: false,
    date: '2025-07-01',
  },
  {
    id: 1,
    sender: 'me',
    text: '안녕!',
    time: '오전 10:15',
    read: true,
    date: '2025-06-30',
  },
  {
    id: 2,
    sender: 'other',
    text: '사진 보낼게',
    image: '/assets/img/cat.jpg',
    time: '오전 10:16',
    date: '2025-06-30',
  },
  {
    id: 1,
    sender: 'me',
    text: '안녕!',
    time: '오전 10:15',
    read: true,
    date: '2025-06-30',
  },
  {
    id: 2,
    sender: 'other',
    text: '사진 보낼게',
    image: '/assets/img/cat.jpg',
    time: '오전 10:16',
    date: '2025-06-30',
  },
];

  const handleAddSchedule = (newSchedule) => {
    console.log('새 일정 추가:', newSchedule);
    // 일정 추가되면 채팅방에도 일정이 떠야함 !!
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);

        if (messageInputRef.current) {
          messageInputRef.current.innerHTML += `<img src="${reader.result}" alt="첨부 이미지" style="max-width:100px; max-height:100px; border-radius:8px; margin-top:5px;" />`;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    if (messageInputRef.current) {
      messageInputRef.current.innerHTML = '';
    }
  };

  const handleSendMessage = () => {
    const messageHtml = messageInputRef.current.innerHTML;
    console.log('전송 메시지:', messageHtml);

    messageInputRef.current.innerHTML = '';
    setSelectedImage(null);
  };

  // 받은 채팅방 Id로 messages객체 api로 불러오기, useEffect로 마운팅할때마다, 채팅방 id가 변할때마다

  // ✅ delete / backspace 키 누르면 이미지 제거 useEffect 추가
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedImage) {
        handleCancelImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <S.ChatApp>
      <S.ChatAppHeader>
        <S.ChatAppHeaderLeft>
          <S.ChatAppAvatar src={activeChat.avatar} alt={activeChat.name} />
          <Text.Body3 fontWeight="600" color="#000" style={{ margin: 0 }}>
            {activeChat.name}
          </Text.Body3>
        </S.ChatAppHeaderLeft>

        <S.ChatAppHeaderActions>
          <button onClick={onToggleScheduleAlert}>
            <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '24px' }} />
          </button>
        </S.ChatAppHeaderActions>
      </S.ChatAppHeader>

      <S.ChatAppMessages>
        {messages.reduce((acc, msg, idx, arr) => {
          const prevMsg = arr[idx - 1];
          const showDateDivider = !prevMsg || prevMsg.date !== msg.date;

          if (showDateDivider) {
            acc.push(
              <S.ChatAppDateDivider key={`date-${msg.date}`}>
                {msg.date}
              </S.ChatAppDateDivider>
            );
          }

          acc.push(
            <S.ChatAppMessage key={msg.id} isMe={msg.sender === 'me'}>
              <S.ChatAppBubble isMe={msg.sender === 'me'}>
                {msg.text && <S.ChatAppMessageText>{msg.text}</S.ChatAppMessageText>}
                {msg.image && <S.ChatAppMessageImage src={msg.image} alt="message" />}
              </S.ChatAppBubble>

              <S.ChatAppMessageInfo>
                <S.ChatAppTime>{msg.time}</S.ChatAppTime>
                {msg.sender === 'me' && (
                  <S.ChatAppReadStatus>{msg.read ? '읽음' : '전송됨'}</S.ChatAppReadStatus>
                )}
              </S.ChatAppMessageInfo>
            </S.ChatAppMessage>
          );

          return acc;
        }, [])}
      </S.ChatAppMessages>

      <S.ChatAppInputArea>
        <S.ChatAppButton onClick={() => setIsScheduleModalOpen(true)}>
          <FontAwesomeIcon icon={faClock} style={{ color: '#999999', fontSize: '25px' }} />
        </S.ChatAppButton>

        <S.ChatAppMessageInput ref={messageInputRef} contentEditable />

        <S.ChatAppButton onClick={() => fileInputRef.current.click()}>
          <FontAwesomeIcon icon={faPaperclip} style={{ color: '#999999', fontSize: '25px' }} />
        </S.ChatAppButton>

        <S.ChatAppFileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageSelect}
        />

        <S.ChatAppSendButton onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#fff', fontSize: '20px', marginRight: '2px' }}/>
        </S.ChatAppSendButton>
      </S.ChatAppInputArea>

      {isScheduleModalOpen && (
        <ScheduleModal
          onClose={() => setIsScheduleModalOpen(false)}
          onAddSchedule={handleAddSchedule}
        />
      )}
    </S.ChatApp>

  );
};

export default ChatApp;
