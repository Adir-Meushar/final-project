import { useContext } from 'react';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';
function Logout() {
    const{setUser,snackbar,user}=useContext(GeneralContext)
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        snackbar(`Until you Next Time ${user.firstName} 😁`)
        setUser(null)
        navigate('/')
        console.log(user);
    }
    return (
       <>
       <button className='nav-logout' onClick={logout}>Logout</button>
       </>
    )
}

export default Logout
