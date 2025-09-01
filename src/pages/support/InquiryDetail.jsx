import React, { useEffect, useState } from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp, faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import TextArea from '../../components/textArea/TextArea';
import BasicButton from '../../components/button/BasicButton';
import { Link } from 'react-router-dom';

const InquiryDetail = ({isUpdate, setIsUpdate}) => {
    
    const [content, setContent] = useState("")

    const onChangeContent = (e) => {
        setContent(e.target.value);
        console.log(e.target.value);
    }

     const [data, setData] = useState([])

     useEffect(() => {
       fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry-reply`)
       .then(response => response.json())
       .then(data => setData(data))
       .catch(error => console.error("문의글 답변 불러오는 중 오류" + error))
     }, [])

     console.log(data)

    const onClickReplyPost = async (e) => {

      window.alert('저장되었습니다');
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/post-inquiry-reply`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          reply_id : Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
          inquiry_id : "test",
          user_id : "user_test",
          reply_content : content,
        })
      })
      .then((res) => {
        if(!res.ok) throw new Error(`Response Fetching Error`);
        return res.json()
      })
      .then((res) => {
        console.log(res)
        if(res.message) alert(res.message);
        setContent("")
        setIsUpdate(!isUpdate)
      })
      .catch(console.error)
 }

 const inquiryBody = "문의 내용~ "
 const repeatedIinquiryBody = inquiryBody.repeat(50)
 const replyBody = "답변 내용~ "
 const repeatedReplyBody = replyBody.repeat(50)

 return (
  <S.InquiryWrapper>
   <SupportMenuComponent activeMenu="inquiry" />
   <div>
    <S.InquiryTitle>1:1 문의</S.InquiryTitle>
    <div>
        <S.InquiryTitleBottom>
            문의사항을 보내주시면 친절하게 답변하겠습니다. <br />
            1:1문의를 주말에 남겨 주시는 고객님께는 평일 9:00 ~ 18:00 에 순차적으로 답변 드리도록 하겠습니다.
        </S.InquiryTitleBottom>
    </div>
   </div>
   <S.InquiryBodyWrapper>
    <S.ListWrapper>
        <S.InquiryContentWrapper>
            <S.ProfileDateWrapper>
                <S.AuthorProfileWrapper>
                    <S.Profile src="/assets/img/my-profile.png" alt="작성자 프로필" />
                    <S.AuthorName>홍길동</S.AuthorName>
                </S.AuthorProfileWrapper>
                <S.DateWrapper>
                    2025.07.29
                </S.DateWrapper>
            </S.ProfileDateWrapper>
            <S.InquiryTitile>
                멍픽 관련해서 질문 드립니다~
            </S.InquiryTitile>
            <S.InquiryContent>
                {repeatedIinquiryBody}
            </S.InquiryContent>
            <S.FileLinkWrapper>
                 <FontAwesomeIcon icon={faPaperclip} size='sm' />
                 &nbsp;
                 첨부파일.jpg
            </S.FileLinkWrapper>
        </S.InquiryContentWrapper>
        <S.InquiryReplyWapper>
            <S.ReplyProfileDateWrapper>
                <S.ReplyProfileDateWrapper> 
                    <S.ReplyProfileWrapper>
                     <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} size='2xl' />
                     <S.Profile src="/assets/img/my-profile.png" alt="작성자 프로필" />
                     <S.AuthorName>멍픽</S.AuthorName>
                    </S.ReplyProfileWrapper>
                    <S.DateWrapper>
                        2025.08.01
                    </S.DateWrapper>
                </S.ReplyProfileDateWrapper>
            </S.ReplyProfileDateWrapper>
            <S.ReplyContent>
                {repeatedReplyBody}
            </S.ReplyContent>
            <S.TextAreaWrapper>
                <TextArea placeholder={"답변을 입력해주세요"} maxChars={"500"} onChange={onChangeContent} />
                <S.Replybutton onClick={onClickReplyPost} >
                    <img src="/assets/icons/send.svg" alt="댓글쓰기" />
                </S.Replybutton>
            </S.TextAreaWrapper>
        </S.InquiryReplyWapper>
        <S.ButtonToList>
         <Link to={"/support/inquiry-list"} >
          <BasicButton children={"목록"} variant={"default"} basicButton={"medium"} />
         </Link>
        </S.ButtonToList>
    </S.ListWrapper>
   </S.InquiryBodyWrapper>
  </S.InquiryWrapper>
 );
};

export default InquiryDetail;