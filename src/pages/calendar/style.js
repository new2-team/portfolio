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
    margin: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    backgroundColor: "#fff",
    borderRadius: '20px',
  },
  calendarContainer: {
    padding: '20px',
    overflow: 'auto',
    scrollbarWidth: 'none', 
    msOverflowStyle: 'none',
  },
  // ✅ Webkit 기반 (Chrome, Safari)
  '&::-webkit-scrollbar': {
    display: 'none',
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
    display: 'flex',
    backgroundColor: "#fff",
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  scheduleIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#fff',
    color: '#ffba2c',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#fff',
    color: '#f74c26',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: '12px',
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
    height: '100%',
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
    padding: '30px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 50px 0 50px',
  },
  scheduleTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '10px',
    marginBottom: '40px',
  },
  inputGroupContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    marginTop: '25px',
    color: '#333',
    fontSize: '20px',
  },
  icon: {
    size: '20px',
    marginRight: '15px',
    color: '#616161',
  }, 
  inputGroup: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: '10px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  friendsSelect: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    padding: '20px 0',
    scrollbarWidth: 'none',
    maxWidth: `${(80 + 10) * 5}px`,
    margin: '30px 0 30px 0',
  },
  friendAvatar: {
    flex: '0 0 auto',
    width: '80px',
    height: '80px',
    borderRadius: '50px',
    marginRight: '10px',
    cursor: 'pointer',
    objectFit: 'cover',
    border: '5px solid transparent',
    transition: 'border 0.2s',
  },
  scheduleButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    margin: '10px',
  },
  selectedFriendAvatar: {
    border: '4px solid #FFBA2C',
  },
  editButton: {
    width: '100%',
  },
  deleteButton: {
    width: '100%',
  },

  // Diary
  diaryCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    margin: '0 50px 0 50px',
  },
  diaryTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    padding: '10px',
  },
  textarea: {
    width: '100%',
    height: '400px',
    resize: 'none',
    marginBottom: '10px',
    padding: '10px',
    fontSize: '14px',
    borderRadius: '10px',
    backgroundColor: '#F6F6F6',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',   
  },
  diaryButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageUploadButton: {
    fontSize: '30px',
    cursor: 'pointer',
    padding: '10px',
  },
  saveButton: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '100%',
  },

};

export default styles;
