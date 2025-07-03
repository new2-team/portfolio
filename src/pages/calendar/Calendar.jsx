import { format } from 'date-fns';
import { useState } from 'react';
import ScheduleModal from '../chat/ScheduleModal';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import ComingSchedule from './ComingSchedule';
import CompletedSchedule from './CompletedSchedule';
import MiniCalendar from './MiniCalendar';
import styles from './style';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleMiniCalendarDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEventId('mini'); // mini placeholder for eventId
  };

  const handleEventClick = (eventId, eventDate) => {
    setSelectedEventId(eventId);
    setSelectedDate(eventDate);
  };

  const handleBackToMonth = () => { 
    setSelectedEventId(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <MiniCalendar onDateClick={handleMiniCalendarDateClick} />
        <ComingSchedule />
        <CompletedSchedule />
      </div>

      <div style={styles.main}>
        {selectedEventId ? (
          <CalendarDay
            eventId={selectedEventId}
            onBack={handleBackToMonth}
            initialDate={selectedDate}
          />
        ) : (
          <CalendarMonth
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {isModalOpen && (
        <ScheduleModal
          step={2}
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Calendar;
