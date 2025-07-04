import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styles from './style';

const Schedule = ({ eventId }) => {
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    // 🔥 실제로는 API 또는 context에서 eventId로 fetch
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

  if (!schedule) return <div>Loading...</div>;

  return (
    <div style={styles.scheduleCard}>
      <h3 style={styles.scheduleTitle}>{schedule.title}</h3>

      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faCalendarDays} style={styles.icon} />
        <span>{schedule.date}</span>
      </div>

      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faClock} style={styles.icon} />
        <span>{schedule.startTime} ~ {schedule.endTime}</span>
      </div>

      <div style={styles.inputGroupContainer}>
        <FontAwesomeIcon icon={faLocationDot} style={styles.icon} />
        <span>{schedule.location}</span>
      </div>

      <div style={styles.friendsSelect}>
        {schedule.friends.map((f, idx) => (
          <img key={idx} src={f} alt="friend" style={styles.friendAvatar} />
        ))}
      </div>

      <div style={styles.scheduleButtons}>
        <button style={styles.editButton}>수정하기</button>
        <button style={styles.deleteButton}>삭제하기</button>
      </div>
    </div>

  );
};

export default Schedule;
