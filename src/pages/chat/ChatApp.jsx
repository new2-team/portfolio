import { faClock, faEllipsisVertical, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import Text from '../../components/text/size.js';
import ScheduleModal from './ScheduleModal.jsx';
import S from './style.js';

const ChatApp = ({ chat, onToggleScheduleAlert }) => {
  
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  const [messages, setMessages] = useState([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const activeChat = chat || {
    id: 0,
    target_name: '채팅방을 선택해주세요',
    target_profile_img: '/assets/img/chat/dogEmptyProfile.png',
  };

  const roomId = chat?.match_id ?? null;
  

  if (!window.__chatSocket) {
    window.__chatSocket = io('http://localhost:8000', { withCredentials: true });
  }
  const socket = window.__chatSocket;

  // ★ HTML -> 텍스트
  const htmlToPlainText = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html || '';
    return (div.textContent || div.innerText || '').trim();
  };

  const handleAddSchedule = (newSchedule) => {
    console.log('새 일정 추가:', newSchedule);
    // 일정 추가되면 채팅방에도 일정이 떠야함 !!
  };

  // 이미지 선택
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      if (messageInputRef.current) {
        messageInputRef.current.innerHTML += `<img src="${reader.result}" alt="첨부 이미지" style="max-width:100px; max-height:100px; border-radius:8px; margin-top:5px;" />`;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    if (messageInputRef.current) {
      messageInputRef.current.innerHTML = '';
    }
  };

  // 헬퍼 밖으로 빼두면 handleSendMessage가 확 줄어요
  const textOf = (el) => {
    const d = document.createElement('div');
    d.innerHTML = el?.innerHTML || '';
    return (d.textContent || d.innerText || '').trim();
  };
  const optimisticMsg = (id, uid, text, preview) => {
    const now = new Date();
    return {
      _id: id, sender_id: uid, message: text, images_url: preview ? [preview] : null,
      read: false, createdAt: now.toISOString(),
      dateStr: now.toLocaleDateString('ko-KR'),
      timeStr: now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    };
  };
  // 이미지 업로드
  const uploadImage = async (file) => {
    if (!file) return null;
    const form = new FormData(); 
    form.append('messageImage', file);

    const r = await fetch('http://localhost:8000/chatting/api/post-chatPic', {
       method:'POST', body: form 
    });

    if (!r.ok) throw new Error('upload failed');
    const j = await r.json();
    return Array.isArray(j?.urls) ? j.urls : (j?.imageUrl ? [j.imageUrl] : (j?.url ? [j.url] : null));
  };

  const replaceTemp = (setMessages, tempId, saved) => {
    const created = saved?.createdAt ?? new Date().toISOString();
    setMessages(prev => prev.map(m => m._id === tempId ? {
      ...m,
      _id: saved?._id ?? m._id,
      message: saved?.message ?? m.message,
      images_url: Array.isArray(saved?.images_url) ? saved.images_url
                : (saved?.image_url ? [saved.image_url] : m.images_url),
      read: !!saved?.read,
      createdAt: created,
      dateStr: new Date(created).toLocaleDateString('ko-KR'),
      timeStr: new Date(created).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    } : m));
  };

  // 메시지 전송 - 텍스트 + 이미지 업로드 + 소켓 전송
  const handleSendMessage = async () => {
  if (!chat?._id) return;
  const text = textOf(messageInputRef.current);
  if (!text && !selectedFile) return;

  const tempId = `tmp-${Date.now()}`;
  setMessages(prev => [...prev, optimisticMsg(tempId, user_id, text || '', selectedImage)]);

  try {
    const images_url = await uploadImage(selectedFile);
    const payload = { 
      roomId: roomId, 
      sender_id: user_id,
      message: text || '',
      images_url,
      clientMessageId: tempId
    };

    if (window?.socket?.emit) {
      window.socket.emit('chat:send', payload, (ack) => {
        if (!ack?.ok) return setMessages(p => p.filter(m => m._id !== tempId)), alert('메시지 전송 실패');
        replaceTemp(setMessages, tempId, ack.message);
      });
    } else {
      const r = await fetch(`http://localhost:8000/chatting/api/post-chatMessage/${roomId}`, {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)
      });
      if (!r.ok) throw new Error('send failed');
      replaceTemp(setMessages, tempId, await r.json());
    }
  } catch (e) {
    console.error(e);
    setMessages(p => p.filter(m => m._id !== tempId));
    alert('메시지 전송 실패');
  } finally {
    if (messageInputRef.current) messageInputRef.current.innerHTML = '';
    setSelectedImage(null);
    setSelectedFile(null);
  }
};


  // 메시지 리스트 가지고 오기
  useEffect(() => {
    let aborted = false; // 안전 장치(언마운트 중 setState 방지)
    console.log("getChatMessages 호출함");

    const getChatMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/chatting/api/get-chatMessage/${roomId}`
        );

        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        // console("messages", data);
        // const messages = data.messages;

        // 포맷터(재사용)
      const dFmt = new Intl.DateTimeFormat('ko-KR'); 
      const tFmt = new Intl.DateTimeFormat('ko-KR', { hour: '2-digit', minute: '2-digit' });

      // messages 정규화(배열 보장 + 정렬 + 포맷)
      const normalized = (Array.isArray(data?.messages) ? data.messages : [])
        .map(m => {
          const d = new Date(m?.createdAt);
          return {
            _id: m?._id ?? `${+d || Date.now()}`,
            sender_id: m?.sender_id ?? '',
            message: m?.message ?? '',
            images_url: m?.images_url ?? null,
            read: !!m?.read,
            createdAt: m?.createdAt ?? null,
            dateStr: isNaN(d) ? '' : dFmt.format(d),
            timeStr: isNaN(d) ? '' : tFmt.format(d),
          };
        })
        .sort((a, b) => +new Date(a.createdAt || 0) - +new Date(b.createdAt || 0)); 

        // setMessages(messages);
        if(!aborted) setMessages(normalized);
      } catch (err) {
        console.error("메시지 불러오기 실패:", err);
        if(!aborted) setMessages([]);
      }
    };

    if (!chat?._id) {
      setMessages([]);
      return;
    }
    getChatMessages();
    return () => { aborted = true };
  }, [user_id, chat?._id]);

  // 소켓 register
  useEffect(() => {
    if (!user_id || !socket) return;
    socket.emit('register', { userId: user_id });
  }, [user_id, socket]);

  // === [추가] 방 입장 & 실시간 수신 리스너 ===
  useEffect(() => {
    if (!socket) return;

    // 방 입장: 방이 바뀔 때마다
    if (chat?._id) {
      socket.emit('room:join', { roomId: roomId });

    }

    socket.on('chat:read', { roomId: roomId, userId: user_id });

    // 실시간 새 메시지
    // const onNew = (msg) => {
    //   // 다른 방 메시지는 무시(안전)
    //   if (String(msg?.chat_id) !== String(chat?._id)) return;

    //   const d = new Date(msg?.createdAt ?? Date.now());
    //   const next = {
    //     _id: msg?._id,
    //     match_id: msg?.match_id,
    //     sender_id: msg?.sender_id,
    //     message: msg?.message ?? '',
    //     images_url: Array.isArray(msg?.images_url) ? msg.images_url
    //              : (msg?.image_url ? [msg.image_url] : null),
    //     read: !!msg?.read,
    //     createdAt: msg?.createdAt ?? d.toISOString(),
    //     dateStr: d.toLocaleDateString('ko-KR'),
    //     timeStr: d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
    //   };

    //   // 중복 방지(낙관 메시지와 서버 메시지 중복될 수 있음)
    //   setMessages(prev => prev.some(m => m._id === next._id) ? prev : [...prev, next]);
    // };

    // // (선택) 읽음 리시트
    // const onRead = (receipt) => {
    //   // 필요 시 읽음 UI 갱신 로직
    //   // console.log('read receipt', receipt);
    // };

    // socket.on('chat:new', onNew);
    // socket.on('chat:read:receipt', onRead);

    // return () => {
    //   socket.off('chat:new', onNew);
    //   socket.off('chat:read:receipt', onRead);
    // };
  }, [socket, chat?._id]);
  

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

  // 채팅방 생성 호출 임시 api 
  const handleClick = async () => {
    try {
      const res = await fetch("http://localhost:8000/chatting/api/post-chattingRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,       // user_id
          target_id: "minju2138", // 상대방 id
          match_id: "0",          // match_id
        }),
      });

      const data = await res.json();
      console.log("채팅방 생성 응답:", data);
    } catch (err) {
      console.error("에러 발생:", err);
    }
  };

  return (
    <S.ChatApp>
      <S.ChatAppHeader> 
        <S.ChatAppHeaderLeft>
          <S.ChatAppAvatar src={activeChat.target_profile_img} alt={activeChat.target_name} />
          <Text.Body3 fontWeight="600" color="#000" style={{ margin: 0 }}>
            {activeChat.target_name}
          </Text.Body3>
          {/* 채팅방 만들기 임시 api 호출 버튼 */}
          <button onClick={handleClick}>채팅방 만들기</button>
        </S.ChatAppHeaderLeft>

        <S.ChatAppHeaderActions>
          <button onClick={onToggleScheduleAlert}>
            <FontAwesomeIcon icon={faEllipsisVertical} style={{ fontSize: '24px' }} />
          </button>
        </S.ChatAppHeaderActions>
      </S.ChatAppHeader>

      <S.ChatAppMessages>
        {(messages ?? []).reduce((acc, msg, idx, arr) => {
          const prevMsg = arr[idx - 1];
          const showDateDivider = !prevMsg || prevMsg.dateStr !== msg.dateStr;

          if (showDateDivider) {
            acc.push(
              <S.ChatAppDateDivider key={`date-${msg.createdAt}-${idx}`}>
                {msg.dateStr}
              </S.ChatAppDateDivider>
            );
          }

          acc.push(
            <S.ChatAppMessage key={msg._id} isMe={msg.sender_id === user_id}>
              <S.ChatAppBubble key={msg._id ?? idx} isMe={msg.sender_id === user_id}>
                {msg.message && <S.ChatAppMessageText>{msg.message}</S.ChatAppMessageText>}
                {/* {msg.images_url && <S.ChatAppMessageImage src={msg.images_url} alt="message_img" />} */}
                {Array.isArray(msg.images_url) ? (
                  msg.images_url.map((url, i) => (
                    <S.ChatAppMessageImage key={`${msg._id}-img-${i}`} src={url} alt="message_img" />
                  ))
                ) : (
                  msg.images_url && <S.ChatAppMessageImage src={msg.images_url} alt="message_img" />
                )}
              </S.ChatAppBubble>

              <S.ChatAppMessageInfo>
                <S.ChatAppTime>{msg.timeStr}</S.ChatAppTime>
                {msg.sender_id === user_id && (
                  <S.ChatAppReadStatus>{msg.read ? '읽음' : '전송됨'}</S.ChatAppReadStatus>
                )}
              </S.ChatAppMessageInfo>
            </S.ChatAppMessage>
          );

          return acc;
        }, [])}
      </S.ChatAppMessages>

      <S.ChatAppInputArea>
        <S.ChatAppButton onClick={() => setIsScheduleModalOpen(true)}>
          <FontAwesomeIcon icon={faClock} style={{ color: '#999999', fontSize: '25px' }} />
        </S.ChatAppButton>

        <S.ChatAppMessageInput ref={messageInputRef} contentEditable />

        <S.ChatAppButton onClick={() => fileInputRef.current.click()}>
          <FontAwesomeIcon icon={faPaperclip} style={{ color: '#999999', fontSize: '25px' }} />
        </S.ChatAppButton>

        <S.ChatAppFileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageSelect}
        />

        <S.ChatAppSendButton onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ color: '#fff', fontSize: '20px', marginRight: '2px' }}/>
        </S.ChatAppSendButton>
      </S.ChatAppInputArea>

      {isScheduleModalOpen && (
        <ScheduleModal
          onClose={() => setIsScheduleModalOpen(false)}
          onAddSchedule={handleAddSchedule}
        />
      )}
    </S.ChatApp>

  );
};

export default ChatApp;
