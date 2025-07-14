import React from 'react';
import Calendar from 'react-calendar';
import S from './style';

const CalendarWidgetMiniCalendar = () => {
 return (
  <S.Calendar>
   <S.StyledCalendar formatDay={(locale, date) => date.getDate()}/>
  </S.Calendar>
 );
};

export default CalendarWidgetMiniCalendar;