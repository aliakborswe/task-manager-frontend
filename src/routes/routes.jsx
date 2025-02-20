import { Route, Routes } from "react-router"
import Home from "../pages/Home/Home"
import PrivetRoute from "./PrivetRoute"
import ErrorPage from "../error-page"
import AddTask from "../components/AddTask"
import MainLayout from "../layout/MainLayout"


const AllRoutes = ()=>{
    return (
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route
            index
            element={
              <PrivetRoute>
                <Home />
              </PrivetRoute>
            }
          />
          <Route
            path='add-task'
            element={
              <PrivetRoute>
                <AddTask />
              </PrivetRoute>
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    );
}
export default AllRoutes