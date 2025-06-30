import React, { useState } from 'react';
import { ReactComponent as CheckedIcon } from '../icons/check-on.svg';
import { ReactComponent as UncheckedIcon } from '../icons/check-off.svg';
import S from './style';

const Checkbox = () => {
    const [checked, setChecked] = useState(false);

    return (
        <S.CheckboxWrapper onClick={() => setChecked(!checked)}>
            {checked ? (
                <CheckedIcon width={20} height={20} />
            ) : (
                <UncheckedIcon width={20} height={20} />
            )}
        </S.CheckboxWrapper>
    );
};

export default Checkbox;