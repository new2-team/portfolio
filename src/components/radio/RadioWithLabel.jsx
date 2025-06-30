import React, { useState } from 'react';
import { ReactComponent as CheckedIcon } from '../icons/radio-on.svg';
import { ReactComponent as UncheckedIcon } from '../icons/radio-off.svg';
import S from './style';

const RadioWithLabel = ({ size = 'M', label = '' , ...props }) => {
    const [checked, setChecked] = useState(false);

    const handleClick = () => {
        setChecked(!checked);
    };

    return (
        <S.RadioWrapper onClick={handleClick}  {...props}>
            {checked ? (
                <CheckedIcon width={getSize(size)} height={getSize(size)} />
            ) : (
                <UncheckedIcon width={getSize(size)} height={getSize(size)} />
            )}
            <span>{label}</span>
        </S.RadioWrapper>
    );
};

// 크기별 사이즈 설정 함수
const getSize = (size) => {
    switch (size) {
        case 'L':
            return 48;
        case 'M':
            return 32;
        case 'S':
            return 16;
        default:
            return 24;
    }
};

export default RadioWithLabel;