import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import BasicButton from "../../components/button/BasicButton";
import styles from './style';


const Diary = ({ eventId }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = () => {
    // 🔥 실제로는 API에 post
    console.log('Diary saved:', { eventId, text, image });
  };

  return (
    <div style={styles.diaryCard}>
      <h3 style={styles.diaryTitle}>일정에 대한 일기를 써보세요!</h3>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="내용을 입력하세요..."
        style={styles.textarea}
      />

      <div style={styles.diaryButtons}>
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
        <BasicButton
          roundButton="small"
          variant="filled"
          onClick={handleSave}
          style={styles.saveButton}
        >
          저장하기
        </BasicButton>
      </div>
    </div>

  );
};

export default Diary;
