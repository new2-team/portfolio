import React, { useState } from "react";
import { ReactComponent as ArrowDownRedIcon } from "../icons/arrow-down-red.svg";
import { ReactComponent as ArrowUpRedIcon } from "../icons/arrow-up-red.svg";
import S from "./style";
import Text from "../text/size";

const Accordion = ({ question, answer, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.AccordionWrapper {...props}>
      <S.QuestionBox onClick={() => setIsOpen((prev) => !prev)}>
        <Text.Body2>{question}</Text.Body2>
        {isOpen ? <ArrowUpRedIcon /> : <ArrowDownRedIcon />}
      </S.QuestionBox>

      {isOpen && <S.AnswerBox>{answer}</S.AnswerBox>}
    </S.AccordionWrapper>
  );
};

export default Accordion;
