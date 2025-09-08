// src/pages/dbti/DbtiResult.jsx
import React, { useEffect } from 'react';
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
import { results } from './dbtiResultData';
import S from './resultStyle';
import MiniFooter from '../../components/layout/footer/MiniFooter';

// ────────────────────────────────────────────────────────────
// PNG(Flaticon 등) 아이콘 매퍼: public/assets/icons/ 에 파일 저장
// 파일명은 실제 있는 이름으로 맞춰주세요
const imgIconMapper = {
  'dog':               '/assets/icons/free-icon-dog.png',
  'happy':             '/assets/icons/free-icon-happy.png',
  'cool':              '/assets/icons/free-icon-cool.png',
  'eyes':              '/assets/icons/free-icon-eyes.png',
  'observation':       '/assets/icons/free-icon-observation.png',
  'pawprints':         '/assets/icons/free-icon-pawprints.png',
  'sensor':            '/assets/icons/free-icon-sensor.png',
  'social-distancing': '/assets/icons/free-icon-social-distancing.png',
  'nervous':           '/assets/icons/free-icon-nervous.png',
  'latvia':            '/assets/icons/free-icon-latvia.png',
};
// ────────────────────────────────────────────────────────────

// FontAwesome + PNG 통합 렌더러
const renderIcon = (name, label) => {
  if (faIconMapper[name]) {
    return <FontAwesomeIcon icon={faIconMapper[name]} size="2x" aria-label={label} />;
  }
  if (imgIconMapper[name]) {
    return (
      <img
        src={imgIconMapper[name]}
        alt={label}
        style={{ width: 32, height: 32, objectFit: 'contain' }}
        loading="lazy"
      />
    );
  }
  // fallback
  return <FontAwesomeIcon icon={faDog} size="2x" aria-label={label} />;
};

export default function DbtiResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code') || 'WTIL';
  const result = results[code];

  useEffect(() => {
    if (window.Kakao) return;
    const s = document.createElement('script');
    s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    s.async = true;
    s.onload = () => {
      if (!window.Kakao.isInitialized()) {
        // TODO: 카카오 개발자 콘솔 자바스크립트 키로 교체
        window.Kakao.init('YOUR_KAKAO_APP_KEY');
      }
    };
    document.head.appendChild(s);
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const imageUrl = typeof window !== 'undefined'
    ? new URL(result.image, window.location.origin).toString()
    : result.image;

  const handleShareKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert('카카오 SDK가 초기화되지 않았습니다.');
      return;
    }
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: result.title,
        description: code,
        imageUrl,
        link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
      },
      buttons: [
        {
          title: '결과 보기',
          link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
        },
      ],
    });
  };

  const handleShareNaver = () => {
    const url = encodeURIComponent(currentUrl);
    const title = encodeURIComponent(`${result.title} - ${code}`);
    const naverUrl = `https://share.naver.com/web/shareView?url=${url}&title=${title}`;
    window.open(naverUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert('링크가 복사되었습니다!');
    } catch {
      alert('복사 실패');
    }
  };

  if (!result) return <div>결과를 찾을 수 없습니다.</div>;

  return (
    <>
      <S.HeaderSpacer />

      <S.Container>
        <S.Content>
          <S.Left>
            <S.Title fontWeight="bold">{result.title}</S.Title>
            <S.Code>{code}</S.Code>
            <S.Image src={result.image} alt={result.title} />
            <S.Hashtags>
              {result.hashtags.map((tag, i) => <li key={i}>{tag}</li>)}
            </S.Hashtags>
          </S.Left>

          <S.Right>
            <S.Features>
              {result.features.map((f, i) => (
                <div className="feature" key={i}>
                  {renderIcon(f.icon, f.label)}
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
                  <button className="share-btn" onClick={handleCopyLink}>
                    링크복사
                  </button>
                </div>
              </S.Share>

              <S.Nav>
                <BasicButton
                  roundButton="small"
                  variant="gray"
                  onClick={() => navigate('/dbti-question')}
                >
                  다시 풀기
                </BasicButton>
                <BasicButton
                  roundButton="small"
                  variant="filled"
                  onClick={() => navigate('/main')}
                >
                  메인 페이지
                </BasicButton>
                <BasicButton
                  roundButton="small"
                  variant="filled"
                  onClick={() => navigate('/my-page')}
                >
                  마이 페이지
                </BasicButton>
              </S.Nav>
            </S.Bottom>
          </S.Right>
        </S.Content>
      </S.Container>

      {/* Flaticon을 하나라도 쓰면 출처 한 번만 표기해 주세요 */}
      <MiniFooter />
    </>
  );
}

const faIconMapper = {
  heart: faHeart,
  'sad-tear': faSadTear,
  home: faHome,
  'user-secret': faUserSecret,
  'face-meh': faFaceMeh,
  microchip: faMicrochip,
  umbrella: faUmbrella,
  'hand-holding-heart': faHandHoldingHeart,
  heartbeat: faHeartbeat,
  'face-sad-tear': faFaceSadTear,
  'map-marker-alt': faMapMarkerAlt,
  brain: faBrain,
  running: faRunning,
  bullhorn: faBullhorn,
  'hands-helping': faHandsHelping,
  signal: faSignal,
  'grin-hearts': faGrinHearts,
  'laugh-beam': faLaughBeam,
  'face-angry': faFaceAngry,
  'grin-beam': faGrinBeam,
  utensils: faUtensils,
  crown: faCrown,
  meh: faMeh,
  'toggle-on': faToggleOn,
};
