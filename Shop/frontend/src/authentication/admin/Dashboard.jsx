import React, { useState } from "react";
import NewProduct from "./NewProduct";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement";
import AdminData from "./AdminData";

function Dashboard() {
  const [display, setDisplay] = useState('admin-data')
  return (
    <>
      <NewProduct />
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      <div className="display">
        <button className="dashboard-btn slide" onClick={() => setDisplay('users')} > Users </button>
        <button className="dashboard-btn slide" onClick={() => setDisplay('prodcuts')}>Prodcuts </button>
        <button className="dashboard-btn slide" onClick={() => setDisplay('admin-data')} >Summary </button>
      </div>

      </div>
   
      {
        (() => {
          switch (display) {
            case 'users': return <UsersManagement />
            case 'prodcuts': return <ProductsManagement />
            case 'admin-data': return <AdminData />
          }
        })()
      }
    </>
  )
}

export default Dashboard;
