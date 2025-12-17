import { Outlet } from "react-router-dom"

export default function Dashboard () {
  return(
    <main className="dashboard">
      <div className="dashboard__container">
        <Outlet/>
      </div>
    </main>
  )
}