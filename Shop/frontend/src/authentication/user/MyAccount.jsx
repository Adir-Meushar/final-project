import EditUser from "./EditUser"
import UserOrders from "./UserOrders"
import './my-account.css'

function MyAccount() {
    return (
        <> 
        <h1>User Account</h1>
        <div className="user-account">
            <EditUser />
            <UserOrders/>
        </div>
        </>

    )
}

export default MyAccount
