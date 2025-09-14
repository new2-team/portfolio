import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import BasicButton from "../../components/button/BasicButton";
import './Calendar.css';
import S from './style2';

const Diary = ({ selectedSchedule, selectedDate }) => {
  const user_id = localStorage.getItem('user_id');

  const schedule = selectedSchedule ?? null;
  // console.log("day에서 넘겨받은 schedule객체: ",schedule);

  const [diaryText, setDiaryText] = useState(schedule?.diary_text ?? null);
  const [diaryPhoto, setDiaryPhoto] = useState(schedule?.diary_photo_url ?? null); 

  useEffect(() => {
    setDiaryText(schedule?.diary_text ?? null);
    setDiaryPhoto(schedule?.diary_photo_url ?? null);
  }, [selectedSchedule]);

  // console.log("diaryText", diaryText);
  // console.log("diaryPhoto", diaryPhoto);



  const hasDiary = !!(diaryText || diaryPhoto);

  const [text, setText] = useState('');
  const [file, setFile] = useState(null);   // 업로드 원본 파일
  const [previewUrl, setPreviewUrl] = useState(null); // 미리보기 url


  // 파일 선택
  const handleImageChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // 이전 미리보기 URL 정리
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
  };

  // 미리보기 제거
  const handleDeleteImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
  };

  // 이미지 업로드 -> imageUrl 반환
  const uploadDiaryImage = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append('diary', file); // 서버에서 받을 필드명(예: 'diary')

    const res = await fetch(
      `http://localhost:8000/calendar/api/post-diaryPictures`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!res.ok) {
      const msg = await res.json().catch(() => ({}));
      throw new Error(msg?.message || '이미지 업로드 실패');
    }
    const data = await res.json(); // { imageUrl: 'https://...' } 가정
    return data.imageUrl || null;
  };

  // 일기 저장 버튼
  const handleSave = async () => {
    try {
      let diary_photo_url = null;
      if(file){
        diary_photo_url = await uploadDiaryImage();
      }
    
    const res = await fetch(`http://localhost:8000/calendar/api/post-diary`, {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        user_id: user_id,
        _id: schedule._id,
        diary_text: text || null,
        diary_photo_url: diary_photo_url || null,
      }),
    }
  );
   if (!res.ok) {
        const msg = await res.json().catch(() => ({}));
        throw new Error(msg?.message || '일기 저장 실패');
      }

      const data = await res.json();
      alert(data?.message || '저장 완료');
      setDiaryText(data.diary_text);
      setDiaryPhoto(data.diary_photo_url);
      console.log("data.diary_photo_url", data.diary_photo_url);

      // 로컬 작성 상태 초기화 (필요 시 부모 상태 갱신 로직 추가)
      // 일기 조회 함수 호출하기 !!!

      setText('');
      handleDeleteImage();
      // TODO: 부모에서 selectedSchedule 갱신 필요하면 콜백 prop으로 data.schedule 반영
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <S.DiaryCard>
      {!hasDiary  && <S.DiaryTitle>일정에 대한 일기를 써보세요!</S.DiaryTitle>}

      {hasDiary ? (
        diaryPhoto && (
          <S.ImageWrapper>
            <S.SavedImage src={diaryPhoto} alt="saved" />
          </S.ImageWrapper>
        )
      ) : (
        previewUrl && (
          <S.ImageWrapper>
            <S.PreviewImage src={previewUrl} alt="preview" />
            <S.DeleteImageButton onClick={handleDeleteImage}>
              <FontAwesomeIcon icon={faTimesCircle} style={{ color: 'white', fontSize: '20px' }} />
            </S.DeleteImageButton>
          </S.ImageWrapper>
        )
      )}

      {hasDiary ? (
        <S.TextField>{diaryText}</S.TextField>
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
