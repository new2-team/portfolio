import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import S from './style.js';


const ChatList = ({ chats, onSelectChat, selectedChat }) => {
  // chats: prop로 chatting에서 전체 chat 객체 리스트 받음
  // onSelectChat: ChatList에서 선택한 채팅방 Chatting에 알려주는 함수
  // selectChat: ChatList에서 선택한 채팅방의 정보를 담고 있는 객체

  return (
    <S.ChatListContainer p={20} m={20}>
      <S.TitleContainer>
        <FontAwesomeIcon icon={faPaw} style={{ fontSize: '25px' }} />
        <S.ChatTitle>매칭된 친구와 채팅을 시작해보세요!</S.ChatTitle>
      </S.TitleContainer>

      <S.ChatList>
        {chats.map((chat) => (
          <S.ChatListItem
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={selectedChat?.id === chat.id ? 'selected' : ''}
          >
            <S.ChatAvatar src={chat.avatar} alt={chat.name} />
            <S.ChatInfo>
              <S.ChatName>{chat.name}</S.ChatName>
              <S.ChatLast>{chat.lastComment}</S.ChatLast>
            </S.ChatInfo>
            <S.ChatRead>
              <S.ChatLastTime>{chat.lastMessageAt}</S.ChatLastTime>
              {chat.unreadCount > 0 && <S.UnreadBadge>{chat.unreadCount}</S.UnreadBadge>}
            </S.ChatRead>
          </S.ChatListItem>
        ))}
      </S.ChatList>
    </S.ChatListContainer>
  );
};

export default ChatList;
