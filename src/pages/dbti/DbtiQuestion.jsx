import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calcDbtiCode } from './dbtiUtils';
import S from './style';
import MiniFooter from '../../components/layout/footer/MiniFooter';
import { getQuestions } from '../../api/dbti';

export default function DbtiQuestionPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getQuestions();
        setQuestions(data || []);
      } catch {
        setErr('질문을 불러오지 못했어요.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>불러오는 중...</div>;
  if (err) return <div>{err}</div>;
  if (!questions.length) return <div>질문이 없습니다.</div>;

  const total = questions.length;
  const q = questions[step];

  const onSelect = v => setSelected(v);
  const onNext = () => {
    const next = [...answers, selected];
    if (step < total - 1) {
      setAnswers(next);
      setSelected(null);
      setStep(step + 1);
    } else {
      const code = calcDbtiCode(next);
      navigate(`/dbti-result?code=${code}`);
    }
  };
  const onPrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelected(answers[step - 1]);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  return (
    <>
      <S.Header />
      <S.Progress>{questions.map((_, i) => <S.StepDot key={i} active={i <= step} />)}</S.Progress>
      <S.Container>
        <S.QuestionTitle mb="24px"><span>Q{step + 1}. {q.question}</span></S.QuestionTitle>
        <S.Options>
          {q.options.map((opt, idx) => (
            <div key={opt.value} style={{ flex: 1 }}>
              <S.OptionText>{idx === 0 ? 'A.' : 'B.'} {opt.label}</S.OptionText>
              <S.OptionCard selected={opt.value === selected} onClick={() => onSelect(opt.value)}>
                <img src={opt.img} alt={opt.label} />
              </S.OptionCard>
            </div>
          ))}
        </S.Options>
        <S.ButtonWrapper>
          {step > 0 && <S.PrevButton variant="outline" onClick={onPrev}>이전</S.PrevButton>}
          <S.NextButton variant="filled" disabled={!selected} onClick={onNext}>
            {step < total - 1 ? '다음' : '결과보기'}
          </S.NextButton>
        </S.ButtonWrapper>
      </S.Container>
      <MiniFooter>©2025 MUNGPICK. All rights reserved.</MiniFooter>
    </>
  );
}
