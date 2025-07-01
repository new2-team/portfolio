const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  sidebar: {
    width: '300px',
    borderRight: '1px solid #ccc',
    padding: '10px',
    boxSizing: 'border-box',
  },
  main: {
    flex: 1,
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
  },
  miniCalendar: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '20px',
  },
  miniCalendarDate: {
    padding: '5px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  comingSchedule: {
    marginBottom: '20px',
  },
  completedSchedule: {
    marginBottom: '20px',
  },
  scheduleItem: {
    padding: '5px',
    backgroundColor: '#fafafa',
    borderRadius: '4px',
    marginTop: '5px',
  },
   calendarMonth: {
    marginTop: '20px',
    padding: '10px',
  },
  scheduleItem: {
    backgroundColor: '#f4f4f4',
    padding: '5px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default styles;
