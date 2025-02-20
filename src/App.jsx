import { Route, Router, Routes } from "react-router";
import AuthButtons from "./components/AuthButtons";
import PrivetRoute from "./routes/PrivetRoute";
import Dashboard from "./pages/dashboard/Dashboard";



function App() {
// const {user, setUser, loading, setLoading, loginWithGoogle} = useAuth();


  return (
    <Router>
      <div className='container mx-auto p-4'>
        <h1 className='text-center text-3xl font-bold'>Task Manager</h1>
        <AuthButtons />
        <Routes>
          <Route
            path='/dashboard'
            element={
              <PrivetRoute>
                <Dashboard />
              </PrivetRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App
