import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../styles/theme';
import S from './style2';

const ComingSchedule = (item) => {
  const schedules = [
    { id: 1, title: "소울이 생일파티" },
    { id: 2, title: "Meeting with team" },  
  ];

  return (
    <S.InputWrapper mt={20} mr={0} mb={20} ml={10}
                    pt={20} pl={20} pb={1} pr={20}>
      <S.MainTitle>다가오는 일정</S.MainTitle>
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
