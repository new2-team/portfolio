import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  // 소셜 로그인 사용자 정보 처리
  useEffect(() => {
    const accessToken = searchParams.get('accessToken');
    const isNewUser = searchParams.get('isNewUser');
    const userId = searchParams.get('user_id');

    if (isNewUser === 'true' && accessToken && userId) {
      console.log('=== 소셜 로그인 사용자 정보 처리 ===');
      console.log('accessToken:', accessToken);
      console.log('userId:', userId);
      console.log('isNewUser:', isNewUser);

      try {
        // JWT 토큰에서 사용자 정보 추출
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        console.log('JWT 페이로드:', payload);

        // localStorage에 토큰과 사용자 ID 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user_id', userId);

        // Redux에 사용자 정보 저장
        dispatch(setUser({
          user_id: userId,
          email: payload.email || '',
          name: payload.name || '',
          provider: payload.provider || 'social',
          profileComplete: payload.profileComplete || false
        }));

        dispatch(setUserStatus(true));

        // tempUserData에 기본 정보 저장
        const tempUserData = {
          user_id: userId,
          email: payload.email || '',
          name: payload.name || '',
          provider: payload.provider || 'social'
        };
        localStorage.setItem('tempUserData', JSON.stringify(tempUserData));

        console.log('소셜 로그인 사용자 정보 저장 완료');
      } catch (error) {
        console.error('소셜 로그인 사용자 정보 처리 오류:', error);
      }
    }
  }, [searchParams, dispatch]);

  // 프로필 등록 완료 핸들러
  const handleProfileComplete = async (profileData) => {
    try {
      console.log('=== 프로필 등록 시작 ===');
      console.log('받은 프로필 데이터:', profileData);

      // localStorage에서 임시 사용자 정보 가져오기
      const tempUserData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      console.log('tempUserData:', tempUserData);

      if (!tempUserData.user_id) {
        throw new Error('사용자 ID를 찾을 수 없습니다. 다시 로그인해주세요.');
      }

      // 프로필 데이터 정리
      const cleanProfileData = {
        name: profileData.name,
        weight: profileData.weight,
        birthDate: profileData.birthDate,
        gender: profileData.gender,
        address: profileData.address,
        breed: profileData.breed,
        custombreed: profileData.custombreed || '',
        nickname: profileData.nickname,
        favoriteSnack: profileData.favoriteSnack,
        walkingCourse: profileData.walkingCourse,
        messageToFriend: profileData.messageToFriend,
        charactor: profileData.charactor,
        favorites: profileData.favorites,
        cautions: profileData.cautions,
        neutralization: profileData.neutralization || '',
        profileImage: profileData.profileImage || ''
      };

      console.log('정리된 프로필 데이터:', cleanProfileData);

      // 기존 tempUserData에 dogProfile 추가
      const existingData = JSON.parse(localStorage.getItem('tempUserData') || '{}');
      const updatedData = { 
        ...existingData, 
        dogProfile: cleanProfileData
      };

      // localStorage에 업데이트된 데이터 저장
      localStorage.setItem('tempUserData', JSON.stringify(updatedData));

      // 프로필 이미지는 tempUserData에만 저장 (localStorage에 별도 저장하지 않음)
      if (profileData.profileImage) {
        console.log('=== 프로필 이미지 정보 확인 ===');
        console.log('profileData.profileImage:', profileData.profileImage);
        console.log('이미지 정보가 tempUserData.dogProfile.profileImage에 저장됨');
      } else {
        console.log('=== 프로필 이미지 없음 ===');
        console.log('profileData.profileImage:', profileData.profileImage);
      }

      console.log('프로필 정보 입력 성공:', {
        profileStatus: true,
        message: '프로필 정보 입력 완료. 다음 단계로 진행해주세요.',
        tempData: cleanProfileData
      });

      // 건강정보 등록 페이지로 이동
      navigate('/profile/add-health');
      
    } catch (error) {
      console.error('프로필 등록 오류:', error);
      alert(error.message || '프로필 등록 중 오류가 발생했습니다.');
    }
  };

  return <AddProfile onProfileComplete={handleProfileComplete} />;
};

export default SignUpProfile;