import React, { useState } from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import S from '../textArea/style';
=======
>>>>>>> c713d9182b8edde71a3b711a202cba5cedeed180


const TextArea = ({placeholder, maxChars, value, onChange}) => {

  const [text, setText] = useState('');

  return (
    <S.TextAreaWrapper>
      <S.TextArea
        maxLength={maxChars}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
      />
      <S.CharCount limitReached={text.length >= maxChars}>
        {text.length} / {maxChars}
      </S.CharCount>
    </S.TextAreaWrapper>
  );
}

export default TextArea;