import { addDays, format, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import Diary from './Diary';
import Schedule from './Schedule';

const CalendarDay = ({ eventId, onBack, initialDate }) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  const weekStart = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });

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
    <div style={{ padding: '20px' }}>
      <div>
        <button onClick={onBack} style={{ marginRight: '10px' }}>← Back</button>
        <h2>선택된 일정 상세: {selectedDate}</h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {weekDates.map((d) => (
          <div
            key={d.date}
            onClick={() => handleDateChange(d.date)}
            style={{
              flex: '0 0 auto',
              padding: '8px 10px',
              borderRadius: '8px',
              backgroundColor: selectedDate === d.date ? '#000' : '#f0f0f0',
              color: selectedDate === d.date ? '#fff' : '#000',
              cursor: 'pointer',
              textAlign: 'center',
              minWidth: '65px',
              maxWidth: '80px',
              height: '60px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '13px',
              lineHeight: '16px',
            }}
          >
            <div>{d.day}</div>
            <div>{d.dayNum}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', padding: '10px' }}>
        <Schedule eventId={eventId} selectedDate={selectedDate} />
        <Diary eventId={eventId} selectedDate={selectedDate} />
      </div>
    </div>
  );
};

export default CalendarDay;
