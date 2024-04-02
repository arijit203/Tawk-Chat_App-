import { Suspense, lazy } from "react"; //in order for Suspense to work it has to be dynamic loasding so lazy is used
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* //display a react component until loaded and a LoadingScreen Component otherwise as fallback  */}
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <MainLayout />,
      children: [
        { path:"login",element: <LoginPage/> },
        {path:"register",element: <RegisterPage/> },
        {path:"reset-password",element: <ResetPasswordPage/> },
        {path:"new-password",element: <NewPasswordPage/> },
        {path:"verify",element: <VerifyPage/> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        {path:"group",element:<GroupPage/>},
        {path:"call",element:<CallPage/>},
        {path:"profile",element:<ProfilePage/>},
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);

const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);

const LoginPage = Loadable(
  lazy(() => import("../pages/auth/Login")),
);
const RegisterPage = Loadable(
  lazy(() => import("../pages/auth/Register")),
);

const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);

const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);

const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);


const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword")),
);


const VerifyPage = Loadable(
  lazy(() => import("../pages/auth/Verify")),
);



const Page404 = Loadable(lazy(() => import("../pages/Page404")));
