import { useContext, useEffect } from "react";
import NewProduct from "./NewProduct"
import { GeneralContext, RoleType } from "../../App";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
    const { user } = useContext(GeneralContext);
    const navigate=useNavigate();
    useEffect(()=>{
      if (user?.roleType !== RoleType.admin) {
        navigate('/'); 
        // return null; 
      }
    },[])
console.log(user?.roleType);
console.log(RoleType.admin);
    return (
        <div>
            <h1>Dashboard</h1>
            <NewProduct/>
           <Link to={'/dashboard/users'}><button>Users Management</button></Link> 
        </div>
    )
}

export default Dashboard
