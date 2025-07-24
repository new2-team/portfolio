import React from "react";
import S from "./style";
import BasicButton from "../../button/BasicButton";
import Text from "../../text/size";

const Header = ({ isLoggedIn, user }) => {
  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <img src="/assets/img/logo.svg" alt="MungPick 로고" />
      </S.LogoWrapper>

      <S.Menu>
        {isLoggedIn ? (
          <>
            <Text.Body3>친구들 보러가기</Text.Body3>
            <Text.Body3>FAQ</Text.Body3>
            <Text.Body3>멍게시판</Text.Body3>
          </>
        ) : (
          <>
            <Text.Body3>FAQ</Text.Body3>
            <Text.Body3>이용후기</Text.Body3>
          </>
        )}
      </S.Menu>

      <S.RightMenu>
        {isLoggedIn ? (
          <>
            <S.IconWrap>
              <S.Badge>
                <img src="/assets/icons/bell.svg" alt="알림" width={30} height={30} />
                <S.BadgeCount>2</S.BadgeCount>
              </S.Badge>

              <S.Badge>
                <img src="/assets/icons/send.svg" alt="쪽지" width={30} height={30} />
                <S.BadgeCount>5</S.BadgeCount>
              </S.Badge>

              <S.Badge>
                <img src="/assets/icons/calendar.svg" alt="캘린더" width={30} height={30} />
                <S.BadgeCount>1</S.BadgeCount>
              </S.Badge>
            </S.IconWrap>

            {/* 프로필 이미지가 없으면 기본 이미지 보여줌 */}
            <S.ProfileImg
              src={user?.profileImage || "/assets/img/sample-profile.png"}
              alt="프로필"
            />
          </>
        ) : (
          <>
            <S.ButtonWrap>
              <BasicButton variant="filled" roundButton="small">
                로그인
              </BasicButton>
              <BasicButton variant="filled" roundButton="small">
                회원가입
              </BasicButton>
            </S.ButtonWrap>
          </>
        )}
      </S.RightMenu>
    </S.HeaderWrapper>
  );
};

export default Header;
