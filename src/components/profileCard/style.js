import styled from "styled-components";
import {flexCenter, flexColumnCenter} from "../../styles/common";
import {spacingProps} from "../../styles/spacingProps";

const S = {};

S.ProfileCardWrapper = styled.div`
  padding: 50px 0;
  ${flexColumnCenter};
  ${spacingProps}
  border: 1px solid red;
`;

S.ProfileImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

S.ProfileInfo = styled.div`
  ${flexColumnCenter};
`;

S.ProfileInfoItem = styled.div`
  ${flexCenter};
  gap: 0 10px;
`;

S.ProfileInfoButton = styled.div`
  ${flexCenter};
  gap: 0 10px;
`;

export default S;
