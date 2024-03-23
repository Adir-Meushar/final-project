import { Route, Routes } from 'react-router-dom';
import Vegetables from '../products/category/Vegetables';
import Fruits from '../products/category/Fruits';
import Products from '../products/category/AllProducts';
import Dashboard from '../../authentication/admin/Dashboard';
import Bakery from '../products/category/Bakery';
import Checkout from '../checkout/Checkout';
import DairyAndEggs from '../products/category/Dairy&Eggs';
import MyAccount from '../../authentication/user/MyAccount';
import { GeneralContext } from '../../App';
import { useContext } from 'react';
import About from '../pages/about/About';
import ErrorPage from '../pages/error-page/ErrorPage';


export default function Router() {
    const { user } = useContext(GeneralContext);

    return (
        <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/about" element={<About />} />
            {user ? <Route path="/my-account" element={<MyAccount />} /> : ''}
            {user ? <Route path="/dashboard" element={<Dashboard />} /> : ''}
            <Route path="/vegetables" element={<Vegetables />} />
            <Route path="/fruits" element={<Fruits />} />
            <Route path="/bakery" element={<Bakery />} />
            <Route path="/dairy&egss" element={<DairyAndEggs />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<ErrorPage />}/>
        </Routes>
    )
}