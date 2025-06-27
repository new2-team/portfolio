import ChatApp from './ChatApp';
import ChatList from './ChatList';
import './Chatting.css';
import ScheduleAlert from './ScheduleAlert';

// 채팅 메인 통합

const Chatting = () => {
  return (
    <div className="chatting-container">
      <ChatList />
      <ChatApp />
      <ScheduleAlert />
    </div>
  );
};

export default Chatting;
