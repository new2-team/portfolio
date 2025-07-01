import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style';

const CalendarMonth = ({ onDateClick }) => {
  const navigate = useNavigate();
  const calendarRef = useRef(null);

  const events = [
    { title: "Soul's birthday party", date: '2023-12-04' },
    { title: "Meeting with team", date: '2023-12-10' },
  ];

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    onDateClick(clickedDate);
  };

  const handleEventClick = (info) => {
    const date = info.event.startStr;
    navigate(`/calendar/day/${date}`);
  };

  return (
    <div style={styles.calendarMonth}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
};

export default CalendarMonth;
