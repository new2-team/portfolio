import styled from "styled-components";

const S = {}

S.MenuLineWrapper = styled.div`
  margin-top: 81px;

`

S.MenuLine = styled.hr`
  color: #b5b5b5;
`

S.MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`

S.FAQButton = styled.button`
  font-size: ${({ theme }) => theme.FONT_SIZE["body1"]};
  color: ${({ isActive, theme }) => (isActive ? theme.PALLETE.primary.main : theme.PALLETE.text.sub2)};
  border: none;
  background: none;
  
  `

S. BetweenButton = styled.span`
  /* margin-bottom: 39px ; */
  /* margin-top: 39px ; */
  color: #D9D9D9;
  margin-left: 40px;
  margin-right: 40px;
  font-size: 35px;
  ` 

S.InquiryButton = styled.button`
  border: none;
  background: none;
  font-size: ${({ theme }) => theme.FONT_SIZE["body1"]};
  color: ${({ isActive, theme }) => (isActive ? theme.PALLETE.primary.main : theme.PALLETE.text.sub2)};
  `


// faq

S.FAQTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE["h4"]};
  color: ${({ theme }) => theme.PALLETE.primary.main};
  padding : 80px 0;
  `

S.QTopLine = styled.hr`
  background-color: ${({ theme }) => theme.PALLETE.primary.main};
  height: 5px;
  width: 1440px;
  display: flex;
  justify-content: center;
  border: none;

`

S.AccordionWrapper = styled.div`
  margin-bottom: 175px;
`


// inquiry
S.InquiryTitle = styled.div`
  margin-top: 83px;
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.FONT_SIZE["h4"]};
  color: ${({ theme }) => theme.PALLETE.primary.main};
`

S.InquiryTitleBottom = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  color: #777777;
  line-height: ${({ theme }) => theme.LINE_HEIGHT.h5};
`

S.InfoInputWrapper = styled.div`
  margin-top: 117px;
  display: flex;
  flex-direction: column;
  width: 100%;
`





export default S;