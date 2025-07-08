import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import styles from './style';

const Diary = ({ eventId }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  // ✅ 예시: 기존에 저장된 데이터 (빈 객체 or 데이터 있는 객체)
  // const scheduleDiary = {}; 
  const scheduleDiary = { text: 
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"+
    "오늘은 산책을 다녀왔어요!ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
    , imageUrl: "/assets/img/chat/soul.png" };

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

  // ✅ 메모리 누수 방지
  useEffect(() => {
    return () => {
      if (image) URL.revokeObjectURL(image);
    };
  }, [image]);

  return (
    <div style={styles.diaryCard}>
      {!hasDiary && <h3 style={styles.diaryTitle}>일정에 대한 일기를 써보세요!</h3>}

      {/* 객체 없을때 사진 업로드 미리보기 */}
      {hasDiary ? (
        scheduleDiary.imageUrl && (
          <div
            style={{
              position: 'relative',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={scheduleDiary.imageUrl}
              alt="saved"
              style={{
                width: '100%',
                maxWidth: '200px',
                borderRadius: '10px',
                objectFit: 'cover',
                margin: '10px',
              }}
            />
          </div>
        )
      ) : (
        image && (
          <div
            style={{
              position: 'relative',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{
                width: '50%',
                maxWidth: '300px',
                borderRadius: '10px',
                objectFit: 'cover',
              }}
            />
            {/* ✅ 삭제 버튼 */}
            <button
              onClick={handleDeleteImage}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'white', fontSize: '20px' }} />
            </button>
          </div>
        )
      )}

      {/* 객체 없을때 텍스트 표시 */}
      {hasDiary ? (
        <p style={styles.textField}>
          {scheduleDiary.text}
        </p>
      ) : (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="내용을 입력하세요!!..."
          style={styles.textarea}
        />
      )}

      <div style={styles.diaryButtons}>
        {/* 사진업로드 버튼 */}
        {!hasDiary && (
          <>
            <label htmlFor="image-upload" style={styles.imageUploadButton}>
              <FontAwesomeIcon icon={faImage} />
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </>
        )}

        {/* 버튼 */}
        {hasDiary ? (
          <>
            <BasicButton
              roundButton="small"
              variant="default"
              onClick={handleEdit}
              style={styles.editButton2}
            >
              수정하기
            </BasicButton>
            <BasicButton
              roundButton="small"
              variant="filled"
              onClick={handleDelete}
              style={styles.deleteButton2}
            >
              삭제하기
            </BasicButton>
          </>
        ) : (
          <BasicButton
            roundButton="small"
            variant="filled"
            onClick={handleSave}
            style={styles.saveButton}
          >
            저장하기
          </BasicButton>
        )}
      </div>
    </div>
  );
};

export default Diary;
