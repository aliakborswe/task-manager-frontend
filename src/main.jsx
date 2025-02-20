import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AuthProvider from "./providers/AuthProvider.jsx";
import AllRoutes from "./routes/routes.jsx";
import { BrowserRouter } from "react-router";
import TaskProvider from "./providers/TaskProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <TaskProvider>
          <AllRoutes />
          <ToastContainer position='top-right' autoClose={3000} />
        </TaskProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
