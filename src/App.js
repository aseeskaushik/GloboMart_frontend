import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import ProductDetail from "./components/home/ProductDetail";
import RootLayout from "./components/layout/RootLayout";
import Products from "./components/product/products";
import LoginSignUp from "./components/user/LoginSignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser } from "./store/user-actions";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import ChangePassword from "./components/user/ChangePassword";
import Root from "./components/layout/Root";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
// import axios from "axios";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/orders/UserOrders";
import OrderDetails from "./components/orders/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrderList from "./components/admin/OrderList";
import UpdateOrderStatus from "./components/admin/UpdateOrderStatus";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/productReviews";
import About from "./components/layout/About";
import NotFound from "./components/layout/NotFound";

// let [stripeApiKey, setStripeApiKey] = [];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "",
        element: <RootLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "product/:id",
            element: <ProductDetail />,
          },
          {
            path: "products",
            element: <Products />,
          },
          // {
          //   path: "products/:keyword",
          //   element: <Products />,
          // },
          {
            path: "profile",
            element: <ProtectedRoute component={<Profile />} />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "order/me",
            element: <ProtectedRoute component={<UserOrders />} />,
          },
          {
            path: "order/:id",
            element: <ProtectedRoute component={<OrderDetails />} />,
          },
        ],
      },
      {
        path: "login",
        element: <LoginSignUp />,
      },
      {
        path: "me/update",
        element: <ProtectedRoute component={<UpdateProfile />} />,
      },
      {
        path: "password/update",
        element: <ProtectedRoute component={<ChangePassword />} />,
      },
      {
        path: "shipping",
        element: <ProtectedRoute component={<Shipping />} />,
      },
      {
        path: "order/confirm",
        element: <ProtectedRoute component={<ConfirmOrder />} />,
      },
      {
        path: "process/payment",
        element: (
          <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_API_KEY)}>
            <ProtectedRoute component={<Payment />} />
          </Elements>
        ),
      },
      {
        path: "success",
        element: <ProtectedRoute component={<OrderSuccess />} />,
      },
      {
        path: "admin/dashboard",
        element: <ProtectedRoute isAdmin={true} component={<Dashboard />} />,
      },
      {
        path: "admin/products",
        element: <ProtectedRoute isAdmin={true} component={<ProductList />} />,
      },
      {
        path: "admin/product",
        element: <ProtectedRoute isAdmin={true} component={<NewProduct />} />,
      },
      {
        path: "admin/product/:id",
        element: (
          <ProtectedRoute isAdmin={true} component={<UpdateProduct />} />
        ),
      },
      {
        path: "admin/orders",
        element: <ProtectedRoute isAdmin={true} component={<OrderList />} />,
      },
      {
        path: "admin/order/:id",
        element: (
          <ProtectedRoute isAdmin={true} component={<UpdateOrderStatus />} />
        ),
      },
      {
        path: "admin/users",
        element: <ProtectedRoute isAdmin={true} component={<UserList />} />,
      },
      {
        path: "admin/user/:id",
        element: <ProtectedRoute isAdmin={true} component={<UpdateUser />} />,
      },
      {
        path: "admin/reviews/product/:id",
        element: (
          <ProtectedRoute isAdmin={true} component={<ProductReviews />} />
        ),
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  // [stripeApiKey, setStripeApiKey] = useState("");

  // const getStripeApiKey = async () => {
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // };

  useEffect(() => {
    dispatch(loadUser());

    // getStripeApiKey();
  }, [dispatch]);

  return !loading && <RouterProvider router={router} />;
}

export default App;
