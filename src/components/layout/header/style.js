import styled from "styled-components";
import { flexCenter, flexRow, flexSpaceBetween } from "../../../styles/common";

const S = {};

S.HeaderWrapper = styled.header`
  ${flexSpaceBetween};
  background: #fff5ec;
  padding: 20px 240px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
`;

S.LogoWrapper = styled.div`
  ${flexCenter}
  img {
    width: 183px;
    height: 60px;
  }
`;

S.Menu = styled.nav`
  ${flexCenter};
  gap: 0 75px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

S.RightMenu = styled.div`
  ${flexRow};
`;

S.IconWrap = styled.div`
  ${flexRow};
  gap: 0 22px;
`;

S.ButtonWrap = styled.div`
  ${flexRow};
  gap: 0 30px;
`;

S.ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 42px;
  border: 2px solid #cf4b05;
`;

S.Badge = styled.div`
  position: relative;
  display: flex;

  svg {
    width: 30px;
    height: 30px;
  }
`;

S.BadgeCount = styled.span`
  position: absolute;
  width: 25px;
  height: 25px;
  ${flexCenter};
  top: -13px;
  right: -10px;
  background-color: #cf4b05;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 50%;
`;

export default S;
