import React, { useState } from "react";
import NewProduct from "./NewProduct";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement"; 
import AdminData from "./AdminData";

function Dashboard() {
  const [display, setDisplay] = useState('users')
  return (
    <>
      <h1>Dashboard</h1>
      <NewProduct />
      <AdminData />
      <div className="display">
        <button onClick={() => setDisplay('users')} className={display === 'users' ? 'active' : ''}> Users Management</button>
        <button onClick={() => setDisplay('prodcuts')} className={display === 'prodcuts' ? 'active' : ''}>Prodcuts Management</button>
      </div>

      {
        (() => {
          switch (display) {
            case 'users': return <UsersManagement />
            case 'prodcuts': return <ProductsManagement />
          }
        })()
      }
    </>
  )
}

export default Dashboard;
