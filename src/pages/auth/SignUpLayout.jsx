import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Container from "../../components/layout/Container";
import ProgressStep from "../../components/progressStep/ProgressStep";
import { getSignUpSteps } from "../../components/progressStep/SignUpStepData";
import SocialTabWrapper from "./components/SocialTabWrapper";

// URL 경로에 따라 진행 단계 매핑
const stepMap = {
  "/sign-up": 0,
  "/sign-up/info": 1,
  "/sign-up/profile": 2,
  "/sign-up/complete": 3,
};

const SignUpLayout = () => {
  const location = useLocation();
  // 현재 경로에 따라 진행 단계 결정
  const activeStep = stepMap[location.pathname] ?? 0;
  const steps = getSignUpSteps(activeStep);

  // 1단계(약관 동의) 경로일 때만 SocialTabWrapper 노출
  const isFirstStep = location.pathname === "/sign-up";

  return (
    <Container>
      {/* 1단계에서만 소셜 탭을 진행바 위에 노출 */}
      {isFirstStep && <SocialTabWrapper />}
      {/* 진행 단계 표시 */}
      <ProgressStep steps={steps} activeStep={activeStep} />
      {/* 단계별 페이지가 Outlet에 렌더링됨 */}
      <Outlet />
    </Container>
  );
};

export default SignUpLayout; 