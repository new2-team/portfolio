import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserStatus } from "../../components/modules/user";
import AddProfile from "../profile/AddProfile";

// 3단계: 프로필 등록 페이지
const SignUpProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // AddProfile에서 폼 제출 완료 시 호출되는 핸들러
  const handleProfileComplete = async (profileData) => {
    try {
      // localStorage에서 임시 사용자 정보 가져오기
      const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      
      // 3단계: 프로필 등록 API 호출
      const formData = new FormData();
      formData.append('userId', tempUserData.userId);
      formData.append('name', profileData.name);
      formData.append('weight', profileData.weight);
      formData.append('birthDate', profileData.birthDate);
      formData.append('gender', profileData.gender);
      formData.append('address', profileData.address);
      formData.append('breed', profileData.breed);
      formData.append('custombreed', profileData.custombreed);
      formData.append('nickname', profileData.nickname);
      formData.append('favoriteSnack', profileData.favoriteSnack);
      formData.append('walkingCourse', profileData.walkingCourse);
      formData.append('messageToFriend', profileData.messageToFriend);
      formData.append('charactor', profileData.charactor);
      formData.append('favorites', JSON.stringify(profileData.favorites));
      formData.append('cautions', JSON.stringify(profileData.cautions));
      formData.append('neutralization', profileData.neutralization);
      
      if (profileData.imageSrc) {
        // 이미지가 base64 형태로 저장되어 있으므로 파일로 변환
        const response = await fetch(profileData.imageSrc);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formData.append('profileImage', file);
      }

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/api/profile-registration`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '프로필 등록에 실패했습니다.');
      }

      const result = await response.json();
      console.log('프로필 등록 성공:', result);

      // Redux store에 사용자 정보 저장
      dispatch(setUser(result.user));
      dispatch(setUserStatus(true));
      
      // 임시 데이터 정리
      localStorage.removeItem('tempUserData');
      
      // 회원가입 완료 페이지로 이동
      navigate('/sign-up/complete');
    } catch (error) {
      console.error('프로필 등록 오류:', error);
      alert(error.message);
    }
  };

  return (
    <AddProfile onProfileComplete={handleProfileComplete} />
  );
};

export default SignUpProfile; 