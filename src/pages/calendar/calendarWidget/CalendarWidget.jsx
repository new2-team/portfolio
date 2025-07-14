import React from 'react';
import CalendarWidgetMiniCalendar from './CalendarWidgetMiniCalendar';
import CalendarWidgetPlan from './CalendarWidgetPlan';
import CalendarWidgetreview from './CalendarWidgetreview';
import S from './style.js';

const CalendarWidget = () => {
 return (
  <S.CalendarWrapper>
    <CalendarWidgetMiniCalendar/>
    <CalendarWidgetPlan/>
    <CalendarWidgetreview/>
  </S.CalendarWrapper>
 );
};

export default CalendarWidget;