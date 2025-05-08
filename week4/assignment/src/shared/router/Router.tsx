import { createBrowserRouter } from "react-router-dom";
import SignUp from "../../pages/signup/SignUp";
import SignIn from "../../pages/signin/SignIn";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
