import React, { useState } from 'react';
import S from './style';
import BasicInput from '../../components/input/BasicInput';
import PopupCardLarge from '../../components/popUp/PopupCardLarge';

const CommunityInputResultComponent = ({post,setPost, openPost, togglePost, 
  handleComment,handleLike,setCommentInput,commentInput,
  countComment, setCountComment, deletePost, deleteComment, toggleReplyInput, openReplyInput,
  replyInput, setReplyInput, addReply, setOpenReplyInput, deleteReply}) => {

// 시간 표시
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

// 댓글 수
const getTotalCommentCount = (commentList) => {
  if (!Array.isArray(commentList)) return 0;
  let count = 0;
  commentList.forEach((comment) => {
    count +=1;
    if(Array.isArray(comment.replies)) {
      count += comment.replies.length
    }
  })
  return count;
}

// 좋아요 토글
const onToggleLike = async (postItem) => {
  const prevLiked = postItem.liked;
  const prevLikeCount = postItem.likeCount;

  setPost((prev) => 
    prev.map((p) => 
      p.id === postItem.id
        ? {
          ...p,
          liked: !p.liked,
          likeCount: p.liked ? p.likeCount - 1: p.likeCount + 1,
        }
        : p
    )
  );

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/toggle-like/${postItem.id}`,{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({post_id: postItem.id, liked: prevLiked}),
    });
    if (!response.ok) throw new Error(`좋아요 실패: ${response.status}`);
    const data = await response.json().catch(() => ({}));
    if (typeof data?.like_count === 'number') {
      setPost(prev => prev.map(p => 
        p.id === postItem.id ? { ...p, likeCount: data.like_count} : p
      ))
    }

  } catch (error) {
    console.error(error);

    setPost((prev) =>
      prev.map((p) =>
        p.id === postItem.id
          ? {...p, liked: prevLiked, likeCount: prevLikeCount}
          : p
      )
    );
    alert('좋아요 처리 중 오류 발생')
  }
}

// 댓글 등록
const onAddComment = async (postId, text) => {
  const trimmed = (text || '').trim();
  if (!trimmed) return;

  const tempId = Date.now();
  const tempComment = {
    id: tempId,
    text: trimmed,
    createdAt: new Date().toISOString(),
    replies: [],
  }

  setPost((prev) =>
    prev.map((p) => 
      p.id === postId
        ? { ...p, commentList: [...(p.commentList || []), tempComment]}
        : p
    )
  );

  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/register-reply`,{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        post_id: postId,
        user_id:'', //로그인 후
        reply_content: trimmed,
      }),
    });
    if (!res.ok) throw new Error(`댓글 등록 실패: ${res.status}`);
    const data = await res.json().catch(() => ({}));
    const serverReplyId = data?.reply?.reply_id;
    const serverCreatedAt = data?.reply?.created_at;

    setPost((prev) => 
      prev.map((p) => {
        if(p.id !== postId) return p;
        return {
          ...p,
          commentList: p.commentList.map((c) =>
            c.id === tempId
              ? {
                ...c,
                id: serverReplyId || c.id,
                createdAt: serverCreatedAt || c.createdAt,
              }
              :c
          ),
        }
      })
    );
  } catch (e) {
    console.error(e);
    setPost((prev) =>
      prev.map((p) => 
        p.id === postId
          ? {
            ...p,
            commentList: p.commentList.filter((c) => c.id !== tempId)
          }
          :p
      )
    );
    alert('댓글 등록 중 오류 발생')
  } finally {
    // 입력창 비우기
    setCommentInput((prev) => ({...prev, [postId]: '' }));
  }
}

// 게시글 삭제
const onRemovePost = async (postId) => {
  try{
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/remove-post/${postId}`, {
      method:'DELETE',
    });
    if (!res.ok) throw new Error(`게시글 삭제 실패: ${res.status}`);
    await res.json().catch(() => ({}));

    setPost(prev => prev.filter(p => p.id !== postId));
  } catch (e) {
    console.error(e);
    alert('게시글 삭제 중 오류 발생')
  }
};

// 댓글 삭제
const onRemoveReply = async (postId, replyId) => {
  try{
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/community/api/remove-reply/${replyId}`, {
      method:'DELETE',

    });
    if (!res.ok) throw new Error(`댓글 삭제 실패: ${res.status}`);
    await res.json().catch(() => ({}));

    setPost(prev => 
      prev.map(p => 
        p.id === postId
          ? { ...p, commentList: p.commentList.filter(c => c.id !== replyId)}
          : p
      ));
  } catch (e) {
    console.error(e);
    alert('댓글 삭제 중 오류 발생')
  }
}
  

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
                  <S.HeartButton onClick={()=> onToggleLike(postItem)} type='button'
                    $liked={postItem.liked}  
                  >
                    <img src={postItem.liked ? "/assets/icons/heart-click.svg" : "/assets/icons/heart.svg"}  alt="좋아요" />
                  </S.HeartButton>
                  <S.HeartCommentCount>{postItem.likeCount}</S.HeartCommentCount>
                  <S.CommentButton type='submit'>
                    <img src="/assets/icons/chat.svg" alt="댓글" />
                  </S.CommentButton>
                  <S.HeartCommentCount>{getTotalCommentCount(postItem.commentList)}</S.HeartCommentCount>
              </S.HeartCommentTop>)}
              <S.ArrowButton onClick={() => togglePost(postItem.id)}>{isOpen ? <img src="/assets/icons/arrow-up.svg" width={24} height={24} alt="열림" />:<img src="/assets/icons/arrow-down.svg" width={24} height={24} alt="닫힘" />}</S.ArrowButton>
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
                <S.HeartButton onClick={()=> onToggleLike(postItem)} type='submit'>
                  <img src={postItem.liked ? "/assets/icons/heart-click.svg" : "/assets/icons/heart.svg"} width={24} height={24} alt="좋아요" />
                </S.HeartButton>
                <S.HeartCommentCount>{postItem.likeCount}</S.HeartCommentCount>
                <S.CommentButton type='submit'>
                  <img src="/assets/icons/chat.svg" width={24} height={24} alt="댓글" />
                </S.CommentButton>
                <S.HeartCommentCount>{getTotalCommentCount(postItem.commentList)}</S.HeartCommentCount>
              </S.HeartComment>
              <S.DeleteButton className='DeleteText' 
              onClick={() => {
                setIsLargeOpenText(true);
                setShowConfirm(() => () => onRemovePost(postItem.id))
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
                      setShowConfirm(() => () => onRemoveReply(postItem.id,comment.id))
                    }}>삭제하기</S.DeleteCommentButton>
                  </S.CommentLine>
                  <S.Line/>



                  {/* 대댓글 출력 */}
                  {comment.replies?.map((reply) => (
                    
                      <S.PlusCommentResultWrapper key={reply.id}>
                        <S.PCRTop>
                          <img src="/assets/icons/arrow-down-red.svg" width={18} height={18} alt="대댓글" />
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
                            setShowConfirm(() => () => deleteReply(postItem.id,comment.id, reply.id))
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
                  onAddComment(postItem.id, commentInput[postItem.id])
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