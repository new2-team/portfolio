import React, { useState } from 'react';
import S from './style';
import BasicInput from '../../components/input/BasicInput';
import BasicButton from '../../components/button/BasicButton';

const CommunityInputComponent = ({post, setPost}) => {
  const [newPost, setNewPost] = useState({title:'', content:''})
  const [showConfirm, setShowConfirm] = useState(false)
  const handleConfirm = () => {
    const updatePost = [
                  ...post,
                  {
                    ...newPost,
                    id: Date.now(),
                    likeCount:0,
                    commentList: [],
                    createdAt : new Date().toISOString()
                }];
                setPost(updatePost)
                setNewPost({title: "", content: ""});
                setShowConfirm(false)}

  return (
    <>
      <S.TextBoxWrapper>
        <S.TextBoxLeftWrapper>
          <img src="/assets/img/profile3.jpg" alt="dogProfile" />
        </S.TextBoxLeftWrapper>
          <S.TextBoxInputWrapper>
            <S.TitleInput  type="text" placeholder='제목을 입력해주세요' value={newPost.title}
            onChange={(e) => {
              setNewPost({...newPost, title: e.target.value})
            }} maxLength={20}/>
            <br />
            <S.TBButton>
              <S.ContentInput type="text" placeholder='내용을 입력해주세요' value={newPost.content}
              onChange={(e) => {
                setNewPost({...newPost, content: e.target.value})
              }} maxLength={500} />
              <S.TBBWrapper>
                <button className='imgUpload' type='submit'>
                  사진
                </button>
                <button onClick={() => {
                  if(newPost.title && newPost.content){
                    setShowConfirm(true);
                  }
                }} type='submit'>작성</button>
              </S.TBBWrapper>
            </S.TBButton>
          </S.TextBoxInputWrapper>
      </S.TextBoxWrapper>

      {showConfirm && (
        <S.ConfirmWrapper>
          <S.ConfirmBox>
            <p>작성한 내용을 등록할까요?</p>
            <S.ConfirmButtonWrapper>
              <button className='YesButton' onClick={handleConfirm}>
                예
              </button>
              <button className='NoButton' onClick={()=> setShowConfirm(false)}>
                아니요
              </button>
            </S.ConfirmButtonWrapper>
          </S.ConfirmBox>
        </S.ConfirmWrapper>
      )}
      
    </>
  );
};

export default CommunityInputComponent;