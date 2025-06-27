import { useRef, useState } from 'react';
import ScheduleModal from './ScheduleModal.jsx';

const ChatApp = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const messages = [
    { id: 1, sender: 'Soul', text: '어디서 산책할래? 한강은 어때?' },
    { id: 2, sender: 'me', text: '음... 여의도 한강 어때?' },
    { id: 3, sender: 'Soul', text: '아 거기 너무 먼데....' },
    { id: 4, sender: 'me', text: '그러면 반포 ??' },
    { id: 5, sender: 'Soul', text: '좋아 ~!' },
  ];

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        alert('이미지 전송: ' + reader.result); // 추후 실제 전송 로직으로 대체
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-header">
        <h3>Soul</h3>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'me' : 'other'}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <button onClick={() => setIsScheduleModalOpen(true)}>📅</button>
        <input type="text" placeholder="메시지 입력" />
        <button onClick={() => fileInputRef.current.click()}>📷</button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageSelect}
        />
        <button>전송</button>
      </div>

      {isScheduleModalOpen && (
        <ScheduleModal onClose={() => setIsScheduleModalOpen(false)} />
      )}
    </div>
  );
};

export default ChatApp;
