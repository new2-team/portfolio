import styles from './style';

const ComingSchedule = () => {
  const schedules = [
    { id: 1, title: "Soul's birthday party" },
    { id: 2, title: "Meeting with team" },
  ];

  return (
    <div style={styles.comingSchedule}>
      <h3>다가오는 일정</h3>
      {schedules.map((schedule) => (
        <div key={schedule.id} style={styles.scheduleItem}>
          {schedule.title}
        </div>
      ))}
    </div>
  );
};

export default ComingSchedule;
