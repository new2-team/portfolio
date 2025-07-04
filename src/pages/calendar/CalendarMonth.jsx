import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useRef } from 'react';
import './Calendar.css';
import styles from './style';

const CalendarMonth = ({ onDateClick, onEventClick }) => {
  const calendarRef = useRef(null);

  const events = [
    {
      id: '1',
      title: "Soul's birthday party",
      date: '2025-07-04',
      description: 'Soul의 생일 파티입니다.',
    },
    {
      id: '3',
      title: "애견카페 가는날",
      date: '2025-07-04',
      description: 'Soul의 생일 파티입니다.',
    },
    {
      id: '2',
      title: "Meeting with team",
      date: '2025-07-10',
      description: '프로젝트 회의',
    },
  ];

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    onDateClick(clickedDate);
  };

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    const eventDate = info.event.startStr.slice(0, 10);
    onEventClick(eventId, eventDate);
  };

  return (
    <div className={styles.calendarContainer}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="auto"
        eventColor="#FFDECD"
        eventTextColor="#000000"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next'
        }}
      />
    </div>

  );
};

export default CalendarMonth;
