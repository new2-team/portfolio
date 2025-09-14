import { faCalendarDays, faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import S from './style2';

const Schedule = ({ selectedSchedule, selectedDate }) => {
  const user_id = localStorage.getItem('user_id');
  // console.log(user_id);
  // console.log("selectedSchedule: ", selectedSchedule);
  // const [user_Id, setUserId] = useState('6895c4d407695ea93734389a')
  const [date, setDate] = useState(selectedDate); // props에서 받은날짜
  // const [schedule, setSchedule] = useState(selectedSchedule ?? null); // 일정객체를 통째로 등록
  const schedule = selectedSchedule ?? null;
  console.log("day에서 넘겨받은 schedule객체: ",schedule);
  const hasExisting = !!schedule?.title;

  const [title, setTitle] = useState(''); // 일정 제목
  const [startTime, setStartTime] = useState(null); // 일정시작시간
  const [location, setLocation] = useState(''); // 일정 장소
  // 친구 목록 -> 친구 id값을 가지고와서 프로필을 띄워야 함
  const [friends, setFriends] = useState([
    '/assets/img/chat/soul.png',
    '/assets/img/chat/melody.png',
    '/assets/img/chat/coco.png',
    '/assets/img/chat/soul.png',
    '/assets/img/chat/melody.png',
    '/assets/img/chat/coco.png',
  ]);

  const [selectedFriends, setSelectedFriends] = useState([]); // 선택된 친구 -> id로 상태 저장
  const [hoveredFriend, setHoveredFriend] = useState(null);

  const [showError, setShowError] = useState(false);
  // 백에서 온 메세지
  const [value, setValue] = useState("")
  const onChangeValue = (e) => {
    setValue(e.target.value)
  }

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleSelectFriend = (friend) => {
    if (hasExisting) {
      setSelectedFriends([friend]);
    } else {
      // toggle 방식
      setSelectedFriends((prev) =>
        prev.includes(friend)
          ? prev.filter((f) => f !== friend)
          : [...prev, friend]
      );
    }
  };

  let formattedSelectedDate = '날짜 없음';
  if (selectedDate) {
    const dateObj = new Date(selectedDate);
    if (!isNaN(dateObj)) {
      formattedSelectedDate = dateObj.toLocaleDateString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
      });
    }
  }


  // 저장버튼 - api 일정 등록
  const handleSave = async () => {
    if (!title.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const onlyTime = startTime ? format(startTime, "HH:mm") : null;
    const onlyDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

    await fetch(`http://localhost:8000/calendar/api/post-schedules`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        user_id: user_id,
        chat_id: selectedFriends,
        title : title,
        date: onlyDate,
        time: onlyTime,
        location: location,
      })
    })
    .then((res) => {
      if(!res.ok) throw new Error(`Response Fetching Error`);
      return res.json()
    })
    .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
        // setValue("")
        // setIsUpdate(!isUpdate) // 상태 리랜더링
      })
      .catch(console.error)
  };
  
  // 수정버튼 - api 일정 수정 
  const handleEdit = async () => {
    try {
      const res = await fetch('http://localhost:8000/calendar/api/put-schedules', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user_id,
          // schedule_id: scheduleId, 
          schedule: {
            title,
            date: date,
            time: startTime,
            place: location,
          },
        }),
      });

      if (!res.ok) throw new Error("Response Fetching Error");
      const result = await res.json();
      console.log("updated:", result);
      alert(result.message ?? "일정이 수정되었습니다.");
      // TODO: refetch()
    } catch (e) {
      console.error(e);
      alert("수정 실패");
    }
  };


  // 삭제버튼 - api 일정 삭제
  const handleDelete = async () => {
  try {
    const res = await fetch(`http://localhost:8000/calendar/api/delete-schedules`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user_id,
        // schedule_id: scheduleid,
      }),
    });

    if (!res.ok) throw new Error("Response Fetching Error");
    const result = await res.json();
    console.log("deleted:", result);
    alert(result.message ?? "일정이 삭제되었습니다.");
  } catch (e) {
    console.error(e);
    alert("삭제 실패");
  }
};

  return (
    <S.ScheduleCard>
      {hasExisting ? (
        <S.ScheduleTitle1>{schedule?.title}</S.ScheduleTitle1>
      ) : (
        <S.ScheduleTitleInput
          type="text"
          placeholder="새로운 일정을 추가해주세요"
          value={title}
          onChange={handleTitleChange}
        />
      )}
      
      <S.InputGroupContainer>
        <FontAwesomeIcon icon={faCalendarDays} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
        <S.InputGroup>
          <span>{schedule?.date ?? formattedSelectedDate}</span>
        </S.InputGroup>
      </S.InputGroupContainer>

      {schedule?.time ? (
        <S.InputGroupContainer>
          <FontAwesomeIcon icon={faClock} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
          <S.InputGroup>
            {schedule.time}
          </S.InputGroup>
        </S.InputGroupContainer>
      ) : (
        <S.InputGroupContainer>
          <FontAwesomeIcon icon={faClock} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
          <S.InputGroup>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="h:mm aa"
              placeholderText="시작 시간을 선택하세요"
              customInput={<S.DateInput />}
            />
          </S.InputGroup> 
        </S.InputGroupContainer>
      )}

      <S.InputGroupContainer>
        <FontAwesomeIcon icon={faLocationDot} style={{ size: '20px', marginRight: '15px', color: '#616161' }} />
        <S.InputGroup>
          {schedule?.location ? (
            <span>{schedule.location}</span>
          ) : (
            <S.LocationInput
              type="text"
              placeholder="장소를 입력하세요"
              value={location}
              onChange={handleLocationChange}
            />
          )}
        </S.InputGroup>
      </S.InputGroupContainer>

      {/* 친구 목록 */}
      <S.FriendsSelect $maxWidth={(80 + 10) * 5}>
        {(schedule?.friends?.length ? schedule.friends : friends).map((f, idx) => (
          <S.FriendAvatar
            key={idx}
            src={f}
            alt="friend"
            onClick={() => handleSelectFriend(f)}
            onMouseEnter={() => setHoveredFriend(f)}
            onMouseLeave={() => setHoveredFriend(null)}
            $isSelected={selectedFriends.includes(f)}
            $isHovered={hoveredFriend === f}
          />
        ))}
      </S.FriendsSelect>

      <S.ScheduleButtons>
        {hasExisting ? (
          <>
            <BasicButton roundButton="small" variant="default" style={{ width: '100%' }}
                          onClick={handleEdit}>
              수정하기
            </BasicButton>
            <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }}
                          onClick={handleDelete}>
              삭제하기
            </BasicButton>
          </>
        ) : (
          <BasicButton roundButton="small" variant="filled" style={{ width: '100%' }}
                        onClick={handleSave}>
            저장하기
          </BasicButton>
        )}
      </S.ScheduleButtons>
    </S.ScheduleCard>
  );
};

export default Schedule;
