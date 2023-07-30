import MiniCart from "../modules/MiniCart";
import "../p1.jpg";
import { useCart } from "../context/cart/cartContext";
import { useWishList } from "../context/wishList/wishListContext";
import WishList from "../modules/WishList";
import { useAuth } from "../context/auth/authContext";
import { Link } from "react-router-dom";
const NavbarDefault = () => {
  const ecommerce = useCart();
  const wishList = useWishList();
  const auth = useAuth();

  const showDrawer = () => {
    ecommerce.toggel();
  };
  const onClose = () => {
    ecommerce.toggel(true);
  };

  const showDrawerr = () => {
    wishList.toggelList();
  };
  const onClosee = () => {
    wishList.toggelList(true);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <a className="m-4 d-inline-block align-top" href="/">
          <img src="/assets/img/tarantino_logo.png" height="25" alt="Logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#homenavbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/news">
                NEW ARRIVALS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/all-posters">
                POSTERS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/frames">
                FRAMES
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#home">
                INSPIRATION
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#home">
                OUR WORLD
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#home">
                OUTLET
              </a>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link">
              <img
                src="/assets/nav/search-icon.webp"
                height="18"
                width="20"
                alt="search"
              />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={showDrawerr}>
              <img
                src="/assets/nav/heart-icon.png"
                height="18"
                width="20"
                alt="wishlist"
              />
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={auth.user ? "/account" : "/signin"}>
              <i class="far fa-user"></i>
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={showDrawer}>
              <img
                src="/assets/nav/167787.png"
                height="18"
                width="20"
                alt="cart"
              />
            </a>
          </li>
        </ul>
      </nav>
      <WishList open={wishList.toggleWishList} onClose={onClosee} />
      <MiniCart open={ecommerce.toggleCart} onClose={onClose} />
    </div>
  );
};

export default NavbarDefault;
