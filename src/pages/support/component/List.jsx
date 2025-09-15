import React, { useEffect, useState } from "react";
import S from "./style";
import { Link } from "react-router-dom";

// const data = Array.from({ length: 1234 }, (_, i) => ({
//   id: i + 1,
//   title: `멍픽 관련해서 문의 드립니다 ${i + 1}`,
//   author: "홍 * 동",
//   date: "2025.07.29",
//   category: i % 2 === 0 ? "답변중" : "답변완료"
// }));




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
  console.log(data.length)

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
// .map((item) => {
//   item.created_at.split(10)
//   console.log(item.created_at)
//  })

  return (
    <div>
      <S.ListWrapper>
        <tbody>
          {currentItems.map((item) => (
            <S.Data key={item.id}>
              <S.Author>{item.user_id}</S.Author>
              <Link to={"/support/inquiry-detail"} >
               <S.Title>{item.title}</S.Title>
              </Link>
              <S.Date>{item.created_at}</S.Date>
              <S.Reply>{item.category}</S.Reply>
            </S.Data>
          ))}
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