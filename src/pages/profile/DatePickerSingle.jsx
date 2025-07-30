import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import BasicInput from '../../components/input/BasicInput';
import { getMonth, getYear } from 'date-fns';


const StyledDatePicker = styled(DatePicker)`
  .react-datepicker {
    width: 350px ;
    height: 400px ;
    box-sizing: border-box;
  }
  
  /* 헤더 고정 높이 */
  .react-datepicker__header {
    height: 80px ;
    flex-shrink: 0;
  }
  
  /* 월 컨테이너 나머지 공간 차지 */
  .react-datepicker__month-container {
    height: 320px ; /* 전체 - 헤더 높이 */
    overflow: hidden;
  }

  
  /* 각 날짜 셀 크기 고정 */
  .react-datepicker__day {
      width: 40px ;
      height: 40px ;
      line-height: 40px;
      margin: 1px 
    }
    
    .react-datepicker__day-name {
        width: 40px ;
        height: 30px ;
        line-height: 30px ;
    }
    .react-datepicker__month {
      flex-direction: column-reverse; 
    }
    `;
    const CustomInput = React.forwardRef(({ value, onClick}, ref) => {
        return(
            <BasicInput
            onClick = {onClick} 
            ref = {ref}
            value = {value}
            readOnly
            style={{width: '100%'}}
        />);
    })

const DatePickerSingle = (({ selected, onChange, ...props }, ref) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
const currentYear = getYear(new Date());
const years = Array.from(
    { length: currentYear - 1990 + 1 }, 
    (_, i) => 1990 + i
);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (onchange) onchange(date); // 부모 컴포넌트로 전달
    };
  return (
    <StyledDatePicker
        ref={ref}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}> 
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={selectedDate}
      setSelectedDate={setSelectedDate}
      onChange={handleDateChange}
      customInput={<CustomInput />} // 팀 공용 컴포넌트를 그대로 사용
      
    />
  );
});
export default DatePickerSingle;