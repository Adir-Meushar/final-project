import React, { useContext, useState } from "react";
import ProductsManagement from "./ProductManagement";
import UsersManagement from "./UsersManagement";
import AdminData from "./AdminData";
import './dashboard-tables.css'
import { GeneralContext } from "../../App";

function Dashboard() {
  const [display, setDisplay] = useState('prodcuts')
  const {isDarkMode,setSearch} = useContext(GeneralContext);

  return (
    <>
    <div className={`container-table ${isDarkMode ? 'dark' : ''}`}>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      <div className="display">
      <button className="dashboard-btn slide" onClick={() => {setDisplay('users'); setSearch('');}} > Users </button>
        <button className="dashboard-btn slide" onClick={() => setDisplay('prodcuts')}>Prodcuts </button>
        <button className="dashboard-btn slide" onClick={() => {setDisplay('admin-data'); setSearch('');}} > Summery </button>
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
      </div>
    </>
  )
}

export default Dashboard;
