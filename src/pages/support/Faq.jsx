import React from 'react';
import Accordion from '../../components/accordion/Accordion';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';

const Faq = () => {
    return (
        <div>
            <SupportMenuComponent activeMenu="faq"/>

            <S.FAQTitle>
                FAQ
            </S.FAQTitle>

            <S.QTopLine />

            <S.AccordionWrapper>
                <Accordion question="자주하는 질문1" answer="자주하는 질문1 답변"/>
                <Accordion question="자주하는 질문2" answer="자주하는 질문2 답변"/>
                <Accordion question="자주하는 질문3" answer="자주하는 질문3 답변"/>
                <Accordion question="자주하는 질문4" answer="자주하는 질문4 답변"/>
                <Accordion question="자주하는 질문5" answer="자주하는 질문5 답변"/>
            </S.AccordionWrapper>
        </div>
    );
};

export default Faq;