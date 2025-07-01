import styles from './style';

const MiniCalendar = ({ onDateClick }) => {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div style={styles.miniCalendar}>
      <h3>Mini Calendar</h3>
      <div
        style={styles.miniCalendarDate}
        onClick={() => onDateClick(today)}
      >
        {today}
      </div>
    </div>
  );
};

export default MiniCalendar;
