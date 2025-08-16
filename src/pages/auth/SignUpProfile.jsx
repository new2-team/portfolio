import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setUserStatus } from "../../components/modules/user";
import AddProfile from "../profile/AddProfile";

/**
 * 회원가입 3단계: 프로필 등록 페이지
 * AddProfile 컴포넌트를 래핑하여 회원가입 플로우에 맞는 API 호출 처리
 */
const SignUpProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 프로필 등록 완료 핸들러
  const handleProfileComplete = async (profileData) => {
    try {
      // localStorage에서 임시 사용자 정보 가져오기
      const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      
      // FormData 생성
      const formData = new FormData();
      
      // 기본 정보 추가
      formData.append('userId', tempUserData.user_id);
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
      
      // 프로필 이미지 처리
      if (profileData.imageSrc) {
        const response = await fetch(profileData.imageSrc);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formData.append('profileImage', file);
      }

      // 2단계: 프로필 등록 (임시 데이터만 반환, DB 저장 안함)
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/profile-registration`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '프로필 등록 중 오류가 발생했습니다.');
      }

      const result = await response.json();
      console.log('프로필 정보 입력 성공:', result);

      // 기존 tempUserData에 dogProfile 추가
      const existingData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      const updatedData = { ...existingData, ...result.tempData };
      localStorage.setItem('tempUserData', JSON.stringify(updatedData));
      
      // 건강정보 등록 페이지로 이동
      navigate('/profile/add-health');
    } catch (error) {
      console.error('프로필 등록 오류:', error);
      alert(error.message);
    }
  };

  return <AddProfile onProfileComplete={handleProfileComplete} />;
};

export default SignUpProfile; 