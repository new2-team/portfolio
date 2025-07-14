import { addDays, format, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import Diary from './Diary';
import Schedule from './Schedule';
import styles from './style';

const CalendarDay = ({ eventId, onBack, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const weekStart = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });

  // ✅ selectedDate 기준으로 영문 월 + 연도 표시
  const selectedMonthYear = format(new Date(selectedDate), 'MMMM yyyy');

  const weekDates = Array.from({ length: 7 }).map((_, idx) => {
    const dateObj = addDays(weekStart, idx);
    return {
      day: format(dateObj, 'EEEE'),
      date: format(dateObj, 'yyyy-MM-dd'),
      dayNum: format(dateObj, 'd'),
    };
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div style={styles.calendarDay}>
      <h3 style={styles.calendarDayTitle}>
        {selectedMonthYear}
      </h3>

      <div style={styles.calendarDayHeaderContainer}>
        {weekDates.map((d) => (
          <div
            key={d.date}
            onClick={() => handleDateChange(d.date)}
            style={{
              flex: '1 1 0',
              padding: '8px 10px',
              borderRadius: '15px',
              backgroundColor: selectedDate === d.date ? '#000' : '#f0f0f0',
              color: selectedDate === d.date ? '#fff' : '#000',
              cursor: 'pointer',
              textAlign: 'center',
              height: '60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
              lineHeight: '16px',
              minWidth: '0',
              maxWidth: 'none',
            }}
          >
            <div style={styles.headerEng}>{d.day}</div>
            <div style={styles.headerDay}>{d.dayNum}</div>
          </div>
        ))}
      </div>


      <div style={styles.calendarDayContainer}>
        <Schedule eventId={eventId} selectedDate={selectedDate} />
        <Diary eventId={eventId} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default CalendarDay;
