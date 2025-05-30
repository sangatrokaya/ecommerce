import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
// import {dataLoader} from './pages/HomePage.jsx';
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { store } from "./store.js";
import ShippingPage from "./pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlaceOrderPage from "./pages/PlaceOrderPage.jsx";
import OrderPage from "./pages/Orderpage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrdersPage from "./pages/admin/OrdersPage.jsx";
import ProductsListPage from "./pages/admin/ProductsListPage.jsx";
import UserListPage from "./pages/admin/UserListPage.jsx";
import ProductEditPage from "./pages/admin/ProductEditPage.jsx";

/* // Setting up react routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
    ],
  },
]); */

// ALternative way to setting up react routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} /* loader={dataLoader} */ />
      <Route path="search/:keyword" element={<HomePage />} />
      <Route path="product/:id" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<LoginPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="shipping" element={<ShippingPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
        <Route path="order/:id" element={<OrderPage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="admin/orders" element={<OrdersPage />} />
        <Route path="admin/products" element={<ProductsListPage />} />
        <Route path="admin/product/:id/edit" element={<ProductEditPage />} />
        <Route path="admin/users" element={<UserListPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
