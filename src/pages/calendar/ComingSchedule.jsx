import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import useComingSchedules from '../../hooks/CalendarAPI/useComingSchedules';
import theme from '../../styles/theme';
import S from './style2';

const ComingSchedule = (item) => {
  // user_id는 전역에 있는거 가져다 쓰기
  // Redux에서 currentUser 가져오기
  const currentUser = useSelector((state) => state.user.currentUser);
  const user_Id = currentUser?.user_Id; // 백에서 내려주는 필드명에 맞춰서 변경

  // 훅함수(5초마다 자동 갱신)
  const { data: schedules, loading, error } = useComingSchedules(user_Id, { pollMs: 5000 });

  // 로딩 - 로딩 아이콘 띄우기
  {loading && <p>불러오는 중…</p>}

  // 에러 - 에러 팝업 띄우기
  {error && <p style={{ color: 'red' }}>에러: {error.message}</p>}

  // const schedules = [
  //   { id: 1, title: "소울이 생일파티" },
  //   { id: 2, title: "Meeting with team" },  
  // ];

  return (
    <S.InputWrapper mt={20} mr={0} mb={20} ml={10}
                    pt={20} pl={20} pb={1} pr={20}>
      <S.MainTitle>다가오는 일정</S.MainTitle>
      {(!loading && schedules?.length === 0) && <S.ScheduleLabel>예정된 일정이 없습니다.</S.ScheduleLabel>}
      <S.ScheduleContainer>
        {schedules.map((schedule) => (
          <S.ScheduleItem key={schedule.id}>
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.secondary.main, width: '24px', height: '24px' }} />
            <S.ScheduleText>
              <S.ScheduleLabel>예정된 일정</S.ScheduleLabel>
              <S.ScheduleTitle>{schedule.title}</S.ScheduleTitle>
            </S.ScheduleText>
          </S.ScheduleItem>
        ))}
      </S.ScheduleContainer>
    </S.InputWrapper>
  );
};

export default ComingSchedule;
