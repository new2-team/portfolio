import { format } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './style';

const MiniCalendar = ({ onDateClick }) => {
  const [selected, setSelected] = useState(new Date());

  const handleDateChange = (date) => {
    setSelected(date);
    const formatted = format(date, 'yyyy-MM-dd');
    onDateClick(formatted);
  };

  return (
    <div style={styles.miniCalendar}>
      <div className="calendar-container">
        <DatePicker
          selected={selected}
          onChange={handleDateChange}
          inline
          calendarStartDay={0} // ✅ 일요일 시작 (react-datepicker는 locale 설정 기반)
        />
      </div>
    </div>
  );
};

export default MiniCalendar;
