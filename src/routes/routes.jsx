import { Route, Routes } from "react-router"
import Dashboard from "../pages/dashboard/Dashboard"
import Home from "../pages/Home/Home"
import PrivetRoute from "./PrivetRoute"
import ErrorPage from "../error-page"


const AllRoutes = ()=>{
    return (
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route
            path='dashboard'
            element={
              <PrivetRoute>
                <Dashboard />
              </PrivetRoute>
            }
          />
        <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    );
}
export default AllRoutes