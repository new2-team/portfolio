import styled from "styled-components";

const S = {}

S.ListWrapper = styled.div`
 display: flex;
 flex-direction: column;
 width: 1440px;
 height: fit-content;
`

S.ContenetWrapper = styled.tbody`
display: flex;
flex-direction: column;
width: 1440px;
`

S.Data = styled.div`
 display: flex;
 align-items: center;
 width: 1440px;
 height: 76px;
 border-bottom: solid 2px ${({ theme }) => theme.PALLETE.text.disabled.weak } ;
`

S.Author = styled.div`
 display: flex;
 padding-left: 42px;
 align-items: center;
 width: 280px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
`

S.Title = styled.button`
 display: flex;
 align-items: center;
 width: 720px;
 background-color: white;
 font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
`

S.Date = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 210px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body3 };
`

S.Reply = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;
 width: 210px;
 font-size: ${({ theme }) => theme.FONT_SIZE.body3 };
`

S.PaginattionWrapper = styled.div`
 display: flex;
 justify-content: center;
 align-items: end;
 width: 1440px;
 height: 146px;
 gap: 28px;

 button{
  width: 28px;
  background-color: white;
  font-size: ${({ theme }) => theme.FONT_SIZE.body2 };
 }
`

export default S;