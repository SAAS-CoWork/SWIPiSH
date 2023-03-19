import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import Checkout from './pages/Checkout/Checkout';
import Home from './pages/Home/Home';
import ThankYou from './pages/ThankYou/ThankYou';
import Product from './pages/Product/Product';
import Profile from './pages/Profile/Profile';
import FavProducts from './pages/FavProducts/FavProducts';
import OrderStatus from './pages/OrderStatus/OrderStatus';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import SubscriptionAd from './pages/Subscription/SubscriptionAd';
import Subscription from './pages/Subscription/Subscription';
import Swipe from './pages/Swipe/Swipe';
import Quiz from './pages/Quiz/Quiz';
import Swipttest from './pages/Swipe/Swipttest';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='products/:id' element={<Product />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='thankyou' element={<ThankYou />} />
        <Route path='profile' element={<Profile />} />
        <Route path='favproducts' element={<FavProducts />} />
        <Route path='orderStatus' element={<OrderStatus />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='subscription/ad' element={<SubscriptionAd />} />
        <Route path='subscription' element={<Subscription />} />
        <Route path='swipe' element={<Swipe />} />
        <Route path='quiz' element={<Quiz />} />
        <Route path='swipttest' element={<Swipttest />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);


