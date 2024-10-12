import SectionWrapper from "./SectionWrapper.tsx";
import RateUI from "./rate/RateUI.tsx";
import RateAd from "./rate/RateAd.tsx";
import RateReview from "./rate/RateReview.tsx";
import ScrollTop from "./scroll/ScrollTop.tsx";
import CarouselProduct from "./carousel-product/CarouselProduct.tsx";
import ShopCart from "./shop-cart/ShopCart.tsx";
import { CartContext } from "./shop-cart/CartContext.tsx";
import CanvasConfetti from "./canvas/CanvasConfetti.tsx";
import GuardSuccess from "./guard/GuardSuccess.tsx";
import NavAdmin from "./Nav/NavAdmin.tsx";
import SellProduct from "./add-product/SellProduct.tsx";
import ActiveSection from "./ActiveSection.tsx";
import ScrollToTop from "./scroll-to-top/ScrollToTop.tsx";
import { SearchProvider, useSearchContext } from "./search-bar/SearchProvider.tsx";
import { CartProvider } from "./shop-cart/CartContext.tsx";
import Toastify from "./toastify/Toastify.tsx";
import { Notify, ErrorNotify, LoadingNotify } from "./toastify/Toastify.tsx";
import PayButton from "./pay-button/PayButton.tsx";
import { AuthProvider, useAuth } from "./authContext/AuthContext.tsx";
import PrivateRoutes from "./guard/PrivateRoutes .tsx";
import Pagination from "./pagination/Pagination.tsx";
import Loading from "./loading/Loading.tsx";
import usePagination from "./pagination/usePagination.ts";
import useSold from "./solde/useSold.ts";


export { SectionWrapper, RateUI,RateAd,RateReview, ScrollTop, CarouselProduct, ShopCart, CartContext,AuthProvider, useAuth, CanvasConfetti, GuardSuccess, NavAdmin, SellProduct, ActiveSection, ScrollToTop, SearchProvider, useSearchContext, CartProvider, Toastify, Notify, ErrorNotify, LoadingNotify, PayButton, PrivateRoutes, Pagination, usePagination, Loading, useSold };