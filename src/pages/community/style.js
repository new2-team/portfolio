import styled from "styled-components";
import { spacingProps } from "../../styles/spacingProps";
import { flexCenter, flexColumn } from "../../styles/common";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons/faHandPointDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const S = {}

S.Background = styled.div`
  /* background-color: ${({theme}) => theme.PALLETE.primary["light"]}; */
  display: flex;
  justify-content: center;
`

S.Wrapper = styled.div`
  ${flexCenter}
  ${flexColumn}
`

S.Search = styled.div`
  ${flexCenter}
  position: relative;
  margin-bottom: 38px;
  margin-top: 118px;
`

S.SearchSelect = styled.select`
  border-radius: 26px;
  width: 194px;
  height: 64px;
  margin-right: 25px;
  padding-right: 24px;
  padding-left: 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
  border: 1px solid ${({ theme }) => theme.PALLETE.background.gray100};
  line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};  
  padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["24"]}`};
  color: ${({ theme }) => theme.PALLETE.text.main};
  &:hover {
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
  };
  &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
  };

`



S.SearchInput = styled.input`
  width: 539px;
  height: 64px;
  background-color: ${({ theme }) => theme.PALLETE.background.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.text.sub2};
  border-radius: 26px;
  border-color: ${({ theme }) => theme.PALLETE.background.gray100};
  font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
  line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};  
  padding: 10px 40px 10px 24px;
  ${spacingProps}

    //아무스 호버 상태
    &:hover {
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
    }
    //placeholder 텍스트 색상
    &::placeholder {
        color: ${({ theme }) => theme.PALLETE.text.disabled.weak};
    }

    //입력중일때
    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
        box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
    }

    //disabled 상태일때
    &:disabled {
        outline: none;
        background-color: ${({ theme }) => theme.PALLETE.background.gray100};
        border: none;
    }

    //입력 다 한 상태
    &:not(:focus):not(:placeholder-shown) {
        border-color: ${({ theme }) => theme.PALLETE.primary.main};
    }
`

S.SearchInputButton = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 31px;
    height: 31px;
  }
`

S.Filter = styled.div`
  margin-top: 16px;
  margin-bottom: 30px;
`

S.FilterNew = styled.button`
  border: 1px;
  border-style: solid;
  border-color: #EEEEEE;
  margin-right: 15px;
  height: 54px;
  width: 125px;
  background-color: white;
  padding: 3px 10px;
  border-radius: 52px ;
  margin-right: 30px;
  margin-left: 15px;
  font-size: ${({ theme }) => theme.FONT_SIZE["button2"]};
`
S.FilterHot = styled.button`
  border: 1px;
  border-style: solid;
  border-color: #EEEEEE;
  margin-right: 15px;
  height: 54px;
  width: 125px;
  background-color: white;
  padding: 3px 10px;
  border-radius: 52px ;
  margin-right: 30px;
  font-size: ${({ theme }) => theme.FONT_SIZE["button2"]};
`
S.FilterMy = styled.button`
  border: 1px;
  border-style: solid;
  border-color: #EEEEEE;
  margin-right: 15px;
  height: 54px;
  width: 196px;
  background-color: white;
  padding: 3px 10px;
  border-radius: 52px ;
  margin-right: 30px;
  font-size: ${({ theme }) => theme.FONT_SIZE["button2"]};
`
S.FilterFriend = styled.button`
  border: 1px;
  border-style: solid;
  border-color: #EEEEEE;
  margin-right: 15px;
  height: 54px;
  width: 221px;
  background-color: white;
  padding: 3px 10px;
  border-radius: 52px ;
  font-size: ${({ theme }) => theme.FONT_SIZE["button2"]};
`



S.TextBoxWrapper = styled.div`
  position: relative;
  margin-top: 24px;
  border-radius: 20px;
  border-style: none;
  background-color: ${({theme}) => theme.PALLETE.primary["main"]};
  width: 952px;
  height: 268px;
  display: flex;
  box-shadow: 2px 2px 7px #A0A0A0;
`



S.TextBoxLeftWrapper = styled.div`
  /* ${flexColumn}
  align-items: center;
  gap: 10px; */

  img {
    height: 70px;
    width: 70px;
    margin-right: 22px;
    margin-top: 24px;
    margin-left: 27px;
    border-radius: 50%;
  }
`

