import { Routes, Route } from "react-router-dom";

import { UserProvider } from "./context/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./components/Private/PrivateRoutes";

import { Suspense, lazy } from "react";
import Loader from "./components/Layout/Loader";
const Login = lazy(() => import("./components/User/Login"));
const Home = lazy(() => import("./components/Home/Home"));
const Roles = lazy(() => import("./components/Roles/Roles"));
const AdminUser = lazy(() => import("./components/AdminUser/AdminUser"));
const CreateRole = lazy(() => import("./components/Roles/CreateRole"));
const UpdateRole = lazy(() => import("./components/Roles/UpdateRole"));
const CreateUser = lazy(() => import("./components/AdminUser/CreateUser"));
const UpdateUser = lazy(() => import("./components/AdminUser/UpdateUser"));
function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <ToastContainer />
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/create" element={<CreateRole />} />
              <Route path="/roles/update/:rid" element={<UpdateRole />} />
              <Route path="/users" element={<AdminUser />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/update/:uid" element={<UpdateUser />} />
            </Route>
          </Routes>
        </UserProvider>
      </Suspense>
    </>
  );
}

export default App;
