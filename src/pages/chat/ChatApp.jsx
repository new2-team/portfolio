import { faClock, faEllipsisVertical, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import Text from '../../components/text/size.js';
import './Chatting.css';
import ScheduleModal from './ScheduleModal.jsx';

const ChatApp = ({ chat, onToggleScheduleAlert }) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const activeChat = chat || {
    id: 0,
    name: '',
    avatar: '',
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
    <div className="chat-app"> 
      <div className="chat-header">
        <div className="chat-header-left">
          <img src={activeChat.avatar} alt={activeChat.name} className="chat-header-avatar" />
          <Text.Body2 fontWeight="700" color="#000" style={{ margin: 0 }}>
            {activeChat.name}
          </Text.Body2>
        </div>
        <div className="chat-header-actions">
          <button onClick={onToggleScheduleAlert}>
            <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '24px' }}/>
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.reduce((acc, msg, idx, arr) => {
          const prevMsg = arr[idx - 1];
          const showDateDivider = !prevMsg || prevMsg.date !== msg.date;

          if (showDateDivider) {
            acc.push(
              <div key={`date-${msg.date}`} className="date-divider">
                {msg.date}
              </div>
            );
          }

          acc.push(
            <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'me' : 'other'}`}>
              <div className="message-bubble">
                {msg.text && <div className="message-text">{msg.text}</div>}
                {msg.image && <img src={msg.image} alt="message" className="message-image" />}
              </div>

              <div className="message-info-outside">
                <span className="message-time">{msg.time}</span>
                {msg.sender === 'me' && (
                  <span className="message-read">{msg.read ? '읽음' : '전송됨'}</span>
                )}
              </div>
            </div>
          );

          return acc;
        }, [])}
      </div>


      <div className="chat-input" style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={() => setIsScheduleModalOpen(true)}>
          <FontAwesomeIcon icon={faClock} style={{ color: '#999999', fontSize: '25px' }} />
        </button>

        <div
          ref={messageInputRef}
          contentEditable
          className="message-input"
        ></div>


        <button onClick={() => fileInputRef.current.click()}>
          <FontAwesomeIcon icon={faPaperclip} style={{ color: '#999999', fontSize: '25px' }}/>
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="file-input" 
          style={{ display: 'none' }}
          onChange={handleImageSelect}
        />

        <button onClick={handleSendMessage} className="send-button">
          <FontAwesomeIcon icon={faPaperPlane} className="send-icon" />
        </button>
      </div>

      {isScheduleModalOpen && (
        <ScheduleModal
          onClose={() => setIsScheduleModalOpen(false)}
          onAddSchedule={handleAddSchedule} // ✅ 추가
        />
      )}

    </div>
  );
};

export default ChatApp;
