import { useState } from 'react';

const friends = [
  { id: 1, name: 'Soul', avatar: "/assets/img/chat/soul.png" },
  { id: 2, name: 'Melody', avatar: "/assets/img/chat/melody.png" },
  { id: 3, name: 'Coco', avatar: "/assets/img/chat/coco.png" },
  { id: 4, name: 'Choco', avatar: "/assets/img/chat/choco.png" },
  { id: 5, name: 'Jude', avatar: "/assets/img/chat/jude.png" },
  { id: 1, name: 'Soul', avatar: "/assets/img/chat/soul.png" },
  { id: 2, name: 'Melody', avatar: "/assets/img/chat/melody.png" },
  { id: 3, name: 'Coco', avatar: "/assets/img/chat/coco.png" },
  { id: 4, name: 'Choco', avatar: "/assets/img/chat/choco.png" },
  { id: 5, name: 'Jude', avatar: "/assets/img/chat/jude.png" },
];

const ChatList = ({ chats, onSelectChat, onAddChat }) => {
  const [selectedFriends, setSelectedFriends] = useState([]);

  const toggleSelectFriend = (friend) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter(f => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleAddSelectedChats = () => {
    if (selectedFriends.length === 0) return;

    const newChat = {
      id: Date.now(), // unique id
      name: selectedFriends.map(f => f.name).join(', '),
      avatar: selectedFriends[0].avatar,
      members: selectedFriends.map(f => ({
        id: f.id,
        name: f.name,
        avatar: f.avatar
      })),
      lastComment: '',
    };

    onAddChat(newChat);
    setSelectedFriends([]);
  };

  return (
    <div className="chat-list-container">
      <h3>멍친구랑 채팅하기</h3>

      <div className="friend-flatlist-container">
        <div className="friend-flatlist">
          <div className="friend-item" onClick={handleAddSelectedChats}>
            ➕
          </div>
          {friends.map(friend => (
            <div
              key={friend.id}
              className={`friend-item ${selectedFriends.includes(friend) ? 'selected' : ''}`}
              onClick={() => toggleSelectFriend(friend)}
            >
              <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
              <div>{friend.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-list">
        {chats.map(chat => (
          <div key={chat.id} className="chat-list-item" onClick={() => onSelectChat(chat)}>
            <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
            <div className="chat-info">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-last">{chat.lastComment}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
