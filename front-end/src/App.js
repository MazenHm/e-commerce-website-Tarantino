import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./pages/ProductDetails";
import "./styles/global.css";
import PageContainer from "./layout/PageContainer";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AboutUs from "./pages/AboutUs";
import CartProvider from "./context/cart/cartProvider";
import AuthProvider from "./context/auth/authProvider";
import NewArrivals from "./pages/NewArrivals";
import AllPosters from "./pages/AllPosters";
import LogoutSuccess from "./pages/logoutSuccess";
import Frames from "./pages/Frames";
import WishListProvider from "./context/wishList/wishListProvider";
import Account from "./pages/Account";
import AccountEdit from "./modules/AccountEdit";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/auth/authContext";
import { useEffect } from "react";

function PrivateRoute(props) {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    let isConnected = localStorage.getItem("connect");
    if (!isConnected) {
      navigate("/signin");
    }
  }, [JSON.stringify(auth.user)]);

  if (auth.user) {
    return props.element;
  }
}

function PublicRoute(props) {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    let isConnected = localStorage.getItem("connect");
    if (isConnected) {
      navigate("/");
    }
  }, [JSON.stringify(auth.user)]);

  if (!auth.user) {
    return props.element;
  }
}

function Routers() {
  return (
    <>
      {/* <ProductDetails/> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageContainer isHidden={false}>
                <HomePage />
              </PageContainer>
            }
          />
          <Route
            path="checkout"
            element={
              <PageContainer isHidden={true}>
                <CheckOut />
              </PageContainer>
            }
          />
          <Route
            path="signin"
            element={
              <PublicRoute
                element={
                  <PageContainer isHidden={false}>
                    <SignIn />
                  </PageContainer>
                }
              />
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute
                element={
                  <PageContainer isHidden={false}>
                    <SignUp />
                  </PageContainer>
                }
              />
            }
          />
          <Route
            path="about-tarantino"
            element={
              <PageContainer isHidden={false}>
                <AboutUs />
              </PageContainer>
            }
          />
          <Route
            path="account"
            element={
              <PrivateRoute
                element={
                  <PageContainer isHidden={false}>
                    <Account />
                  </PageContainer>
                }
              />
            }
          />
          <Route
            path="account/edit"
            element={
              <PrivateRoute
                element={
                  <PageContainer isHidden={false}>
                    <AccountEdit />
                  </PageContainer>
                }
              />
            }
          />
          <Route
            path="product/:id"
            element={
              <PageContainer isHidden={false}>
                <ProductDetails />
              </PageContainer>
            }
          />
          <Route
            path="checkout"
            element={
              <PageContainer isHidden={false}>
                <CheckOut />
              </PageContainer>
            }
          />
          <Route
            path="news"
            element={
              <PageContainer isHidden={false}>
                <NewArrivals />
              </PageContainer>
            }
          />
          <Route
            path="all-posters"
            element={
              <PageContainer isHidden={false}>
                <AllPosters />
              </PageContainer>
            }
          />
          <Route
            path="frames"
            element={
              <PageContainer isHidden={false}>
                <Frames />
              </PageContainer>
            }
          />
          <Route
            path="signout/success"
            element={
              <PageContainer isHidden={false}>
                <LogoutSuccess />
              </PageContainer>
            }
          />

          <Route
            path="*"
            element={
              <PageContainer isHidden={false}>
                <NotFound />
              </PageContainer>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishListProvider>
          <Routers />
        </WishListProvider>
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
