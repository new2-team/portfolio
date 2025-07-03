import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style';

const ComingSchedule = () => {
  const schedules = [
    { id: 1, title: "Soul's birthday party" },
    { id: 2, title: "Meeting with team" }, 
  ];

  return (
    <div style={styles.comingSchedule}>  
      <h3 style={styles.mainTitle}>다가오는 일정</h3>
      <div style={styles.scheduleContainer}>
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              style={{
                ...styles.scheduleItem,
                borderTop: '1px solid #ddd',
                paddingTop: '15px',
                paddingBottom: '15px',
              }}
            >
              <FontAwesomeIcon icon={faCircleCheck} style={styles.scheduleIcon} />
              <div style={styles.scheduleText}>
                <div style={styles.scheduleLabel}>예정된 일정</div>
                <div style={styles.scheduleTitle}>{schedule.title}</div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ComingSchedule;
