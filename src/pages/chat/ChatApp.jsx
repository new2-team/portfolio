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
    { id: 1, sender: activeChat.name, text: chat ? '안녕하세요!' : '' },
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
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'me' : 'other'}`}>
            {msg.text}
          </div>
        ))}
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
