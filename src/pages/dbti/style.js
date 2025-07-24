import styled from 'styled-components';
import Text from '../../components/text/size';
import BasicButton from '../../components/button/BasicButton';
import { spacingProps } from '../../styles/spacingProps';


export const HEADER_HEIGHT = 72;

const S = {};

/* ─── 상단 Header ─────────────────────────────────────────── */
S.Header = styled.header`
  height: ${HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: ${({ theme }) => theme.PALLETE.background.white};
  border-bottom: 1px solid ${({ theme }) => theme.PALLETE.background.gray100};
`;

/* ─── Progress Bar ───────────────────────────────────────── */
S.Progress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  gap: 8px;
`;
S.StepDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ active, theme }) =>
    active ? theme.PALLETE.primary.main : theme.PALLETE.background.gray200};
`;

/* ─── 컨텐츠 영역 ─────────────────────────────────────────── */
S.Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px 80px;
`;

/* ─── 질문 타이틀 ───────────────────────────────────────── */
S.QuestionTitle = styled(Text.H6)`
  ${spacingProps};
  text-align: center;
  white-space: nowrap;    /* 한 줄로 유지 */
  overflow: visible;      /* 넘쳐도 숨기지 않음 */
  text-overflow: clip;    /* 말줄임 없이 끝까지 보이도록 */

  span {
    white-space: nowrap;
    background-color: ${({ theme }) => theme.PALLETE.primary.light};
    padding: 0 8px;
    border-radius: 4px;
  }
`;


/* ─── 옵션 그룹 ─────────────────────────────────────────── */
S.Options = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin: 32px 0;
`;

/* ─── 옵션 텍스트 (A. / B.) ─────────────────────────────── */
S.OptionText = styled(Text.Body2)`
  ${spacingProps};
  margin-bottom: 8px;
  text-align: center;
  white-space: nowrap;           /* 한 줄로 유지 */
  overflow: visible;
  text-overflow: clip;
  color: ${({ theme }) => theme.PALLETE.text.main};
`;

/* ─── 옵션 카드 ─────────────────────────────────────────── */
S.OptionCard = styled.div`
  flex: 1;
  background: #fff;
  border: ${({ selected, theme }) =>
    selected
      ? `2px solid ${theme.PALLETE.primary.main}`
      : `2px solid ${theme.PALLETE.background.gray200}`};
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fbfbfb;

  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  }

  img {
    max-width: 100%;
    max-height: 260px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

/* ─── 버튼 그룹 ─────────────────────────────────────────── */
S.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

/* 이전 버튼 */
S.PrevButton = styled(BasicButton)`
  width: 120px;
  height: 48px;
  border-radius: 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.button2};
`;

/* 다음 버튼 */
S.NextButton = styled(BasicButton)`
  width: 120px;
  height: 48px;
  border-radius: 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.button2};
`;

/* ─── Footer ────────────────────────────────────────────── */
S.Footer = styled.footer`
  text-align: center;
  padding: 24px 0;
  background: ${({ theme }) => theme.PALLETE.primary.main};
  color: ${({ theme }) => theme.PALLETE.text.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.caption2};
`;

export default S;
