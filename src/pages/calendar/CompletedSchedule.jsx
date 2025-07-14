import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style';

const CompletedSchedule = () => {
  const completed = [
    { id: 1, title: "Taking a walk by the Han River" },
    { id: 2, title: "Completed project review" },
  ];

  return (
    <div style={styles.comingSchedule}>  
      <h3 style={styles.mainTitle}>완료된 일정, 일기를 남겨주세요!</h3>
      <div style={styles.scheduleContainer}>
          {completed.map((schedule) => (
            <div
              key={completed.id}
              style={{
                ...styles.scheduleItem,
                borderTop: '1px solid #ddd',
                paddingTop: '15px',
                paddingBottom: '15px',
              }}
            >
              <FontAwesomeIcon icon={faCircleCheck} style={styles.completedIcon} />
              <div style={styles.scheduleText}>
                <div style={styles.scheduleLabel}>완료된 일정</div>
                <div style={styles.scheduleTitle}>{schedule.title}</div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default CompletedSchedule;
