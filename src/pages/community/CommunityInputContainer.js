import React, { useMemo, useState } from 'react';
import CommunityInputComponent from './CommunityInputComponent';
import CommunityInputResultComponent from './CommunityInputResultComponent';

const CommunityInputContainer = () => {
  const [post,setPost] = useState([])
  const [openPost, setOpenPost] = useState([])
  const togglePost = (i) => {
    setOpenPost(p => p.includes(i) ? p.filter(postId => postId !== i) : [...p, i])
  }
  const handleLike = (postId) => {
    setPost(prev => prev.map(post => post.id === postId ? 
      {...post, 
        likeCount: post.liked? post.likeCount - 1 : post.likeCount + 1,
        liked: !post.liked
      } : post))
  }

  const handleComment = (postId, newComment) => {
    if(newComment.trim() === "") return;

    const commentObject = {
      id : Date.now(),
      text: newComment,
      createdAt : new Date().toISOString(),
      replies : []
    }

    setPost(prev => prev.map(post => post.id === postId ?
      {...post, commentList: [...post.commentList, commentObject]}
      : post
    ))
  }
  const [commentInput, setCommentInput] = useState({})

  const [countComment,setCountComment] = useState('')

  // 게시글 삭제
  const deletePost = (postId) => {
    setPost(prev => prev.filter(post => post.id !== postId))
  }

  const deleteComment = (postId, commentId) => {
    setPost(prev => prev.map(post => post.id === postId ? 
      {
        ...post,
        commentList: post.commentList.filter(comment => comment.id !== commentId)
      } : post
    ))
  }

  // 대댓글
  const [replyInput, setReplyInput] = useState({})
  const [openReplyInput, setOpenReplyInput] = useState({});
  const toggleReplyInput = (commentId) => {
    setOpenReplyInput(prev => ({
      ...prev,
      [commentId] : !prev[commentId]
    }))
  }

  const addReply = (postId, commentId, replyText) => {
    if(replyText.trim() === "") return;

    const replyObject = {
      id : Date.now(),
      text : replyText,
      createdAt : new Date().toISOString()
    }

    setPost(prev => prev.map(post => {
      if(post.id !== postId) return post;
      return{
        ...post,
        commentList : post.commentList.map(comment => {
          if (comment.id === commentId){
            return {
              ...comment,
              replies: [...(comment.replies || []), replyObject]
            }
          }
          return comment;
        })
      }
    }))
  }
  
  const deleteReply = (postId, commentId, replyId) => {
    setPost(prev => prev.map(post => {
      if (post.id !== postId) return post;
      return {
        ...post,
        commentList: post.commentList.map(comment => {
          if (comment.id !== commentId) return comment;
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== replyId)
          }
        })
      }
    }))
  }


  
 
  return (
    <div>
      <CommunityInputComponent post={post} setPost={setPost}
      countComment={countComment} setCountComment={setCountComment}
        />
      {post.length > 0 ? 
      <CommunityInputResultComponent post={post} openPost={openPost} togglePost={togglePost} handleLike={handleLike}
      handleComment={handleComment} setCommentInput={setCommentInput} commentInput={commentInput}
      countComment={countComment} setCountComment={setCountComment} deletePost={deletePost} 
      deleteComment={deleteComment} openReplyInput={openReplyInput} toggleReplyInput={toggleReplyInput}
      replyInput={replyInput} setReplyInput={setReplyInput} addReply={addReply} setOpenReplyInput={setOpenReplyInput}
      deleteReply={deleteReply}
      /> : null}
    </div>
  );
};

export default CommunityInputContainer;