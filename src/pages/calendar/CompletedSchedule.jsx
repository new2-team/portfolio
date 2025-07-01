import styles from './style';

const CompletedSchedule = () => {
  const completed = [
    { id: 1, title: "Taking a walk by the Han River" },
    { id: 2, title: "Completed project review" },
  ];

  return (
    <div style={styles.completedSchedule}>
      <h3>완료된 일정</h3>
      {completed.map((item) => (
        <div key={item.id} style={styles.scheduleItem}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default CompletedSchedule;
