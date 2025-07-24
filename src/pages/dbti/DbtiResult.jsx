// src/pages/dbti/DbtiResult.jsx
import React from 'react';
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


export default function DbtiResultPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const code = new URLSearchParams(search).get('code') || 'WTIL';
  const result = results[code];

  if (!result) {
    return <div>결과를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <S.HeaderSpacer />

      <S.Container>
        <S.Content>
          {/* 왼쪽 : 제목 / 이미지 / 해시태그 */}
          <S.Left>
            <S.Title fontWeight="bold">{result.title}</S.Title>
            <S.Code>{code}</S.Code>
            <S.Image src={result.image} alt={result.title} />
            <S.Hashtags>
              {result.hashtags.map((tag, i) => <li key={i}>{tag}</li>)}
            </S.Hashtags>
          </S.Left>

          {/* 오른쪽 : 상단 기능, 하단 공유+버튼 */}
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
                  {/* 예: <KakaoShareButton />, <NaverShareButton />, <CopyLinkButton /> */}
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

      <MiniFooter></MiniFooter>
    </>
  );
}

const faIconMapper = {
  heart: faHeart,
  'sad-tear': faSadTear,
  home: faHome,
  dog: faDog,
  'user-secret': faUserSecret,
  'face-meh': faFaceMeh,
  eye: faEye,
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
