import React, { useState } from 'react';
import BasicInput from '../input/BasicInput';
import S from './style';
import { ReactComponent as ArrowDownIcon } from '../icons/arrow-down.svg';
import { ReactComponent as ArrowUpIcon } from '../icons/arrow-up.svg';

const SelectBox = ({ options = [], placeholder = "선택하세요", onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('');

    const handleSelect = (val) => {
        setSelected(val);
        setIsOpen(false);
        onSelect?.(val);
    };

    return (
        <S.SelectWrapper>
            <S.InputButtonWrapper onClick={() => setIsOpen(prev => !prev)}>
                <BasicInput
                    type="text"
                    value={selected}
                    placeholder={placeholder}
                    readOnly
                />
                {isOpen ? (
                    <ArrowUpIcon width={30} height={30} style={{ zIndex: 11 }}  />
                ) : (
                    <ArrowDownIcon width={30} height={30} style={{ zIndex: 11 }}  />
                )}
            </S.InputButtonWrapper>

            {isOpen && (
                <S.OptionList>
                    {options.map((opt, idx) => (
                        <S.OptionItem
                            key={idx}
                            onClick={() => handleSelect(opt)}
                            className={opt === selected ? 'selected' : ''}
                        >
                            {opt}
                        </S.OptionItem>
                    ))}
                </S.OptionList>
            )}
        </S.SelectWrapper>
    );
};

export default SelectBox;