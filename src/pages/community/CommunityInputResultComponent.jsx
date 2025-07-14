import React, { useState } from 'react';
import S from './style';
import arrowDown from "../../components/icons/arrow-down.svg";
import arrowUp from "../../components/icons/arrow-up.svg";
import BasicInput from '../../components/input/BasicInput';
import arrowDownRed from "../../components/icons/arrow-down-red.svg";
import PopupCardLarge from '../../components/popUp/PopupCardLarge';
import { ReactComponent as ChatIcon } from "../../components/icons/chat.svg";
import { ReactComponent as HeartIcon } from "../../components/icons/heart.svg";
import { ReactComponent as HeartClickIcon } from "../../components/icons/heart-click.svg";

const CommunityInputResultComponent = ({post, openPost, togglePost, 
  handleComment,handleLike,setCommentInput,commentInput,
  countComment, setCountComment, deletePost, deleteComment, toggleReplyInput, openReplyInput,
  replyInput, setReplyInput, addReply, setOpenReplyInput}) => {


const getTime = (time) => {
  const now = new Date();
  const postTime = new Date(time);
  const diff = now - postTime;

  const diffMinutes = Math.floor(diff / 1000 / 60);
  if (diffMinutes < 1) return '방금 전';
  if (diffMinutes < 60) return `${diffMinutes}분 전`
  
  const diffHours = Math.floor(diffMinutes/ 60);
  if (diffHours < 24) return `${diffHours}시간 전`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`
}

// 팝업
const [isLargeOpenComment, setIsLargeOpenComment] = useState(false)
const [isLargeOpenText, setIsLargeOpenText] = useState(false)
const [showConfirm, setShowConfirm] = useState(() => () => {})
  

return (  
  <>
    {post.map((postItem) => {
      const isOpen = openPost.includes(postItem.id);
    return (
      
      <S.TextResultWrapper key={postItem.id}>
        <S.TRProfileWrapper>
          <img src="/assets/img/profile3.jpg" alt="profile" />
          <div>
            <S.ProfileNameWrapper>
              <S.ProfileName>뭉치</S.ProfileName>
              <S.ProfileTime>{getTime(postItem.createdAt)}</S.ProfileTime>
            </S.ProfileNameWrapper>
          </div>
        </S.TRProfileWrapper>

          <S.TRPWBottom>
            <S.TRTitle>{postItem.title}</S.TRTitle>
            <S.HCTBWrapper>
              {!isOpen && (<S.HeartCommentTop>
                  <S.HeartButton onClick={()=> handleLike(postItem.id)} type='button'>
                    <HeartIcon/>
                    
                  </S.HeartButton>
                  <S.HeartCommentCount>{postItem.likeCount}</S.HeartCommentCount>
                  <S.CommentButton type='submit'>
                    <ChatIcon />
                  </S.CommentButton>
                  <S.HeartCommentCount>{postItem.commentList.length}</S.HeartCommentCount>
              </S.HeartCommentTop>)}
              <S.ArrowButton onClick={() => togglePost(postItem.id)}>{isOpen ? <img src={arrowUp}/>:<img src={arrowDown}/>}</S.ArrowButton>
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
                <S.HeartButton onClick={()=> handleLike(postItem.id)} type='submit'>
                  <HeartIcon />
                </S.HeartButton>
                <S.HeartCommentCount>{postItem.likeCount}</S.HeartCommentCount>
                <S.CommentButton type='submit'>
                  <ChatIcon />
                </S.CommentButton>
                <S.HeartCommentCount>{postItem.commentList.length}</S.HeartCommentCount>
              </S.HeartComment>
              <S.DeleteButton className='DeleteText' 
              onClick={() => {
                setIsLargeOpenText(true);
                setShowConfirm(() => () => deletePost(postItem.id))
              }
                } >삭제하기</S.DeleteButton>
            </S.HeartLine>
            <S.Line/>

            <S.CommentList>
              {postItem.commentList.map((comment, i) => (
                <div key={i}>
                  <S.CommentProfilWrapper>
                    <img src="/assets/img/profile3.jpg" alt="profile" />
                      <S.ProfileNameWrapper>
                        <span className='TRName'>뭉치</span>
                        <span className='TRTime'>{getTime(comment.createdAt)}</span>
                      </S.ProfileNameWrapper>
                  </S.CommentProfilWrapper>
                  <S.CommentLine>
                    <S.Comment>{comment.text}</S.Comment>
                    <S.PlusComment onClick={() => toggleReplyInput(comment.id)}>댓글 남기기</S.PlusComment>
                    <S.DeleteCommentButton onClick={() => {
                      setIsLargeOpenComment(true);
                      setShowConfirm(() => () => deleteComment(postItem.id,comment.id))
                    }}>삭제하기</S.DeleteCommentButton>
                  </S.CommentLine>
                  <S.Line/>



                  {/* 대댓글 출력 */}
                  {comment.replies?.map((reply) => (
                    
                      <S.PlusCommentResultWrapper key={reply.id}>
                        <S.PCRTop>
                          <img src={arrowDownRed} alt="" />
                          <S.ProfileImage src="/assets/img/profile3.jpg" alt="profile" />
                          <div>
                            <span className='TRName'>뭉치</span>
                            <span className='TRTime'>{getTime(reply.createdAt)}</span>
                          </div>
                        </S.PCRTop>
                        <S.PCRBottom>
                          <S.Reply>{reply.text}</S.Reply>
                          <S.DeleteCommentButton className='ReplyDelete' onClick={() => {
                            setIsLargeOpenComment(true);
                            setShowConfirm(() => () => deleteComment(postItem.id,comment.id))
                          }}>삭제하기</S.DeleteCommentButton>
                        </S.PCRBottom>
                        <S.Line/>
                      </S.PlusCommentResultWrapper>
                    
                  ))}

                  {/* 대댓글 입력 */}
                  {openReplyInput[comment.id] && (
                    <S.PlusCommentWrapper>
                      <S.ProfileImage src="/assets/img/profile3.jpg" alt="profile" />
                      <S.PlusCommentInput type="text" placeholder='→ 댓글을 입력하고 enter를 눌러주세요!' maxLength={50}
                      value={replyInput[comment.id] || ''} 
                      onChange={(e) => setReplyInput({...replyInput, [comment.id]: e.target.value})}
                      onKeyDown={(e) => {if(e.key === 'Enter') {
                        addReply(postItem.id, comment.id, replyInput[comment.id]);
                        setReplyInput({...replyInput, [comment.id] : ''});
                        setOpenReplyInput({...openReplyInput, [comment.id]:false})
                      }}} />
                      
                    </S.PlusCommentWrapper>
                  )}

                </div>
              ))}
            </S.CommentList>
    
            <S.CommentWrapper>
              <img src="/assets/img/profile3.jpg" alt="" />
              <S.CommentInput type="text" placeholder='댓글을 입력하고 enter를 눌러주세요!'
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
      
    )})
    
    }

    {isLargeOpenComment && (
      <PopupCardLarge
        title="댓글을 삭제할까요?"
        onClose={() => setIsLargeOpenComment(false)}
        actions={[
          {
            label:'예',
            onClick: () => {
              setIsLargeOpenComment(false);
              showConfirm()},
            type:'filled'
          },
          {
            label:'아니요',
            onClick: () => setIsLargeOpenComment(false),
            type:'gray'
          }
        ]}
      />
    )}
    {isLargeOpenText && (
      <PopupCardLarge
        title="글을 삭제할까요?"
        onClose={() => setIsLargeOpenText(false)}
        actions={[
          {
            label:'예',
            onClick: () => {
              setIsLargeOpenText(false);
              showConfirm()},
            type:'filled'
          },
          {
            label:'아니요',
            onClick: () => setIsLargeOpenText(false),
            type:'gray'
          }
        ]}
      />
    )}




  </>

    
      )

};

export default CommunityInputResultComponent;