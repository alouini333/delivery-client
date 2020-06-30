import LoginPage from "./containers/Login";
import SignUpPage from "./containers/SignUp";
import ErrorPage from "./containers/Error";

const routes = [
  {
    path: "/signup",
    exact: true,
    component: SignUpPage,
  },
  {
    path: "/login",
    exact: true,
    component: LoginPage,
  },
  {
    path: "",
    exact: false,
    component: ErrorPage,
  },
];

export default routes;
