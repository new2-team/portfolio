import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ScheduleModal = ({ onClose, onAddSchedule }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);

  const friends = [
    { id: 1, name: 'Soul', avatar: '/dog1.jpg' },
    { id: 2, name: 'Melody', avatar: '/dog2.jpg' },
    { id: 3, name: 'Coco', avatar: '/dog3.jpg' },
    { id: 4, name: 'Jude', avatar: '/dog4.jpg' },
    { id: 5, name: 'Choco', avatar: '/dog5.jpg' },
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
        date: selectedDate.toDateString(),
        startTime,
        endTime,
        location,
        friends: selectedFriends,
      };
      onAddSchedule(newSchedule);
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content fixed-size">
        {step === 1 ? (
          <>
            <h3>날짜를 선택하세요</h3>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              prevLabel={null}
              nextLabel={null}
              navigationLabel={() => null}
            />
            <button onClick={handleAdd}>Add</button>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h3>새로운 일정을 추가하세요</h3>
              <button onClick={onClose}>✖️</button>
            </div>
            <div>
              <label>날짜: {selectedDate.toDateString()}</label>
            </div>
            <div>
              <label>시작 시간:</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label>종료 시간:</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <div>
              <label>위치:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="friends-select">
              {friends.map(friend => (
                <img
                  key={friend.id}
                  src={friend.avatar}
                  alt={friend.name}
                  className={`friend-avatar ${selectedFriends.includes(friend) ? 'selected' : ''}`}
                  onClick={() => toggleFriend(friend)}
                  style={{ width: '40px', borderRadius: '50%', margin: '5px', cursor: 'pointer' }}
                />
              ))}
            </div>
            <button onClick={handleAdd}>Add</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ScheduleModal;
