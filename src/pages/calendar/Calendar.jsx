import { useState } from 'react';
import ScheduleModal from '../chat/ScheduleModal';
import CalendarMonth from './CalendarMonth';
import ComingSchedule from './ComingSchedule';
import CompletedSchedule from './CompletedSchedule';
import MiniCalendar from './MiniCalendar';
import styles from './style';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <MiniCalendar onDateClick={handleDateClick} />
        <ComingSchedule />
        <CompletedSchedule />
      </div>

      <div style={styles.main}>
        <CalendarMonth onDateClick={handleDateClick} />
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
