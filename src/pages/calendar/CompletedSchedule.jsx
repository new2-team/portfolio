import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from '../../styles/theme';
import S from './style2';

const CompletedSchedule = (item) => {
  const completed = [
    { id: 1, title: "Taking a walk by the Han River" },
    { id: 2, title: "Completed project review" },
  ];

  return (
    <S.InputWrapper mt={20} mr={0} mb={20} ml={10}
                        pt={20} pl={20} pr={20}> 
      <S.MainTitle>완료된 일정, 일기를 남겨주세요!</S.MainTitle>                 
      <S.ScheduleContainer>
        {completed.map((complete) => (
          <S.ScheduleItem key={complete.id}>
            <FontAwesomeIcon icon={faCircleCheck} style={{ color: theme.PALLETE.tertiary.main, width: '28px', height: '28px' }} />
            <S.ScheduleText>
              <S.ScheduleLabel>완료된 일정</S.ScheduleLabel>
              <S.ScheduleTitle>{complete.title}</S.ScheduleTitle>
            </S.ScheduleText>
          </S.ScheduleItem>
        ))}
      </S.ScheduleContainer>
    </S.InputWrapper>
  );
};

export default CompletedSchedule;
