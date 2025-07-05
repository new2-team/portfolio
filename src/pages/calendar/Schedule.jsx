import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from './style';

const Schedule = ({ eventId, selectedDate }) => {
  const [schedule, setSchedule] = useState({}); // ✅ 초기값 빈 객체로 설정
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  useEffect(() => {
    // 🔥 테스트: 데이터 없는 상태
    // const dummy = {};
    const dummy = {
      title: 'Meeting with Melody',
      date: '2023-12-17',
      startTime: '6:00',
      endTime: '7:00',
      location: '멍멍 애견카페',
      friends: [
        '/assets/img/chat/soul.png',
        '/assets/img/chat/melody.png',
        '/assets/img/chat/coco.png',
      ],
    };
    setSchedule(dummy);
  }, [eventId]);

  // ✅ selectedDate 안전 변환
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

  return (
    <div style={styles.scheduleCard}>
      {/* ✅ title */}
      {schedule.title ? (
        <h3 style={styles.scheduleTitle}>{schedule.title}</h3>
      ) : (
        <input
          type="text"
          placeholder="새로운 일정을 추가해주세요"
          value={title}
          onChange={handleTitleChange}
          className="modal-title-input"
          style={{
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            fontWeight: '600',
            flex: 1,
            background: 'transparent',
          }}
        />
      )}

      {/* ✅ date */}
      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faCalendarDays} style={styles.icon} />
        <span>{schedule.date || formattedSelectedDate}</span>
      </div>

      {/* ✅ time (출력만) */}
      {schedule.startTime && schedule.endTime && (
        <div style={styles.inputGroupContainer}>
          <FontAwesomeIcon icon={faClock} style={styles.icon} />
          <span>
            {schedule.startTime} ~ {schedule.endTime}
          </span>
        </div>
      )}

      {/* ✅ location */}
      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faLocationDot} style={styles.icon} />
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
      </div>

      {/* ✅ friends */}
      {schedule.friends && schedule.friends.length > 0 && (
        <div style={styles.friendsSelect}>
          {schedule.friends.map((f, idx) => (
            <img key={idx} src={f} alt="friend" style={styles.friendAvatar} />
          ))}
        </div>
      )}

      {/* ✅ buttons */}
      <div style={styles.scheduleButtons}>
        <button style={styles.editButton}>수정하기</button>
        <button style={styles.deleteButton}>삭제하기</button>
      </div>
    </div>
  );
};

export default Schedule;
