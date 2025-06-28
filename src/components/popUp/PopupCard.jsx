import React from 'react';
import S from './style';

const PopupCard = ({ title, description, actions = [] }) => {
    return (
        <S.Wrapper>
            <S.Title>{title}</S.Title>

            {description && (
                <S.Description>
                    {description.split('\n').map((line, i) => (
                        <span key={i}>
              {line}
                            <br />
            </span>
                    ))}
                </S.Description>
            )}

            <S.ButtonGroup $count={actions.length}>
                {actions.map(({ label, onClick, type = 'primary' }, idx) => (
                    <S.Button key={idx} $type={type} onClick={onClick}>
                        {label}
                    </S.Button>
                ))}
            </S.ButtonGroup>
        </S.Wrapper>
    );
};

export default PopupCard;