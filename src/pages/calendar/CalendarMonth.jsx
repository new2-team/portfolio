import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import './Calendar.css';
import S from './style2';

const CalendarMonth = ({ onDateClick, onEventClick, refreshKey = 0, initialDate }) => {
  const user_id = useSelector((state) => state.user.currentUser?.user_id);
  const calendarRef = useRef(null);
  console.log("refreshKey", refreshKey);

  const [schedules, setSchedules] = useState([]);
  

  useEffect(() => {
    let aborted = false; // 안전 장치(언마운트 중 setState 방지)

    const getSchedulesNames = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/calendar/api/month-schedules/${user_id}`
        );

        if (!response.ok) {
          throw new Error(`서버 응답 에러: ${response.status}`);
        }

        const data = await response.json();
        const schedules = data.schedules;
        setSchedules(schedules);

        // console.log("받아온 일정: ", schedules);

        // 필요하면 여기서 setState 호출
        // setSchedules(schedules);
      } catch (err) {
        console.error("일정 불러오기 실패:", err);
      }
    };

    if (user_id) {
      getSchedulesNames();
    }
  }, [user_id, refreshKey]); // user_id 바뀌면 다시 실행, 일정 추가할때마다(모달 열릴 때 마다)

  // 캘린더 버전으로 매핑
  const calendarEvents = useMemo(() => {
    return (schedules || []).map((s) => {
      const hasTime = s.time && /^\d{2}:\d{2}$/.test(s.time); // "18:00" 등
      const start = hasTime ? `${s.date}T${s.time}` : s.date;  // "YYYY-MM-DD" or "YYYY-MM-DDTHH:mm"

      return {
        id: String(s._id || s.id),
        title: s.title,
        start,
        allDay: !hasTime,
        // 클릭 시 원본 객체 통째로 전달하려고 저장
        extendedProps: { schedule: s },
      };
    });
  }, [schedules]);


  // 월별 캘린더 날짜 클릭했을때
  const handleDateClick = (info) => { 
    const clickedDate = info.dateStr;
    onDateClick(clickedDate);
  };

  // 월별 캘린더 일정제목 클릭했을때
  const handleEventClick = (info) => {
    const scheduleInfo = info.event.extendedProps?.schedule;
    const scheduleDate = info.event.startStr.slice(0, 10);
    onEventClick(scheduleInfo, scheduleDate);
    // console.log("캘린더에서 넘어온 값", scheduleInfo);
  };

  return (
    <S.CalendarContainer>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialDate={initialDate}
        events={calendarEvents}
        displayEventTime={false} 
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
        eventContent={(arg) => (
          <div style={{ fontWeight: 300, marginLeft: 5 }}>{arg.event.title}</div>
        )}
      />
    </S.CalendarContainer>
  );
};

export default CalendarMonth;
