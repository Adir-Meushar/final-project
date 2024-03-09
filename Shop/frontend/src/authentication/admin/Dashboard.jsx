import React, { useContext, useEffect, useState } from "react";
import NewProduct from "./NewProduct";
import { GeneralContext, RoleType } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement"; // Import the UsersManagement component

function Dashboard() {
  const { user } = useContext(GeneralContext);
  const navigate = useNavigate();
  const [showProductsManagement, setShowProductsManagement] = useState(false);
  const [showUsersManagement, setShowUsersManagement] = useState(false); // State for user management

  useEffect(() => {
    if (user?.roleType !== RoleType.admin) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <NewProduct />
      <div>
        <button onClick={() => { setShowUsersManagement(true); setShowProductsManagement(false); }}>
          Users Management
        </button>
        
        <button onClick={() => { setShowProductsManagement(true); setShowUsersManagement(false); }}>
          Products Management
        </button>
      </div>

      {showUsersManagement && <UsersManagement />}
      
      {showProductsManagement && <ProductsManagement />}
    </div>
  );
}

export default Dashboard;
