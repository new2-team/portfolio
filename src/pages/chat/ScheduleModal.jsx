import { faArrowLeft, faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import './Chatting.css';

const ScheduleModal = ({ onClose, onAddSchedule }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [title, setTitle] = useState('');

  const friends = [
    { id: 1, name: 'Soul', avatar: "/assets/img/chat/soul.png" },
    { id: 2, name: 'Melody', avatar: "/assets/img/chat/melody.png" },
    { id: 3, name: 'Coco', avatar: "/assets/img/chat/coco.png" },
    { id: 4, name: 'Choco', avatar: "/assets/img/chat/choco.png" },
    { id: 5, name: 'Jude', avatar: "/assets/img/chat/jude.png" },
  ];

  const toggleFriend = (friend) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter(f => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleAdd = () => {
    if (step === 1 && selectedDate) {
      setStep(2);
    } else if (step === 2) {
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

  // ✅ 장소 변경 함수 (지도 기능 제거)
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content fixed-size" onClick={(e) => e.stopPropagation()}>
        {step === 1 ? (
          <>
            <div className="calendar-container">
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                formatDay={(locale, date) => date.getDate()}
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
                onClick={() => setStep(1)}
              />
              <input
                type="text"
                placeholder="새로운 일정을 추가해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="modal-title-input"
              />
            </div>

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
                  className={`friend-avatar ${selectedFriends.includes(friend) ? 'selected' : ''}`}
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
