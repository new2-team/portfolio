import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import Calendar from "../pages/calendar/Calendar";
import CalendarDay from "../pages/calendar/CalendarDay";
import CalendarMonth from "../pages/calendar/CalendarMonth";
import Chatting from "../pages/chat/Chatting";
import Community from "../pages/community/Community";
import Layout from "../pages/layout/Layout";
import MyPage from "../pages/myPage/MyPage";
import AddHealthProfile from "../pages/profile/AddHealthProfile";
import AddProfile from "../pages/profile/AddProfile";
import Faq from "../pages/support/Faq";
import Inquiry from "../pages/support/Inquiry";
import DbtiQuestion from "../pages/dbti/DbtiQuestion";
import DbtiResult from "../pages/dbti/DbtiResult";
import Main from "../pages/main/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "main", element: <Main /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      // 프로필 관련
      {
        path: "profile",
        children: [
          { path: "add", element: <AddProfile /> },
          { path: "add-health", element: <AddHealthProfile /> },
        ],
      },
      // 캘린더 관련
      {
        path: "calendar",
        children: [
          { index: true, element: <Calendar /> },
          { path: "month", element: <CalendarMonth /> },
          // 캘린더 일정 상세
          { path: "day/:eventId", element: <CalendarDay /> },
        ],
      },
      // 커뮤니티 관련
      {
        path: "community",
        children: [
          { index: true, element: <Community /> },
        ],
      },
      // 마이페이지
      { path: "my-page", element: <MyPage /> },
      // DBTI
      { path: "dbti-question", element: <DbtiQuestion /> },
      { path: "dbti-result", element: <DbtiResult /> },
      // 채팅
      { path: "chatting", element: <Chatting /> },
      // 고객지원
      {
        path: "support",
        children: [
          { path: "faq", element: <Faq /> },
          { path: "customer-inquiry", element: <Inquiry /> },
        ],
      },
    ],
  },
]);

export default router;