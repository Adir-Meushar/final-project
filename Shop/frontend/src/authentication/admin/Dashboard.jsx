import React, { useState } from "react";
import NewProduct from "./NewProduct";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement"; // Import the UsersManagement component
import AdminData from "./AdminData";

function Dashboard() {
 
  const [showProductsManagement, setShowProductsManagement] = useState(false);
  const [showUsersManagement, setShowUsersManagement] = useState(false); // State for user management

  return (
    <div>
      <h1>Dashboard</h1>
      <NewProduct />
      <AdminData/>
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
