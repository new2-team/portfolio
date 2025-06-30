import React from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import BasicInput from '../../components/input/BasicInput';
import PasswordInput from '../../components/input/PasswordInput';

const Inquiry = () => {
    return (
        <div>
            <SupportMenuComponent activeMenu="inquiry" />

            <div>
                <S.InquiryTitle>1:1 문의</S.InquiryTitle>
                <div>
                    <S.InquiryTitleBottom>
                        문의사항을 보내주시면 친절하게 답변하겠습니다. <br />
                        1:1문의를 주말에 남겨 주시는 고객님께는 평일 9:00 ~ 18:00 에 순차적으로 답변 드리도록 하겠습니다.
                    </S.InquiryTitleBottom>
                </div>
            </div>

        </div>
    );
};

export default Inquiry;