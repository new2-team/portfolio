import React, { useState } from 'react';
import SupportMenuComponent from './SupportMenuComponent';
import S from './style';
import BasicInput from '../../components/input/BasicInput';
import BasicButton from '../../components/button/BasicButton';
import Radio from '../../components/radio/Radio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarOfLife } from '@fortawesome/free-solid-svg-icons';
import SelectBox from '../../components/selectBox/SelectBox';
import FileUpload from '../../components/fileUpload/FileUpload';
import TextArea from '../../components/textArea/TextArea';

const Inquiry = () => {

      const [showPopup, setShowPopup] = useState(false);

    return (
        <S.InquiryWrapper>
            <SupportMenuComponent activeMenu="inquiry" />

            <div>
                <S.InquiryTitle>1:1 문의</S.InquiryTitle>
                <div>
                    <S.InquiryTitleBottom>
                        문의사항을 보내주시면 친절하게 답변하겠습니다. <br />
                        1:1문의를 주말에 남겨 주시는 고객님께는 평일 9:00 ~ 18:00 에 순차적으로 답변 드리도록 하겠습니다.
                    </S.InquiryTitleBottom>
                </div>
            </div>
            <S.InquiryBodyWrapper>
               <S.InquiryNameWrapper>
                   <S.InquiryCategory>
                     이름&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.NameInput>
                    <BasicInput placeholder="이름을 입력하세요" />
                   </S.NameInput>
               </S.InquiryNameWrapper>
               <S.InquiryPhoneWrapper>
                   <S.InquiryCategory>
                    연락처&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.InputsWrapper>
                    <S.SelectPhonStart>
                        <SelectBox options={["010", "011", "016", "017", "018", "019"]}/>
                    </S.SelectPhonStart>
                    <S.PhoneInput>
                        <BasicInput placeholder="" />
                    </S.PhoneInput>
                    <S.PhoneInput>
                        <BasicInput placeholder="" />
                    </S.PhoneInput>
                   </S.InputsWrapper>
               </S.InquiryPhoneWrapper>
               <S.InquiryEmailWrapper>
                   <S.InquiryCategory>이메일</S.InquiryCategory>
                   <S.InputsWrapper>
                    <BasicInput placeholder="이메일을 입력해주세요" />
                    <S.Email>@</S.Email>
                    <S.EmailSelectBox>
                     <SelectBox options={[
                        "naver.com", 
                        "gmail.com", 
                        "hanmail.net", 
                        "hotmail.com", 
                        "nate.com", 
                        "yahoo.com", 
                        "empas.com",
                        "dreamwiz.com", 
                        "freechal.com", 
                        "lycos.co.kr", 
                        "korea.com", 
                        "hanmir.com", 
                        "paran.com"
                        ]} />
                    </S.EmailSelectBox>
                   </S.InputsWrapper>
               </S.InquiryEmailWrapper>
               <S.InquiryQuestionCategoryWrapper>
                   <S.InquiryCategory>
                    문의유형&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.RadiosWrapper>
                    <Radio size='M' name={"category"} /><p>회원정보</p>
                    <Radio size='M' name={"category"} /><p>서비스</p>
                    <Radio size='M' name={"category"} /><p>상품</p>
                    <Radio size='M' name={"category"} /><p>기타</p>
                   </S.RadiosWrapper>
               </S.InquiryQuestionCategoryWrapper>
               <S.InquiryQuestionTitleWrapper>
                   <S.InquiryCategory>
                    제목&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                   <S.InputsWrapper>
                    <BasicInput placeholder="제목을 입력하세요" />
                   </S.InputsWrapper>
               </S.InquiryQuestionTitleWrapper>
               <S.InquiryQuestionBodyWrapper>
                   <S.InquiryCategory>
                    내용&nbsp;
                    <FontAwesomeIcon icon={faStarOfLife} style={{color: "#cf4b05", fontSize: "10px"}} />
                   </S.InquiryCategory>
                    <S.InputsWrapper>
                     <S.CharWrapper>
                      <S.InquiryBody>
                        <TextArea placeholder={"문의하실 내용을 입력하세요"} maxChars={"1000"} />
                      </S.InquiryBody>
                     </S.CharWrapper>
                    </S.InputsWrapper>
               </S.InquiryQuestionBodyWrapper>
               <S.InquiryFileWrapper>
                   <S.InquiryCategory>파일첨부</S.InquiryCategory>
                       <S.FileWrapper>
                        <S.FileInputButton>
                         {/* <S.FileInput>
                          <BasicInput readOnly/>
                         </S.FileInput> 
                         <BasicButton children={"찾아보기"} basicButton={"superSmall"} variant={"filled"} /> */}
                         <FileUpload/>
                        </S.FileInputButton>
                            <p>*파일은 최대 3 개 까지 등록이 가능하며, 용량은 총 50MB 이하로 첨부하여 주시기 바랍니다. <br/>
                             첨부 가능한 파일 확장자 : jpg,jpeg,gif,png,zip,doc,ppt,pptx,xls,xlsx,pdf,hwp</p>
                       </S.FileWrapper>
               </S.InquiryFileWrapper>
            </S.InquiryBodyWrapper>
         <S.InquiryButtonWrapper>
            <div>
             <BasicButton children={"취소"} variant={"gray"} basicButton={"medium"} />
             <BasicButton children={"저장"} variant={"default"} basicButton={"medium"} />
            </div>
         </S.InquiryButtonWrapper>
        </S.InquiryWrapper>
    );
};

export default Inquiry;