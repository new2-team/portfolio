
const ChatList = () => {
  const chats = [
    { id: 1, name: 'Soul', lastComment: 'last comment', avatar: "/assets/img/chat/soul.png", alt: "soul" },
    { id: 2, name: 'Melody', lastComment: 'last comment', avatar: "/assets/img/chat/melody.png", alt: "melody" },
    { id: 3, name: 'Coco', lastComment: 'last comment', avatar: "/assets/img/chat/coco.png", alt: "coco" },
    { id: 4, name: 'Choco', lastComment: 'last comment', avatar: "/assets/img/chat/choco.png", alt: "choco" },
    { id: 5, name: 'Jude', lastComment: 'last comment', avatar: "/assets/img/chat/jude.png", alt: "jude" },
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
