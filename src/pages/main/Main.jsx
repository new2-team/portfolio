import React from 'react';
import BasicButton from "../../components/button/BasicButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/icons/Icon";
import Text from "../../components/text/size";
import BasicInput from "../../components/input/BasicInput";



const Main = () => {
    return (
        <section>
            <Text.H1 fontWeight={600} mt="100" p={100} color={"blue"}>안녕하세요!!</Text.H1>
            <Text.Caption2 mt="50" fontWeight={900} color={"orange"}>헬로</Text.Caption2>

            <BasicButton basicButton="small" variant="disabled" pt="20">
                텍스트
            </BasicButton>
            <Text.Body2 color={"red"}>정지우입니다</Text.Body2>
            <BasicInput type="text" placeholder="이름을 입력하세요" disabled/>


            테스트 222
            cptm,cmmdfkfjkdjkfdkfd

            테스트테스트
            테스트222
            테스트 33
            dfdfdfdf
            테스트마지막
            테스트 찐막
        </section>
    );
};

export default Main;