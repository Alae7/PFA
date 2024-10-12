import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Login, Section, Register, ForgotPassword, NotFound, Hero, Product, SearchResults, ProductDetails, Cart, PaymentPage, Success, Main, WrappedMain, Sell, StartSell, Store, Failed } from "./component"
import { AuthProvider, GuardSuccess, PrivateRoutes, ScrollToTop, Toastify } from "./lib"



function App() {

  const [isPaymentComplete, setIsPaymentComplete] = useState(false);

  const handlePaymentCompletion = (status) => {
    if (status === 'success') {
      setIsPaymentComplete(true);
    } else {
      setIsPaymentComplete(false);
    }
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Section />}>
              <Route index element={<Hero />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="shop" element={<Product />} />
              <Route path="/shop/:id" element={<ProductDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment/:ordreid' element={<PaymentPage onPaymentComplete={handlePaymentCompletion} />} />
              <Route element={<GuardSuccess isPaymentComplete={isPaymentComplete} redirectTo="/payment" />}>
                <Route path="/success" element={<Success />} />
                <Route path="/failed" element={<Failed />} />
              </Route>
              <Route path='/store' element={<Store />} />
              <Route path='/sell' element={<Sell />} />
              <Route path='/startSell' element={<StartSell />} />
              <Route element={<PrivateRoutes allowedRoles={['admin']}/>}>
                <Route path='/admin' element={<Main />} />
              </Route>
              <Route element={<PrivateRoutes allowedRoles={['seller','user']}/>}>
                <Route path='/profile' element={<WrappedMain />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={< NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toastify />
    </>
  )
}

export default App
