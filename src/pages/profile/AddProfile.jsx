import React from 'react';
import BasicButton from '../../components/button/BasicButton';

const AddProfile = () => {

    return (
        <div>
            <p>회원가입</p>
            <div>
                <div>
                <p>내이름은,</p>
                <BasicButton
                    
                    type="text" placeholder='멍이의 이름을 입력해주세요' />
                </div>
                <div>
                <p>몸무게</p>
                <input 
                    type="text" placeholder='                                        kg' />
                </div>


            </div>
            <label>
                
            </label>
        </div>
    );
};

export default AddProfile;