import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserStatus } from '../modules/user';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  // 토큰 유효성 검사
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      const isAuthenticate = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/jwt`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const getAuthenticateUserData = await response.json();
            const { user, message } = getAuthenticateUserData;
            
            if (user) {
              dispatch(setUser(user));
              dispatch(setUserStatus(true));
              console.log('자동 로그인 성공:', message);
            }
          } else {
            // 토큰이 유효하지 않으면 제거하고 로그아웃 상태로 변경
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('rememberedId');
            dispatch(setUserStatus(false));
            console.log('토큰이 유효하지 않아 제거됨');
          }
        } catch (error) {
          console.error('토큰 검증 오류:', error);
          // 오류 발생 시 토큰 제거하고 로그아웃 상태로 변경
          localStorage.removeItem('jwt_token');
          localStorage.removeItem('rememberedId');
          dispatch(setUserStatus(false));
        } finally {
          setIsLoading(false); // 로딩 완료
        }
      };

      isAuthenticate();
    } else {
      // 토큰이 없으면 로그아웃 상태로 변경
      dispatch(setUserStatus(false));
      setIsLoading(false); // 로딩 완료
    }
  }, [dispatch]);

  // 스켈레톤 UI로 새로고침시 자연스럽게 처리
  if (isLoading) {
    return (
      <div style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#fff5ec',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* 스켈레톤 헤더 */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100px',
          backgroundColor: '#fff5ec',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 240px'
        }}>
          {/* 로고 스켈레톤 */}
          <div style={{
            width: '183px',
            height: '60px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
          
          {/* 메뉴 스켈레톤 */}
          <div style={{
            display: 'flex',
            gap: '50px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)'
          }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                width: '80px',
                height: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }} />
            ))}
          </div>
          
          {/* 우측 메뉴 스켈레톤 */}
          <div style={{
            width: '120px',
            height: '40px',
            backgroundColor: '#f0f0f0',
            borderRadius: '20px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} />
        </div>
        
        {/* 메인 콘텐츠 스켈레톤 */}
        <div style={{
          width: '80%',
          maxWidth: '800px',
          height: '400px',
          backgroundColor: '#f0f0f0',
          borderRadius: '12px',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
        
        {/* CSS 애니메이션 */}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default AuthProvider;
