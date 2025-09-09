import { addDays, format, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import Diary from './Diary';
import Schedule from './Schedule';
import S from './style2';

const CalendarDay = ({ scheduleInfo, onBack, initialDate, refreshKey = 0 }) => {
  const user_id = localStorage.getItem('user_id');
  // 선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [schedule, setSchedule] = useState(scheduleInfo);
  // const [refresh, setRefresh] = useState();
  // console.log("initialDate", initialDate);
  // console.log("scheduleInfo", scheduleInfo);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    const getSchedules = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/calendar/api/get-schedules/${user_id}?date=${selectedDate}`
        );

        if(!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        setSchedule(data?.schedules ?? []);
        console.log("받아온 일정: ", data);

      } catch (err) {
        console.error("일정 불러오기 실패: ", err)
      }
    };

    if(user_id){
      getSchedules();
    }
  }, [user_id, selectedDate, refreshKey]);

  

  const weekStart = startOfWeek(new Date(selectedDate), { weekStartsOn: 0 });

  // selectedDate 기준으로 영문 월 + 연도 표시
  const selectedMonthYear = format(new Date(selectedDate), 'MMMM yyyy');

  const weekDates = Array.from({ length: 7 }).map((_, idx) => {
    const dateObj = addDays(weekStart, idx);
    return {
      day: format(dateObj, 'EEEE'),
      date: format(dateObj, 'yyyy-MM-dd'),
      dayNum: format(dateObj, 'd'),
    };
  });

  // 주간 캘린더로 날짜 변경할 때
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <S.CalendarDay>
      <S.CalendarDayTitle mt={30} ml={30} mb={30} mr={0} onClick={onBack}>
        {selectedMonthYear}
      </S.CalendarDayTitle>

      <S.CalendarDayHeaderContainer>
        {weekDates.map((d) => (
          <S.WeekDateBox
            key={d.date}
            isSelected={selectedDate === d.date}
            onClick={() => handleDateChange(d.date)}
          >
            <S.HeaderEng>{d.day}</S.HeaderEng>
            <S.HeaderDay>{d.dayNum}</S.HeaderDay>
          </S.WeekDateBox>
        ))}
      </S.CalendarDayHeaderContainer>

        {/* prop으로 schedule.id 전해주기 */}
      <S.CalendarDayContainer>
        <Schedule selectedSchedule={schedule} selectedDate={selectedDate} />  
        <Diary selectedSchedule={schedule} selectedDate={selectedDate} />
      </S.CalendarDayContainer>
    </S.CalendarDay>

  );
};

export default CalendarDay;
