import { faArrowLeft, faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ko } from 'date-fns/locale'; // ✅ 한국어 locale import
import { useState } from 'react';
import 'react-clock/dist/Clock.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import './Chatting.css';

const ScheduleModal = ({
  onClose,
  onAddSchedule = () => {},
  step: initialStep = 1,
  date: initialDate = new Date(),
}) => {
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

  const handleAdd = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2) {
      if (!title.trim()) {
        setError('일정을 작성해주세요');
        return;
      }

      const newSchedule = {
        title,
        date: selectedDate.toISOString().split('T')[0],
        startTime,
        location,
        friends: selectedFriends,
      };

      onAddSchedule(newSchedule);
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

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content fixed-size" onClick={(e) => e.stopPropagation()}>
        {step === 1 ? (
          <>
            <div className="calendar-container">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                locale={ko}
              />
            </div>

            <button className="full-width-button" onClick={handleAdd}>
              추가하기
            </button>
          </>
        ) : (
          <>
            <div className="modal-header">
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ color: '#616161', marginLeft: '-10px', marginRight: '20px', cursor: 'pointer' }}
                onClick={() => {
                  setStep(1);
                  setTitle('');
                  setStartTime('');
                  setLocation('');
                  setSelectedFriends([]);
                  setError('');
                }}
              />
              <input
                type="text"
                placeholder="새로운 일정을 추가해주세요"
                value={title}
                onChange={handleTitleChange}
                className="modal-title-input"
              />
            </div>

            {error && (
              <div style={{ color: 'red', marginLeft: '35px', marginTop: '-10px', marginBottom: '10px', fontSize: '13px' }}>
                {error}
              </div>
            )}

            <div className="input-group-container">
              <FontAwesomeIcon icon={faCalendarDays} style={{ color: '#616161', marginRight: '15px' }} />
              <div className="input-group">
                <span>{selectedDate.toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric', weekday: 'short' })}</span>
              </div>
            </div>
            
            <div className="input-group-container">
              <FontAwesomeIcon icon={faClock} style={{ color: '#616161', marginRight: '15px' }} />
              <div className="input-group">
                <TimePicker
                  onChange={setStartTime}
                  value={startTime}
                  disableClock={true}
                  clearIcon={null}
                  clockIcon={null}
                  format="HH:mm"
                />
              </div>
            </div>

            <div className="input-group-container">
              <FontAwesomeIcon icon={faLocationDot} style={{ color: '#616161', marginRight: '15px' }} />
              <div className="input-group">
                <input
                  type="text"
                  value={location}
                  placeholder="장소를 입력하세요"
                  onChange={handleLocationChange}
                />
              </div>
            </div>

            <div className="friends-select">
              {friends.map(friend => (
                <img
                  key={friend.id}
                  src={friend.avatar}
                  alt={friend.name}
                  className={`friend-avatar ${selectedFriends.find(f => f.id === friend.id) ? 'selected' : ''}`}
                  onClick={() => toggleFriend(friend)}
                />
              ))}
            </div>

            <button onClick={handleAdd} className="full-width-button">일정추가</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleModal;
