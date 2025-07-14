import React from 'react'

import BasicButton from '../button/BasicButton';
import S from "./style";
import Text from "../text/size";

const ProfileCard = (props) => {
  return (
    <S.ProfileCardWrapper {...props}>
        <S.ProfileImage>
            <img src="/assets/img/my-profile.png" alt=""/>
        </S.ProfileImage>
        <S.ProfileInfo>
            <Text.H3>이름</Text.H3>
            <S.ProfileInfoItem>
                <Text.Caption3>리트리버</Text.Caption3>
                <Text.Caption3>수컷</Text.Caption3>
                <Text.Caption3>12.8kg</Text.Caption3>
                <Text.Caption3>8세</Text.Caption3>
            </S.ProfileInfoItem>

            <S.ProfileInfoButton>
                <BasicButton roundButton="medium" variant="filled">#소심해요</BasicButton>
                <BasicButton roundButton="medium" variant="filled">#낯가려요</BasicButton>
                <BasicButton roundButton="medium" variant="filled">#호기심쟁이</BasicButton>
            </S.ProfileInfoButton>


        </S.ProfileInfo>

    </S.ProfileCardWrapper>
  )
}

export default ProfileCard;