import { Route, Routes } from 'react-router-dom';
import Vegetables from '../products/category/Vegetables';
import Fruits from '../products/category/Fruits';
import Products from '../products/category/AllProducts';
import Dashboard from '../../authentication/admin/Dashboard';
import Bakery from '../products/category/Bakery';
import UsersManagement from '../../authentication/admin/UsersManagement';


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Products />}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/users" element={<UsersManagement/>}/>
            <Route path="/vegetables" element={<Vegetables/>} />
            <Route path="/fruits" element={<Fruits/>} />
            <Route path="/bakery" element={<Bakery/>} />
           
        </Routes>
    )
}