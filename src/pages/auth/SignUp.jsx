import React from "react";
import Container from "../../components/layout/Container";
import SocialTabWrapper from "./SocialTabWrapper";
import ProgressStep from "../../components/progressStep/ProgressStep";
import { getSignUpSteps } from "../../components/progressStep/SignUpStepData";

// 현재 진행 단계
const activeStep = 2;

// 진행 단계 데이터 가져오기
const steps = getSignUpSteps(activeStep);

const SignUp = () => (
  <Container>
    <SocialTabWrapper />
    {/* 진행 단계 컴포넌트 */}
    <ProgressStep steps={steps} activeStep={activeStep} />
  </Container>
);

export default SignUp;
