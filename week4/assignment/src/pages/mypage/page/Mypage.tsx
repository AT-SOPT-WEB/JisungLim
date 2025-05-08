import { Outlet } from "react-router-dom"
import Header from "../components/Header"

const Mypage = () => {
  return (
    <div className="">
      <Header />

      <main className="w-full h-full">
        <Outlet />
      </main>
    </div>
  )
}

export default Mypage
