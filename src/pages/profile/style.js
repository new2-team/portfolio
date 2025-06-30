import styled from "styled-components";

const S = {}
    S.ThemeP = styled.p`
     color : ${({theme}) => theme.PALLETE.primary.main };
    font-size : ${({theme}) => theme.FONT_SIZE.h1 };
    `




export default S;
