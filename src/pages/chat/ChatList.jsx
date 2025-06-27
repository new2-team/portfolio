
const ChatList = () => {
  const chats = [
    { id: 1, name: 'Soul', lastComment: 'last comment', avatar: '/dog1.jpg' },
    { id: 2, name: 'Soul, Melody', lastComment: 'last comment', avatar: '/dog2.jpg' },
    { id: 3, name: 'Melody', lastComment: 'last comment', avatar: '/dog3.jpg' },
    { id: 4, name: 'Coco', lastComment: 'last comment', avatar: '/dog4.jpg' },
  ];

  return (
    <div className="chat-list">
      <h3>멍친구랑 채팅하기</h3>
      {chats.map(chat => (
        <div key={chat.id} className="chat-list-item">
          <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
          <div className="chat-info">
            <div className="chat-name">{chat.name}</div>
            <div className="chat-last">{chat.lastComment}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
