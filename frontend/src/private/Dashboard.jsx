import { Outlet } from "react-router-dom"

export default function Dashboard () {
  return(
    <main className="dashboard">
      <div className="dashboard__container">
        {/* <h2 className="dashboard__text">Hola</h2> */}
        <Outlet/>
      </div>
    </main>
  )
}