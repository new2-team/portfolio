const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '90vh',
    backgroundColor: '#D2D4D4'
  },
  sidebar: {
    width: '20%',
    height: '100%',
    minWidth: '200px',
    padding: '10px',
    backgroundColor: '#D2D4D4',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  main: {
    flex: 1,
    width: '100%',
    padding: '20px',
    margin: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    backgroundColor: "#fff",
    borderRadius: '20px',
  },
  // 미니 캘린더 위젯
  miniCalendar: {
    backgroundColor: "#fff",
    borderRadius: '8px',
    padding: '20px',
    margin: '10px 0 10px 10px',
    borderRadius: '20px',
  },
  miniCalendarDate: {
    padding: '5px',
    backgroundColor: '#f1f1f1',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  // 일정 알림 위젯
  comingSchedule: {
    margin: '20px 0 10px 10px',
    padding: '20px 20px 5px 20px',
    backgroundColor: "#fff",
    borderRadius: '20px',
  },
  mainTitle: {
    marginLeft: '10px',
  },
  scheduleContainer: {
    backgroundColor: "#fff",
    borderRadius: '20px',
    paddingTop: '10px',
  },
  scheduleItem: {
    backgroundColor: "#fff",
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  scheduleIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#fff',
    color: '#ffba2c',
    display: 'flex',
    alignItems: 'center',
  },
  completedIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#fff',
    color: '#f74c26',
    display: 'flex',
    alignItems: 'center',
  },
  scheduleText: {
    display: 'flex',
    flexDirection: 'column',
  },
  scheduleLabel: {
    fontSize: '12px',
    color: 'gray',
  },
  scheduleTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  // 월별 캘린더
   calendarMonth: {
    marginTop: '20px',
    padding: '10px',
  },
};

export default styles;
