import React, { useState } from 'react';
import S from './style';
import BasicInput from '../../components/input/BasicInput';
import BasicButton from '../../components/button/BasicButton';
import PopupCardLarge from '../../components/popUp/PopupCardLarge';
import TextArea from '../../components/textArea/TextArea';
import CommunityTextAreaComponent from './CommunityTextAreaComponent';



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
                    liked: false,
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
            <S.TitleInputWrapper>              
              <CommunityTextAreaComponent placeholder={'제목을 입력해주세요'} maxChars={20} value={newPost.title}
                onChange={(e) => {
                setNewPost({...newPost, title: e.target.value})
                }}
              />
            </S.TitleInputWrapper>
            {/* <S.TitleInput  type="text" placeholder='제목을 입력해주세요' value={newPost.title}
            onChange={(e) => {
              setNewPost({...newPost, title: e.target.value})
            }} maxLength={20}/> */}
            <br />
            <S.TBButton>
              <S.ContentInputWrapper>
                <CommunityTextAreaComponent placeholder='내용을 입력해주세요' value={newPost.content}
                  onChange={(e) => {
                  setNewPost({...newPost, content: e.target.value})}}
                  maxChars={500}
                />
                {/* <S.ContentInput type="text" placeholder='내용을 입력해주세요' value={newPost.content}
                onChange={(e) => {
                  setNewPost({...newPost, content: e.target.value})
                }} maxLength={500} /> */}
              </S.ContentInputWrapper>
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
        <PopupCardLarge
          title="작성한 내용을 등록할까요?"
          onClose={() => setShowConfirm(false)}
          actions={[
            {
              label: '예',
              onClick: handleConfirm,
              type: 'filled'
            },
            {
              label: "아니요",
              onClick: () => setShowConfirm(false),
              type: 'gray'
            }
          ]}
        />
      )}
    </>
  );
};

export default CommunityInputComponent;