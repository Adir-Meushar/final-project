import { useContext } from "react";
import NewProduct from "./NewProduct"
import { GeneralContext, RoleType } from "../../App";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user } = useContext(GeneralContext);
    const navigate=useNavigate();
  if (!user || user.roleType !== RoleType.admin) {
    navigate('/'); 
    return null; 
  }
    return (
        <div>
            <h1>Dashboard</h1>
            <NewProduct/>
        </div>
    )
}

export default Dashboard