S.TextBoxInputWrapper = styled.div`
  
  ${flexColumn}

`
S.TitleInput = styled.input`
    height: 64px;
    width: 600px;
    margin-top: 29px;
    background-color: ${({ theme }) => theme.PALLETE.background.white};
    border: 1px solid ${({ theme }) => theme.PALLETE.text.sub2};
    border-radius: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
    line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};  
    padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["24"]}`};
    ${spacingProps}

        //아무스 호버 상태
        &:hover {
            border-color: ${({ theme }) => theme.PALLETE.primary.main};
        }
        //placeholder 텍스트 색상
        &::placeholder {
            color: ${({ theme }) => theme.PALLETE.text.disabled.weak};
        }

        //입력중일때
        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.PALLETE.primary.main};
            box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
        }

        //disabled 상태일때
        &:disabled {
            outline: none;
            background-color: ${({ theme }) => theme.PALLETE.background.gray100};
            border: none;
        }

        //입력 다 한 상태
        &:not(:focus):not(:placeholder-shown) {
            border-color: ${({ theme }) => theme.PALLETE.primary.main};
        }
`


S.ContentInput = styled.textarea`
  flex:1;
  height: 130px;
  width: 600px;
  margin-bottom: 29px;
  resize: none;
  font-size : ${({theme}) => theme.FONT_SIZE.body3};
  font-family: 'SUIT';
  &::placeholder {
    font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
    font-family: 'SUIT';

  }
 
  background-color: ${({ theme }) => theme.PALLETE.background.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.text.sub2};
  border-radius: 8px;
  line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};  
  padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["24"]}`};
  ${spacingProps}

      //아무스 호버 상태
      &:hover {
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
      //placeholder 텍스트 색상
      &::placeholder {
          color: ${({ theme }) => theme.PALLETE.text.disabled.weak};
      }

      //입력중일때
      &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
          box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
      }

      //disabled 상태일때
      &:disabled {
          outline: none;
          background-color: ${({ theme }) => theme.PALLETE.background.gray100};
          border: none;
      }

      //입력 다 한 상태
      &:not(:focus):not(:placeholder-shown) {
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
   
    
   
`

S.TBButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  

  
  button {
    background-color: ${({theme}) => theme.PALLETE.white};
    color: ${({theme}) => theme.PALLETE.primary["main"]};
    border: 1px solid ${({theme}) => theme.PALLETE.primary["main"]};
    width: 69px;
    height: 38px;
    border-radius: 52px;
    display: flex;
    ${flexCenter};
    
  }

  .imgUpload {
    height: 42px;
    width: 42px;
    display: flex;
    ${flexCenter};
  }
  
`
S.TBBWrapper = styled.div`
  margin-left: 60px;
  margin-top: 70px;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  
  button {
    font-size : ${({theme}) => theme.FONT_SIZE.button4};
  }

  img {
    width: 42px;
    height: 42px;
  }
`

S.TextResultWrapper= styled.div`
  margin-top: 24px;
  border-radius: 20px;
  border-style: solid;
  border-color: gray;
  background-color: white;
  padding: 49px 43px;
  box-shadow: 2px 2px 7px #A0A0A0;
  img {
    border-radius: 50%;
  }
`

S.TRProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 70px;
    width: 70px;
    margin-right: 22px;
    
    
    gap: 10px;
  }

  .TRName {
    font-size : ${({theme}) => theme.FONT_SIZE.body2};
  }

  .TRTime {
    font-size : ${({theme}) => theme.FONT_SIZE.body2};
  }
`

S.TRPWBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 10px;
`
S.HeartCommentTop = styled.div`
  display: flex;
  align-items: center;
  /* gap: 30px; */

  img {
    width: 25px;
    height: 25px;
  }
`
S.HCTBWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

S.ProfileNameWrapper = styled.div`
  display: flex;
  gap: 27px;
  align-items: center;
  
`

S.TextResult = styled.div`
  margin-top: 40px;

  list-style: none;
`

S.TRTitle = styled.div`
  font-size : ${({theme}) => theme.FONT_SIZE.body1};
  /* margin-bottom: 15px; */
  margin-top: 20px;
`

S.TRContent = styled.div`
  font-size : ${({theme}) => theme.FONT_SIZE.body2};
`

S.TextResultMiddleWrapper = styled.div`
  /* display: flex; */
  /* align-items: center; */
  /* gap: 20px; */
`

S.HeartComment = styled.div`
  flex: 1;
  
  margin-top: 32px;
  margin-bottom: 15px;

  img {
    width: 25px;
    height: 25px;
  }
`
S.HeartLine = styled.div`
  display: flex;
  align-items: center;
  .DeleteText {
    text-decoration: underline;
    margin-right: 10px;
    margin-top: 10px;
    color: ${({theme}) => theme.PALLETE.text.disabled["strong"]};
    font-size : ${({theme}) => theme.FONT_SIZE.caption1};
  }
