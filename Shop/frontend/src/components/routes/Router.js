import { Route, Routes } from 'react-router-dom';
import Vegetables from '../products/category/Vegetables';
import Fruits from '../products/category/Fruits';
import Products from '../products/category/AllProducts';
import Dashboard from '../../authentication/admin/Dashboard';
import Bakery from '../products/category/Bakery';
import Checkout from '../checkout/Checkout';
import DairyAndEggs from '../products/category/Dairy&Eggs';
import MyAccount from '../../authentication/user/MyAccount';


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Products />}/>
            <Route path="/my-account" element={<MyAccount />}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/vegetables" element={<Vegetables/>} />
            <Route path="/fruits" element={<Fruits/>} />
            <Route path="/bakery" element={<Bakery/>} />
            <Route path="/dairy&egss" element={<DairyAndEggs/>} />
            <Route path="/checkout" element={<Checkout/>} />
        </Routes>
    )
}