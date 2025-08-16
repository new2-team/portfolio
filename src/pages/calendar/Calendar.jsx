import { format } from 'date-fns';
import { useState } from 'react';
import ScheduleModal from '../chat/ScheduleModal';
import CalendarDay from './CalendarDay';
import CalendarMonth from './CalendarMonth';
import ComingSchedule from './ComingSchedule';
import CompletedSchedule from './CompletedSchedule';
import MiniCalendar from './MiniCalendar';
import S from './style2';

const Calendar = () => {
  // MiniCalendar에서 보낸 selectedDate 관리
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd')); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // MiniCalendar에서 가져온 날짜 등록
  const handleMiniCalendarDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEventId('mini'); // mini placeholder for eventId
  };

  // ComingSchedule에서 가져온 item 등록
  const handleComingItemClick = (item) => {
    
  }

  // CompletedSchedule에서 가져온 item 등록
  const handleCompletedItemClick = (item) => {

  } 
  // 선택한 id(miniCalendar인지, calenderMonth인지), 선택한 날짜 보내는 함수
  const handleEventClick = (eventId, eventDate) => {
    setSelectedEventId(eventId);
    setSelectedDate(eventDate);
  };
  // MonthCalender로 이동 -> 이거 나중에 DayCalender 에서 월 클릭하면 연결하기 
  const handleBackToMonth = () => { 
    setSelectedEventId(null);
  };

  return (
    <S.Container>
      <S.Sidebar>
        <MiniCalendar onDateClick={handleMiniCalendarDateClick} />
        <ComingSchedule onComingItemClick={handleComingItemClick} />
        <CompletedSchedule onCompletedItemClick={handleCompletedItemClick} />
      </S.Sidebar>

      <S.Main mt={20} mr={20} mb={20} ml={15}>
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
      </S.Main>

      {isModalOpen && (
        <ScheduleModal
          step={2}
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
  </S.Container>
  );
};

export default Calendar;
