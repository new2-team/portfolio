import styled from "styled-components";
import { flexCenter, flexColumnCenter } from "../../styles/common";
import { spacingProps } from "../../styles/spacingProps";

const S = {};


S.InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px 0;
    ${spacingProps}
`

S.TitleWrap = styled.div`
    width: 100%;
    height: 100%;
`

S.highlight = styled.div`
    display: inline;
    box-shadow: inset 0 -20px 0 #ffe9e9;
`

S.inputinline = styled.div`
    display: flex;
    width: 100%;
    box-sizing: border-box;
`
S.CaptionTitlewrap = styled.div`
    width: 100%;
    height: 25px;
    /* border: solid 5px pink; */
    font-weight: bold;
`

S.NamekgWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: calc(100% - 20px/ 2);
    box-sizing: border-box;
`

S.InputReguler = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: relative;
    ${spacingProps}
    svg{
        position: absolute;
        right: 24px;
        top: 65%;
        transform: translateY(-50%);
        cursor: pointer;
        }
`       

/* border: solid 5px pink; */

S.InputButtonWrapper = styled.div`
    position: relative;
    width: 100%;
    ${spacingProps}
    
    button {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
    p {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
    svg {
        position: absolute;
        right: 24px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    
`
S.Label = styled.label`
        display: block; //이미지를 클릭하는 크기 and label 은 크기가 없는 인라인태그라서 block으로 바꿔줘야 widt, height가 들어감
    `;

S.Profile = styled.img`
    display: block;
    position: relative;
    width: 350px;
    height: 350px;
    background-color: #d9d9d9; //기본색깔임
    overflow: hidden; //사진이 넘치지 못하게
    border-radius: 50%; //둥굴게
`;

S.Content = styled.div`
    width: 300px;
    height: 40px;
`

S.RadioWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 14px;
    cursor: pointer;
    ${spacingProps}
`;

S.radioselect = styled.img`
    display: flex;
    position: relative;
    width: 100%;
    max-width: 250px;
    height: 250px;
    /* background-color: #d9d9d9; //기본색깔임 */
    border-radius: 11%; //둥굴게
`;

S.spantext = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
export default S;
