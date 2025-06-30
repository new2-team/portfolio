import React, { useState } from 'react';
import S from './style';

const CommunityInputResultComponent = ({post, openPost, togglePost, 
  handleComment,handleLike,setCommentInput,commentInput,
  countComment, setCountComment}) => {
  //배경화면 색상 전체 보여지도록
  //글자수 글 쓰면 숫자 올라가게 하기
  //필터 정렬 설정하기
  
  

return (  
  <>
    {post.map((postItem) => {
      const isOpen = openPost.includes(postItem.id);
    return (
      <>
      <S.TextResultWrapper key={postItem.id}>
        <S.TRProfileWrapper>
          <img src="/assets/img/profile3.jpg" alt="profile" />
          <div>
            <S.ProfileNameWrapper>
              <span className='TRName'>뭉치</span>
              <span className='TRTime'>3시간 전</span>
            </S.ProfileNameWrapper>
          </div>
        </S.TRProfileWrapper>

          <S.TRPWBottom>
            <S.TRTitle>{postItem.title}</S.TRTitle>
            <S.HCTBWrapper>
              {!isOpen && (<S.HeartCommentTop>
                  <button onClick={()=> handleLike(postItem.id)} type='button'>
                    <img src="logo192.png" alt="heart" />
                  </button>
                  <span>{postItem.likeCount}</span>
                  <button type='submit'>
                    <img src="logo192.png" alt="comment" />
                  </button>
                  <span>{postItem.commentList.length}</span>
              </S.HeartCommentTop>)}
              <button onClick={() => togglePost(postItem.id)}>{isOpen ? "▲":"▼"}</button>
            </S.HCTBWrapper>
          </S.TRPWBottom>
          
          {isOpen && (
          <>
            <S.TextResult as="ul">
              <li>
                <S.TRContent>{postItem.content}</S.TRContent>
              </li>
            </S.TextResult>
            <S.HeartLine>
              <S.HeartComment>
                <button onClick={()=> handleLike(postItem.id)} type='submit'>
                  <img src="logo192.png" alt="heart" />
                </button>
                <span>{postItem.likeCount}</span>
                <button type='submit'>
                  <img src="logo192.png" alt="comment" />
                </button>
                <span>{postItem.commentList.length}</span>
              </S.HeartComment>
              <span className='DeleteText'>삭제하기</span>
            </S.HeartLine>
            <S.Line/>

            <S.CommentList>
              {postItem.commentList.map((comment, i) => (
                <div key={i}>
                  <S.CommentProfilWrapper>
                    <img src="/assets/img/profile3.jpg" alt="profile" />
                      <S.ProfileNameWrapper>
                        <span className='TRName'>뭉치</span>
                        <span className='TRTime'>3시간 전</span>
                      </S.ProfileNameWrapper>
                  </S.CommentProfilWrapper>
                  <S.CommentLine>
                    <S.Comment>{comment}</S.Comment>
                    <S.PlusComment>댓글 남기기</S.PlusComment>
                  </S.CommentLine>
                  <S.Line/>
                </div>
              ))}
            </S.CommentList>
    
            <S.CommentWrapper>
              <img src="/assets/img/profile3.jpg" alt="" />
              <S.CommentInput type="text" placeholder='댓글을 입력해주세요!'
              value={commentInput[postItem.id] || ''} maxLength={50} 
              onChange={(e) => setCommentInput({...commentInput, [postItem.id]: e.target.value})} 
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                  handleComment(postItem.id, commentInput[postItem.id]);
                  setCommentInput({...commentInput, [postItem.id]: ""});
                }
              }}/>
            </S.CommentWrapper>
          </>
          )}
      </S.TextResultWrapper>
      </>
    )})
    
    }
  </>

    
      )

};

export default CommunityInputResultComponent;