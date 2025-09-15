import React, { useEffect, useState } from "react";
import S from "./style";
import { Link, useNavigate } from "react-router-dom";



const ITEMS_PER_PAGE = 10;

const List = () => {
  
 const [data, setData] = useState([])

 useEffect(() => {
   fetch(`${process.env.REACT_APP_BACKEND_URL}/inquiry/api/get-inquiry`)
   .then(response => response.json())
   .then(data => setData(data.data))
   .catch(error => console.error("문의글 불러오는 중 오류" + error))
 }, [])

 console.log(data.length)

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

 const getPageNumbers = () => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }
  if (currentPage >= totalPages - 2) {
    return [
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    ];
  }
  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2
  ];
 };
 
 const currentItems = data.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE,
 )

 const link = useNavigate("")
 
 const inquiryList = currentItems.map((item) => {
   
   const reply = item.reply_yn ? "답변완료" : "답변중"
   const date = item.created_at.slice(0, 10).split("-").join(".")
   const name = item.user_name.slice(0,1) + " * " + item.user_name.slice(2)
   const linkToDetail = () => {
    link(`/support/inquiry-detail/${item.inquiry_id}`)
   }

    return (
    <S.Data key={item.id}>
      <S.Author>{name}</S.Author>
      <S.Title onClick={linkToDetail}>{item.title}</S.Title>
      <S.Date>{date}</S.Date>
      <S.Reply>{reply}</S.Reply>
     </S.Data>
  )
 }
)


  return (
    <div>
      <S.ListWrapper>
        <tbody>
          {inquiryList}
        </tbody>
      </S.ListWrapper>

      <S.PaginattionWrapper>
       <button
         disabled={currentPage === 1}
         onClick={() => setCurrentPage(currentPage - 1)}
       >
         &lt;
       </button>

       {getPageNumbers().map((page) => (
         <button
           key={page}
           onClick={() => setCurrentPage(page)}
           disabled={page === currentPage}
           style={{
            color: page === currentPage ? "#CF4B05" : "black"
           }}
         >
           {page}
         </button>
       ))}

       <button
         disabled={currentPage === totalPages}
         onClick={() => setCurrentPage(currentPage + 1)}
       >
         &gt;
       </button>
     </S.PaginattionWrapper>
    </div>
  );
}

export default List;