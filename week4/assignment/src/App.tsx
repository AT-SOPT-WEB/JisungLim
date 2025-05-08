import "../src/shared/styles/global.css";
import "../src/shared/styles/index.css";
import router from "./shared/router/Router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
