import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import styles from './style';


const Schedule = ({ eventId, selectedDate }) => {
  const [schedule, setSchedule] = useState({});
  const [title, setTitle] = useState('');
  const [showError, setShowError] = useState(false); // input창 유효성

  const [startTime, setStartTime] = useState(null); // startTime 입력


  const [location, setLocation] = useState('');

  const [selectedFriends, setSelectedFriends] = useState([]);
  const [hoveredFriend, setHoveredFriend] = useState(null); // ✅ hover 상태

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  useEffect(() => {
    const dummy = {};
    // const dummy = {
    //   title: 'Meeting with Melody',
    //   date: '2023-12-17',
    //   startTime: '6:00',
    //   endTime: '7:00',
    //   location: '멍멍 애견카페',
    //   friends: [
    //     '/assets/img/chat/soul.png',
    //     '/assets/img/chat/melody.png',
    //     '/assets/img/chat/coco.png',
    //     '/assets/img/chat/soul.png',
    //     '/assets/img/chat/melody.png',
    //     '/assets/img/chat/coco.png',
    //     '/assets/img/chat/soul.png',
    //     '/assets/img/chat/melody.png',
    //     '/assets/img/chat/coco.png',
    //     '/assets/img/chat/soul.png',
    //     '/assets/img/chat/melody.png',
    //     '/assets/img/chat/coco.png',
    //   ],
    // };
    setSchedule(dummy);
  }, [eventId]);

  const handleSelectFriend = (friend) => {
    if (schedule.title) {
      setSelectedFriends([friend]);
    } else {
      setSelectedFriends(schedule.friends);
    }
  };

  let formattedSelectedDate = '날짜 없음';
  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj)) {
      formattedSelectedDate = dateObj.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
      });
    }
  }

  // 저장버튼
  const handleSave = () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }
    // 저장 로직
    setShowError(false);
  };

  return (
    <div style={styles.scheduleCard}>
      {schedule.title ? (
        <h3 style={styles.scheduleTitle}>{schedule.title}</h3>
      ) : (
        <input
          type="text"
          placeholder="새로운 일정을 추가해주세요"
          value={title}
          onChange={handleTitleChange}
          style={styles.scheduleTitle}
        />
      )}

      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faCalendarDays} style={styles.icon} />
        <div style={styles.inputGroup}>
          <span>{schedule.date || formattedSelectedDate}</span>
        </div>
      </div>

      {schedule.startTime && schedule.endTime ? (
        <div style={styles.inputGroupContainer}>
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
          <span style={styles.inputGroup}>
            {schedule.startTime} ~ {schedule.endTime}
          </span>
        </div>
      ) : (
        <div style={styles.inputGroupContainer}>
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
          <span style={styles.inputGroup}>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              // timeCaption="시작 시간"
              dateFormat="h:mm aa"
              placeholderText="시작 시간을 선택하세요"
              style={styles.datePicker}
            />
          </span>
        </div>
      )}

      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faLocationDot} style={styles.icon} />
        <span style={styles.inputGroup}>
          {schedule.location ? (
            <span>{schedule.location}</span>
          ) : (
            <input
              type="text"
              placeholder="장소를 입력하세요"
              value={location}
              onChange={handleLocationChange}
              style={{
                border: 'none',
                background: 'transparent',
                flex: 1,
                fontSize: '14px',
                outline: 'none',
              }}
            />
          )}
        </span>
      </div>

      {schedule.friends && schedule.friends.length > 0 && (
        <div
          className="friends-select"
          style={{
            ...styles.friendsSelect,
            maxWidth: `${(80 + 10) * 5}px`, // ✅ 80px(avatar) + 10px(margin) * 5
          }}
        >
          {schedule.friends.map((f, idx) => (
            <img
              key={idx}
              src={f}
              alt="friend"
              onClick={() => handleSelectFriend(f)}
              onMouseEnter={() => setHoveredFriend(f)}
              onMouseLeave={() => setHoveredFriend(null)}
              style={{
                ...styles.friendAvatar,
                ...(selectedFriends.includes(f) ? styles.selectedFriendAvatar : {}),
                filter: hoveredFriend === f ? 'brightness(0.85)' : 'none',
              }}
            />
          ))}
        </div>
      )}

      <div style={styles.scheduleButtons}>
        {schedule.title ? (
          <>
            <BasicButton
              roundButton="small"
              variant="default"
              style={styles.editButton}
            >
              수정하기
            </BasicButton>
            <BasicButton
              roundButton="small"
              variant="filled"
              style={styles.deleteButton}
            >
              삭제하기
            </BasicButton>
          </>
        ) : (
          <BasicButton
            roundButton="small"
            variant="filled"
            onClick={handleSave}
            style={styles.saveButton}
          >
            저장하기
          </BasicButton>
        )}
      </div>
    </div>
  );
};

export default Schedule;
