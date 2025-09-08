import { faArrowLeft, faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import BasicButton from "../../components/button/BasicButton";
import S from './style';

const ScheduleModal = ({ 
  onClose,
  onAddSchedule = () => {},
  step: initialStep = 1,
  date: initialDate = new Date(),
}) => {
  const user_id = localStorage.getItem('user_id');
  const [step, setStep] = useState(initialStep);
  const [selectedDate, setSelectedDate] = useState(
    typeof initialDate === 'string' ? new Date(initialDate) : initialDate
  );
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const friends = [
    { id: 1, name: 'Soul', avatar: "/assets/img/chat/soul.png" },
    { id: 2, name: 'Melody', avatar: "/assets/img/chat/melody.png" },
    { id: 3, name: 'Coco', avatar: "/assets/img/chat/coco.png" },
    { id: 4, name: 'Choco', avatar: "/assets/img/chat/choco.png" },
    { id: 5, name: 'Jude', avatar: "/assets/img/chat/jude.png" },
  ];

  const toggleFriend = (friend) => {
    if (selectedFriends.find(f => f.id === friend.id)) {
      setSelectedFriends(selectedFriends.filter(f => f.id !== friend.id));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  // 추가하기, 일정추가 버튼 클릭 시
  const handleAdd = async() => {
    if (step === 1 && selectedDate) {
      // 추가하기 버튼 클릭시 
      setStep(2);
    } else if (step === 2) {
      // 일정추가 버튼 클릭 시
      // schedule POST API 연동
      if (!title.trim()) {
        setError('일정을 작성해주세요');
        return;
      }
    // setShowError(false);
    const onlyDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
    const onlyTime = startTime ? format(startTime, "HH:mm") : null;

    await fetch(`http://localhost:8000/calendar/api/post-schedules`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        user_id: user_id,
        // chat_id: selectedFriends,
        title : title,
        date: onlyDate,
        time: onlyTime,
        location: location,
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(`Response Fetching Error`);
      return res.json()
    })
    .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
        // setValue("")
        // setIsUpdate(!isUpdate) // 상태 리랜더링
      })
      .catch(console.error)
      onClose();
    }
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (error) setError('');
  };

  // useEffect -> 처음 마운트했을 때 -> friend 객체 -> 친구 프로필 url 뿌리기

  return (
     <S.Modal onClick={onClose}>
      <S.ModalContentFixed onClick={(e) => e.stopPropagation()}>
        {/* 모달 첫번째 달력 */}
        {step === 1 ? (
          <>
            <S.CalendarContainer>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                locale={ko}
              />
            </S.CalendarContainer>
            <BasicButton roundButton="superSmall" variant="filled" onClick={handleAdd} style={{ width: '100%'}}>
              추가하기
            </BasicButton>
          </>
        ) : (
          <>
          <S.ScheduleContainer>
            <S.ModalHeader>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{
                  color: '#616161',
                  marginLeft: '-10px',
                  marginRight: '20px',
                  cursor: 'pointer',
                  width: '24px', height: '24px'
                }}
                onClick={() => {
                  setStep(1);
                  setTitle('');
                  setStartTime('');
                  setLocation('');
                  setSelectedFriends([]);
                  setError('');
                }}
              />
              <S.ModalTitleInput
                type="text"
                placeholder="새로운 일정을 추가해주세요"
                value={title}
                onChange={handleTitleChange}
              />
            </S.ModalHeader>

            {error && (
              <div style={{ color: 'red', marginLeft: '55px', marginTop: '-10px', marginBottom: '10px', fontSize: '15px' }}>
                {error}
              </div>
            )}

            <S.InputGroupContainer>
              <FontAwesomeIcon icon={faCalendarDays} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <S.InputSpan>
                  {selectedDate.toLocaleDateString('ko-KR', {
                    month: 'numeric',
                    day: 'numeric',
                    weekday: 'short'
                  })}
                </S.InputSpan>
              </S.InputGroup>
            </S.InputGroupContainer>

            <S.InputGroupContainer>
              <FontAwesomeIcon icon={faClock} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <DatePicker
                  selected={startTime}
                  onChange={(date) => setStartTime(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={30}
                  dateFormat="h:mm aa"
                  placeholderText="시작 시간을 선택하세요"
                  customInput={<S.DateInput />}
                />
              </S.InputGroup>
            </S.InputGroupContainer>

            <S.InputGroupContainer>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: '#616161', marginRight: '15px', width: '24px', height: '24px' }} />
              <S.InputGroup>
                <S.Input
                  type="text"
                  value={location}
                  placeholder="장소를 입력하세요"
                  onChange={handleLocationChange}
                />
              </S.InputGroup>
            </S.InputGroupContainer>

            <S.FriendsSelect>
              {friends.map(friend => (
                <S.FriendAvatar
                  key={friend.id}
                  src={friend.avatar}
                  alt={friend.name}
                  className={selectedFriends.find(f => f.id === friend.id) ? 'selected' : ''}
                  onClick={() => toggleFriend(friend)}
                />
              ))}
            </S.FriendsSelect>
          </S.ScheduleContainer>
          <BasicButton roundButton="superSmall" variant="filled" onClick={handleAdd} style={{ width: '100%' }}>
            일정추가
          </BasicButton>
          
          </>
        )}
      </S.ModalContentFixed>
    </S.Modal>
  );
};

export default ScheduleModal;
