import styled from "styled-components";
import { flexColumn } from "../../../styles/common";
import Calendar from "react-calendar";

const S = {};

 S.CalendarWrapper = styled.div`
  ${flexColumn}
  width: 664px;
  height: 1302px;
  gap: 28px;
 `
 S.Calendar = styled.div`
  width: 664px;
  height: 474px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
   
  /* 캘린더 사이즈 */
  .react-calendar {
   width: 100%;
   height: 100%;
   background-color: white;
  }

  /* 요일 스타일 */
  .react-calendar__month-view__weekdays abbr {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 74px;
   height: 38px;
   text-decoration: none;
   font-weight: 800;
  }

  /* 요일 헤더 스타일 */
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    text-transform: none; /* 자동 대문자 방지 */
    font-size: 14px;
    color: #333;
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 74px;
   height: 62px;
   background-color: white;
   position: relative;
  }

  /* 오늘 날짜 표시 */
  .react-calendar__tile--now {
   background: orange;
   border-radius: 8px;
   abbr {
    color: white;
   }
  }

  abbr {
   text-decoration: none;
  }
 `

 S.Plan = styled.div`
  width: 664px;
  height: 386px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
 `

 S.Review = styled.div`
  width: 664px;
  height: 386px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
 `

 S.StyledCalendar = styled(Calendar)``;

export default S;