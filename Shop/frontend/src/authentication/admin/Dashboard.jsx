import React, { useState } from "react";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement";
import AdminData from "./AdminData";
import './dashboard-tables.css'

function Dashboard() {
  const [display, setDisplay] = useState('prodcuts')
  return (
    <>
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
