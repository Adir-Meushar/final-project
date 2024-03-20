import React, { useState } from "react";
import NewProduct from "./NewProduct";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement"; 
import AdminData from "./AdminData";

function Dashboard() {
  const [display, setDisplay] = useState('admin-data')
  return (
    <>
      <h1>Dashboard</h1>
      <NewProduct />
    
      <div className="display">
        <button onClick={() => setDisplay('users')} className={display === 'users' ? 'active' : ''}> Users Management</button>
        <button onClick={() => setDisplay('prodcuts')} className={display === 'prodcuts' ? 'active' : ''}>Prodcuts Management</button>
        <button onClick={() => setDisplay('admin-data')} className={display === 'admin-data' ? 'active' : ''}>Admin-Data </button>
      </div>

      {
        (() => {
          switch (display) {
            case 'users': return <UsersManagement />
            case 'prodcuts': return <ProductsManagement />
            case 'admin-data': return   <AdminData />
          }
        })()
      }
    </>
  )
}

export default Dashboard;
