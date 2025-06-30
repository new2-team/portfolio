import styled from "styled-components";
import { flexCenter, flexColumn, flexRow } from "../../styles/common";

const S = {}

 S.Wrapper = styled.div`
  ${flexCenter};
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 800px;
 `

 S.FirstWrapper = styled.div`
  ${flexRow}
  width: 1440px;
  height: 570px;
  margin-top: 103px;
  gap: 75px;
 `

 S.SecondWrapper = styled.div`
  ${flexRow}
  width: 1440px;
  height: 1302px;
  margin-top: 75px;
  margin-bottom: 174px;
  gap: 91px;
 `

 S.Profile = styled.div`
  width: 480px;
  height: 570px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
 `

 S.Friends = styled.div`
  width: 885px;
  height: 570px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
  background-color: #FFF5EC;

  p{
   font-size: 32px;
   margin: 32px;
  }
 `

//  S.CalendarWrapper = styled.div`
//   ${flexColumn}
//   width: 664px;
//   height: 1302px;
//   gap: 28px;
//  `
//  S.Calendar = styled.div`
//   width: 664px;
//   height: 474px;
//   border-radius: 24px;
//   box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
//  `

//  S.Plan = styled.div`
//   width: 664px;
//   height: 386px;
//   border-radius: 24px;
//   box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
// `

//  S.review = styled.div`
//   width: 664px;
//   height: 386px;
//   border-radius: 24px;
//   box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
// `

 S.Chat = styled.div`
  width: 686px;
  height: 1302px;
  border-radius: 24px;
  box-shadow: 9px 9px 24px rgba(0, 0, 0, 0.2);
  background-color: #DFE1E5;
 `


 export default S;