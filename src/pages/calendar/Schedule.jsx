import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

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
    <div className="schedule-card">
      <h3>{schedule.title}</h3>
      <div className="input-group-container">
        <FontAwesomeIcon icon={faCalendarDays} style={{ marginRight: '10px' }} />
        <span>{schedule.date}</span>
      </div>
      <div className="input-group-container">
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} />
        <span>{schedule.startTime} ~ {schedule.endTime}</span>
      </div>
      <div className="input-group-container">
        <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px' }} />
        <span>{schedule.location}</span>
      </div>

      <div className="friends-select">
        {schedule.friends.map((f, idx) => (
          <img key={idx} src={f} alt="friend" className="friend-avatar" />
        ))}
      </div>

      <div className="schedule-buttons">
        <button className="edit-button">Edit</button>
        <button className="delete-button">Delete</button>
      </div>
    </div>
  );
};

export default Schedule;
