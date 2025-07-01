import { useState } from 'react';

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
    <div className="diary-card">
      <h3>일정에 대한 일기를 써보세요!</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="일기를 입력하세요..."
        style={{ width: '100%', height: '200px', resize: 'none', marginBottom: '10px' }}
      />
      <div className="diary-buttons">
        <label htmlFor="image-upload" className="image-upload-button">
          📷
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <button onClick={handleSave} className="save-button">Add</button>
      </div>
    </div>
  );
};

export default Diary;
