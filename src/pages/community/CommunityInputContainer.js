import React, { useState } from 'react';
import CommunityInputComponent from './CommunityInputComponent';
import CommunityInputResultComponent from './CommunityInputResultComponent';

const CommunityInputContainer = () => {
  const [post,setPost] = useState([])
  const [openPost, setOpenPost] = useState([])
  const togglePost = (i) => {
    setOpenPost(p => p.includes(i) ? p.filter(postId => postId !== i) : [...p, i])
  }
  const handleLike = (postId) => {
    setPost(prev => prev.map(post => post.id === postId ? {...post, likeCount: post.likeCount + 1} : post))
  }

  const handleComment = (postId, newComment) => {
    if(newComment.trim() === "") return;
    setPost(prev => prev.map(post => post.id === postId ?
      {...post, commentList: [...post.commentList, newComment]}
      : post
    ))
  }
  const [commentInput, setCommentInput] = useState({})

  const [countComment,setCountComment] = useState('')
  

  return (
    <div>
      <CommunityInputComponent post={post} setPost={setPost}
      countComment={countComment} setCountComment={setCountComment}
        />
      {post.length > 0 ? 
      <CommunityInputResultComponent post={post} openPost={openPost} togglePost={togglePost} handleLike={handleLike}
      handleComment={handleComment} setCommentInput={setCommentInput} commentInput={commentInput}
      countComment={countComment} setCountComment={setCountComment}  /> : null}
    </div>
  );
};

export default CommunityInputContainer;