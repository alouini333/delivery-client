import HomePage from "./containers/Menu";
import LoginPage from "./containers/Login";
import SignUpPage from "./containers/SignUp";
import MenuPage from "./containers/Menu";
import CheckoutPage from "./containers/Checkout";
import OrdersPage from "./containers/Orders";
import ErrorPage from "./containers/Error";
import Success from "./containers/OrderSuccess";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
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
    path: "/menu",
    exact: true,
    component: MenuPage,
  },
  {
    path: "/checkout",
    exact: true,
    component: CheckoutPage,
  },
  {
    path: "/orders",
    exact: true,
    component: OrdersPage,
  },
  {
    path: "/success",
    exact: true,
    component: Success,
  },
  {
    path: "",
    exact: false,
    component: ErrorPage,
  },
];

export default routes;