`

S.Line = styled.hr`
  height: 4px;
  background-color: #D2D4D4;
  margin: 5px 2px;
  border: none;
  
`

S.CommentList = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  padding-top: 6px;
`

S.CommentProfilWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  img {
    height: 42px;
    width: 42px;
    margin-right: 22px;
    gap: 10px;
  }

  .TRName {
    font-size : ${({theme}) => theme.FONT_SIZE.caption2};
  }

  .TRTime {
    font-size : ${({theme}) => theme.FONT_SIZE.caption2};
  }
`

S.CommentNameWrapper = styled.div`
  display: flex;
  gap: 27px;
  align-items: center;
`

S.Comment = styled.div`
  flex: 1;
  padding: 11px 10px;
  font-size : ${({theme}) => theme.FONT_SIZE.caption1};
`

S.CommentLine = styled.div`
  display: flex;
  align-items: center;
`

S.PlusComment = styled.div`
  text-decoration: underline;
  margin-right: 4px;
  font-size : ${({theme}) => theme.FONT_SIZE.caption2};
  color: ${({theme}) => theme.PALLETE.text.disabled["strong"]};
`

S.CommentWrapper = styled.div`
  display: flex;
  margin-top: 28px;
  img {
    width: 50px;
    height: 50px;
    margin-right: 9px;
    margin-top: 2px;
  }
`

S.CommentInput = styled.input`
  width: 787px;
  height: 64px;
  border-radius: 26px;
  background-color: ${({ theme }) => theme.PALLETE.background.white};
  border: 1px solid ${({ theme }) => theme.PALLETE.text.sub2};
  font-size: ${({ theme }) => theme.FONT_SIZE["body3"]};
  line-height: ${({ theme }) => theme.LINE_HEIGHT["body3"]};  
  padding: ${({ theme }) => `${theme.SPACING["20"]} ${theme.SPACING["24"]}`};
  ${spacingProps}

      //아무스 호버 상태
      &:hover {
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
      //placeholder 텍스트 색상
      &::placeholder {
          color: ${({ theme }) => theme.PALLETE.text.disabled.weak};
      }

      //입력중일때
      &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
          box-shadow: 0 0 0 2px ${({ theme }) => theme.PALLETE.primary.light};
      }

      //disabled 상태일때
      &:disabled {
          outline: none;
          background-color: ${({ theme }) => theme.PALLETE.background.gray100};
          border: none;
      }

      //입력 다 한 상태
      &:not(:focus):not(:placeholder-shown) {
          border-color: ${({ theme }) => theme.PALLETE.primary.main};
      }
`


S.MoreTextBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  
`

S.MoreTextBox = styled.button`
  margin-top: 43px;
  background-color: ${({theme}) => theme.PALLETE.primary["main"]};
  color: ${({theme}) => theme.PALLETE.text["white"]};
  border: 1px solid ${({theme}) => theme.PALLETE.primary["main"]};
  border-radius: 52px;
  width: 241px;
  height: 84px;
  margin-bottom: 40px;
  ${flexCenter}
  font-size : ${({theme}) => theme.FONT_SIZE.button1};

`
S.FNTWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 132px;
  border-radius: 20px;
  border-style: none;
  background-color: ${({theme}) => theme.PALLETE.primary["main"]};
  width: 952px;
  height: 242px;
  box-shadow: 2px 2px 7px #A0A0A0;
`

S.FilterNoText = styled.div`
  
  
  display: flex;
  font-size : ${({theme}) => theme.FONT_SIZE.h5};
  color: white;
  `

// 작성 내용 등록 알림창
S.ConfirmWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  `

S.ConfirmBox = styled.div`
  margin-top: 60px;
  font-size : ${({theme}) => theme.FONT_SIZE.h5};
  z-index: 1000;
  border: none;
  background-color: #FFF;
  padding: 60px;
  border-radius: 32px;
  text-align: center;
  color: ${({theme}) => theme.PALLETE.primary["main"]};


  button {
    width: 170px;
    height: 54px;
  
  }
  .YesButton {
    
    border: none;
    border-radius: 10px;
    color: #FFF;
    background-color: ${({theme}) => theme.PALLETE.primary["main"]};
  }
  
  .NoButton {
    border: none;
    border-radius: 10px;
    color: ${({theme}) => theme.PALLETE.text["main"]};
    background-color: ${({theme}) => theme.PALLETE.background["gray200"]};
  }

`

S.ConfirmButtonWrapper = styled.div`  
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* justify-content: space-around; */
  gap: 20px;
  
`


export default S;