import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import styles from './style';

const Schedule = ({ eventId, selectedDate }) => {
  const [date, setDate] = useState(selectedDate);
  const [schedule, setSchedule] = useState({});
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [location, setLocation] = useState('');

  const [friends, setFriends] = useState([
    '/assets/img/chat/soul.png',
    '/assets/img/chat/melody.png',
    '/assets/img/chat/coco.png',
    '/assets/img/chat/soul.png',
    '/assets/img/chat/melody.png',
    '/assets/img/chat/coco.png',
  ]);

  const [selectedFriends, setSelectedFriends] = useState([]); // 선택된 친구
  const [hoveredFriend, setHoveredFriend] = useState(null);

  const [showError, setShowError] = useState(false);
  // 백에서 온 메세지
  const [value, setValue] = useState("")
  const onChangeValue = (e) => {
    setValue(e.target.value)
  }


  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  useEffect(() => {
    const dummy = {};
  //   const dummy = {
  //   title: '한강 산책 모임',
  //   date: '8월 3일 (토)',
  //   startTime: '18:00',
  //   endTime: '20:00',
  //   location: '여의나루역 2번 출구 앞',
  // };
    setSchedule(dummy);
  }, [eventId]);

  const handleSelectFriend = (friend) => {
    if (schedule.title) {
      setSelectedFriends([friend]);
    } else {
      // toggle 방식
      setSelectedFriends((prev) =>
        prev.includes(friend)
          ? prev.filter((f) => f !== friend)
          : [...prev, friend]
      );
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
  const handleSave = async () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    await fetch(`http://localhost:8000/calendar/api/post-schedules`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        title : title,
        date: date,
        time: startTime,
        place: location
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
  };

  return (
    <div style={styles.scheduleCard}>
      {schedule.title ? (
        <h3 style={styles.scheduleTitle2}>{schedule.title}</h3>
      ) : (
        <input
          type="text"
          placeholder="새로운 일정을 추가해주세요"
          value={title}
          onChange={handleTitleChange}
          style={styles.scheduleTitle2}
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
              dateFormat="h:mm aa"
              placeholderText="시작 시간을 선택하세요"
              customInput={
                <input
                  style={styles.datePicker}
                />
              }
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
              style={styles.location}
            />
          )}
        </span>
      </div>

      <div
        className="friends-select"
        style={{
          ...styles.friendsSelect,
          maxWidth: `${(80 + 10) * 5}px`,
        }}
      >
        {(schedule.friends && schedule.friends.length > 0 ? schedule.friends : friends).map((f, idx) => (
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
          // 수정하기 누르면 -> 저장하기 나오게 하기
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
