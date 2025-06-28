import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import Icon from '../../components/icons/Icon.js';
import ScheduleModal from './ScheduleModal.jsx';

const ChatApp = ({ chat, onToggleScheduleAlert }) => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const activeChat = chat || {
    id: 0,
    name: '임시 채팅방',
    avatar: '/assets/img/default.png',
  };

  const messages = [
    { id: 1, sender: activeChat.name, text: chat ? '안녕하세요!' : '아무도 없는 채팅방이에요...' },
  ];

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

    // 전송 후 초기화
    messageInputRef.current.innerHTML = '';
    setSelectedImage(null);
  };

  return (
    <div className="chat-app">
      <div className="chat-header">
        <img src={activeChat.avatar} alt={activeChat.name} className="chat-header-avatar" />
        <h3>{activeChat.name}</h3>
        <div className="chat-header-actions">
          <button onClick={onToggleScheduleAlert}>⋯</button>
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
        <button onClick={() => setIsScheduleModalOpen(true)}>📅</button>

        <div
          ref={messageInputRef}
          contentEditable
          className="message-input"
          style={{
            border: '1px solid #ccc',
            borderRadius: '5px',
            padding: '8px',
            minHeight: '40px',
            flex: 1,
            margin: '0 10px',
          }}
        ></div>

        {selectedImage && (
          <button onClick={handleCancelImage} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '5px', padding: '5px 10px' }}>
            <Icon icon={faTimes} fontSize="16px" />
          </button>
        )}

        <button onClick={() => fileInputRef.current.click()}>📷</button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageSelect}
        />

        <button onClick={handleSendMessage}>전송</button>
      </div>

      {isScheduleModalOpen && (
        <ScheduleModal onClose={() => setIsScheduleModalOpen(false)} />
      )}
    </div>
  );
};

export default ChatApp;
