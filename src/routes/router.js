import { createBrowserRouter } from "react-router-dom";
import AcceptTerms from "../pages/auth/AcceptTerms";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import SignUpComplete from "../pages/auth/SignUpComplete";
import Calendar from "../pages/calendar/Calendar";
import CalendarDay from "../pages/calendar/CalendarDay";
import CalendarMonth from "../pages/calendar/CalendarMonth";
import Chatting from "../pages/chat/Chatting";
import Community from "../pages/community/Community";
import DbtiQuestion from "../pages/dbti/DbtiQuestion";
import DbtiResult from "../pages/dbti/DbtiResult";
import Layout from "../pages/layout/Layout";
import Main from "../pages/main/Main";
import Matching from "../pages/matching/Matching";
import MyPage from "../pages/myPage/MyPage";
import AddHealthProfile from "../pages/profile/AddHealthProfile";
import AddProfile from "../pages/profile/AddProfile";
import Faq from "../pages/support/Faq";
import Inquiry from "../pages/support/Inquiry";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Layout />,
        children: [
            // 지우
            { path: "main", element: <Main /> }, // 메인
            { path: "matching", element: <Matching /> }, // 강아지 매칭화면

            // 선희
            { path: "sign-in", element: <SignIn /> }, // 로그인
            { path: "sign-up", element: <SignUp /> }, // 회원가입
            { path: "accept-terms", element: <AcceptTerms /> }, // 회원가입 약관동의
            { path: "sign-up-complete", element: <SignUpComplete /> }, // 회원가입 완료

            // 희진
            { path: "add-profile", element: <AddProfile /> }, // 강아지 프로필 등록
            { path: "add-health-profile", element: <AddHealthProfile /> }, // 강아지 건강정보

            // 승보
            { path: "dbti-question", element: <DbtiQuestion /> }, // DBTI퀴즈
            { path: "dbti-result", element: <DbtiResult /> }, // DBTI 결과

            // 준재
            { path: "my-page", element: <MyPage /> }, // 마이페이지

            // 유진
            { path: "community", element: <Community /> }, // 커뮤니티

            // 민주
            { path: "chatting", element: <Chatting /> }, // 채팅
            { path: "calendar", element: <Calendar /> }, // 캘린더 메인
            { path: "calendar-month", element: <CalendarMonth /> }, // 캘린더 월별
            { path: "calendar-day/:eventId", element: <CalendarDay /> }, // 캘린더 일별

            // 지우
            { path: "faq", element: <Faq /> }, // Faq
            { path: "customer-inquiry", element: <Inquiry /> }, // 1:1 문의
        ]
    }
])

export default router;