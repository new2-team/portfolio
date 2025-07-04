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
    // padding: '20px',
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
  // 일별 캘린더
  calendarDay: {
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
  calendarDayTitle: {
    marginTop: '20px',
    marginLeft: '20px',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '600',
  },
  calendarDayHeaderContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    gap: '10px',
    width: '100%',
    padding: '20px',
  },
  headerEng: {
    marginBottom: '3px',
  },
  headerDay: {
    fontSize: '20px',
    fontWeight: '700',
  },
  // 일별 이너 컨테이너 시작
  calendarDayContainer: {
    display: 'flex', 
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '100%',
    // height: '100%',
    backgroundColor: '#F6F6F6',
    borderRadius: '20px',
    boxSizing: 'border-box',
    padding: '20px',
    gap: '20px',
  },
  
  // Schedule
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  scheduleTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  inputGroupContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    color: '#333',
    fontSize: '14px',
  },
  icon: {
    marginRight: '10px',
    color: '#555',
  },
  friendsSelect: {
    display: 'flex',
    marginTop: '12px',
    marginBottom: '12px',
  },
  friendAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '6px',
  },
  scheduleButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  // Diary
  diaryCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  diaryTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
  },
  textarea: {
    width: '100%',
    height: '200px',
    resize: 'none',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  diaryButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageUploadButton: {
    fontSize: '20px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },

};

export default styles;
