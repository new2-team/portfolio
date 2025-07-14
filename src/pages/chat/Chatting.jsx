import { useState } from 'react';
import ChatApp from './ChatApp';
import ChatList from './ChatList';
import './Chatting.css';
import ScheduleAlert from './ScheduleAlert.jsx';

const Chatting = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showScheduleAlert, setShowScheduleAlert] = useState(true);

  const [chats, setChats] = useState([
    { id: 1, name: 'Soul', lastComment: 'last comment', avatar: "/assets/img/chat/soul.png" },
  ]);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleAddChat = (chat) => {
    const exists = chats.find(c => c.id === chat.id);
    if (!exists) {
      setChats([...chats, chat]);
    }
  };

  const toggleScheduleAlert = () => {
    setShowScheduleAlert(prev => !prev);
  };

  return (
    <div className="chatting-container">
      <ChatList
        chats={chats}
        onSelectChat={handleSelectChat}
        onAddChat={handleAddChat}
      />
      <div className={`chat-app-container ${showScheduleAlert ? '' : 'full-width'}`}>
        <ChatApp
          chat={selectedChat}
          onClose={() => setSelectedChat(null)}
          onToggleScheduleAlert={toggleScheduleAlert}
          />
          {showScheduleAlert && <ScheduleAlert />}
      </div>
    </div>
  );
};

export default Chatting;
