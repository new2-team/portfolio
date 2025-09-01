import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BasicButton from '../../components/button/BasicButton';
import {
  faHeart, faSadTear, faHome, faDog, faUserSecret,
  faFaceMeh, faEye, faMicrochip, faUmbrella,
  faHandHoldingHeart, faHeartbeat, faFaceSadTear,
  faMapMarkerAlt, faBrain, faRunning, faBullhorn,
  faHandsHelping, faSignal, faGrinHearts,
  faLaughBeam, faFaceAngry, faGrinBeam,
  faUtensils, faCrown, faMeh, faToggleOn
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import S from './resultStyle';
import MiniFooter from '../../components/layout/footer/MiniFooter';
import { getResult } from '../../api/dbti';

export default function DbtiResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code') || 'WTIL';
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (window.Kakao) return;
    const s = document.createElement('script');
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    s.async = true;
    s.onload = () => { if (!window.Kakao.isInitialized()) window.Kakao.init('YOUR_KAKAO_APP_KEY'); };
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getResult(code);
        setResult(data);
      } catch {
        setErr('결과를 불러오지 못했어요.');
      } finally {
        setLoading(false);
      }
    })();
  }, [code]);

  if (loading) return <div>불러오는 중...</div>;
  if (err) return <div>{err}</div>;
  if (!result) return <div>결과를 찾을 수 없습니다.</div>;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = typeof window !== 'undefined'
    ? new URL(result.image, window.location.origin).toString()
    : result.image;

  const handleShareKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) return alert('카카오 SDK가 초기화되지 않았습니다.');
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: result.title,
        description: code,
        imageUrl,
        link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
      },
      buttons: [{ title: '결과 보기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
    });
  };

  const handleShareNaver = () => {
    const url = encodeURIComponent(currentUrl);
    const title = encodeURIComponent(`${result.title} - ${code}`);
    const naverUrl = `https://share.naver.com/web/shareView?url=${url}&title=${title}`;
    window.open(naverUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try { await navigator.clipboard.writeText(currentUrl); alert('링크가 복사되었습니다!'); }
    catch { alert('복사 실패'); }
  };

  return (
    <>
      <S.HeaderSpacer />
      <S.Container>
        <S.Content>
          <S.Left>
            <S.Title fontWeight="bold">{result.title}</S.Title>
            <S.Code>{code}</S.Code>
            <S.Image src={result.image} alt={result.title} />
            <S.Hashtags>{result.hashtags.map((tag, i) => <li key={i}>{tag}</li>)}</S.Hashtags>
          </S.Left>

          <S.Right>
            <S.Features>
              {result.features.map((f, i) => (
                <div className="feature" key={i}>
                  <FontAwesomeIcon icon={faIconMapper[f.icon]} size="2x" />
                  <div>{f.label}</div>
                </div>
              ))}
            </S.Features>

            <S.Divider />

            <S.Bottom>
              <S.Share>
                <div className="share-title">내 결과 공유하기</div>
                <div className="share-icons">
                  <button className="share-btn" onClick={handleShareKakao}>
                    <img src="/assets/img/kakao.png" alt="카카오톡 공유" />
                  </button>
                  <button className="share-btn" onClick={handleShareNaver}>
                    <img src="/assets/img/naver.png" alt="네이버 공유" />
                  </button>
                  <button className="share-btn" onClick={handleCopyLink}>링크복사</button>
                </div>
              </S.Share>

              <S.Nav>
                <BasicButton roundButton="small" variant="gray" onClick={() => navigate('/dbti-question')}>다시 풀기</BasicButton>
                <BasicButton roundButton="small" variant="filled" onClick={() => navigate('/main')}>메인 페이지</BasicButton>
                <BasicButton roundButton="small" variant="filled" onClick={() => navigate('/my-page')}>마이 페이지</BasicButton>
              </S.Nav>
            </S.Bottom>
          </S.Right>
        </S.Content>
      </S.Container>
      <MiniFooter />
    </>
  );
}

const faIconMapper = {
  heart: faHeart, 'sad-tear': faSadTear, home: faHome, dog: faDog, 'user-secret': faUserSecret,
  'face-meh': faFaceMeh, eye: faEye, microchip: faMicrochip, umbrella: faUmbrella,
  'hand-holding-heart': faHandHoldingHeart, heartbeat: faHeartbeat, 'face-sad-tear': faFaceSadTear,
  'map-marker-alt': faMapMarkerAlt, brain: faBrain, running: faRunning, bullhorn: faBullhorn,
  'hands-helping': faHandsHelping, signal: faSignal, 'grin-hearts': faGrinHearts,
  'laugh-beam': faLaughBeam, 'face-angry': faFaceAngry, 'grin-beam': faGrinBeam,
  utensils: faUtensils, crown: faCrown, meh: faMeh, 'toggle-on': faToggleOn,
};
