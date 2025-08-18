// src/api/dbti.js
import { questions as MOCK_QUESTIONS } from '../pages/dbti/dbtiQuestionData';
import { results as MOCK_RESULTS }     from '../pages/dbti/dbtiResultData';

const BASE =
  (import.meta?.env?.VITE_API_BASE_URL) ||
  (process.env.REACT_APP_API_BASE_URL) ||
  'http://localhost:8080';

// 백엔드 붙을 때 false 로 바꾸세요
const USE_MOCK = true;

export async function getQuestions() {
  if (USE_MOCK) return MOCK_QUESTIONS;
  const res = await fetch(`${BASE}/api/dbti/questions`);
  if (!res.ok) throw new Error('질문 불러오기 실패');
  return res.json();
}

export async function getResult(code) {
  if (USE_MOCK) return MOCK_RESULTS[code] || null;
  const res = await fetch(`${BASE}/api/dbti/results/${code}`);
  if (!res.ok) throw new Error('결과 불러오기 실패');
  return res.json();
}
