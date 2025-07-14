import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

    // 브라우저 기본 스타일 초기화
    ${reset}
    
    /*font*/
    @font-face {
        font-family: 'SUIT';
        font-weight: 900;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-Heavy.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 800;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-ExtraBold.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 700;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-Bold.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 600;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-SemiBold.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 500;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-Medium.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 400;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-Regular.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 300;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-Light.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 200;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-ExtraLight.woff2) format('woff2');
    }

    @font-face {
        font-family: 'SUIT';
        font-weight: 100;
        font-style: normal;
        src: url(${process.env.PUBLIC_URL}/assets/fonts/SUIT-Thin.woff2) format('woff2');
    }
    
    
 
    
    
    
    /*모든 선택자 (asterisk)*/
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        font-family: 'SUIT';
        box-sizing: border-box;
        text-shadow: 0 0 2px rgba(0,0,0,0.1);
        text-decoration: none !important;
        color: #333;
        line-height: 1.3;
    }
    
    button {
        cursor: pointer;
        border: none;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
