import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import S from './style2';

const Diary = ({ eventId }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  // ✅ 예시: 기존에 저장된 데이터 (빈 객체 or 데이터 있는 객체)
  // const scheduleDiary = {}; 
  // const scheduleDiary = { text: 
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
  //   "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
  //   , imageUrl: "/assets/img/chat/soul.png" };

  const hasDiary = scheduleDiary && Object.keys(scheduleDiary).length > 0;

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  const handleSave = () => {
    console.log('Diary saved:', { eventId, text, image });
  };

  const handleEdit = () => {
    console.log('Diary edit clicked');
  };

  const handleDelete = () => {
    console.log('Diary deleted');
  };

  // 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <S.DiaryCard>
      {!hasDiary && <S.DiaryTitle>일정에 대한 일기를 써보세요!</S.DiaryTitle>}

      {hasDiary ? (
        scheduleDiary.imageUrl && (
          <S.ImageWrapper>
            <S.SavedImage src={scheduleDiary.imageUrl} alt="saved" />
          </S.ImageWrapper>
        )
      ) : (
        image && (
          <S.ImageWrapper>
            <S.PreviewImage src={URL.createObjectURL(image)} alt="preview" />
            <S.DeleteImageButton onClick={handleDeleteImage}>
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'white', fontSize: '20px' }} />
            </S.DeleteImageButton>
          </S.ImageWrapper>
        )
      )}

      {hasDiary ? (
        <S.TextField>{scheduleDiary.text}</S.TextField>
      ) : (
        <S.Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내용을 입력하세요!!..."
        />
      )}

      <S.DiaryButtons>
        {!hasDiary && (
          <>
            <S.ImageUploadLabel htmlFor="image-upload">
              <FontAwesomeIcon icon={faImage} />
            </S.ImageUploadLabel>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </>
        )}

        {hasDiary ? (
          <>
            <BasicButton roundButton="small" variant="default" onClick={handleEdit} style={{ width: '100%', margin: '10px' }}>
              수정하기
            </BasicButton>
            <BasicButton roundButton="small" variant="filled" onClick={handleDelete} style={{ width: '100%', margin: '10px' }}>
              삭제하기
            </BasicButton>
          </>
        ) : (
          <BasicButton roundButton="small" variant="filled" onClick={handleSave} style={{ width: '100%', margin: '0 10px' }}>
            저장하기
          </BasicButton>
        )}
      </S.DiaryButtons>
    </S.DiaryCard>

  );
};

export default Diary;
