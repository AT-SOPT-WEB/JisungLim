import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../pages/signup/page/SignUp";
import SignIn from "../../pages/signin/SignIn";
import Mypage from "../../pages/mypage/page/Mypage";
import Info from "../../pages/mypage/page/Info";
import Search from "../../pages/mypage/page/Search";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/mypage",
    element: <Mypage />, // 공통 헤더 포함하는 부모
    children: [
        { path: "info", element: <Info />},
        { path: "search", element: <Search />}
    ]
  }
]);

export default router;
