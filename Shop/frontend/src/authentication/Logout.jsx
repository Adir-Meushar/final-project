import { useContext } from 'react';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';
function Logout() {
    const{setUser,snackbar,user,setLoader}=useContext(GeneralContext)
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        setLoader(true)
        snackbar(`Until Next Time ${user.firstName} 😁`)
        setUser(null)
        navigate('/')
        setTimeout(()=>{
            setLoader(false)
          },500)
     }
    return (
       <>
       <button className='nav-logout' onClick={logout}>Logout</button>
       </>
    )
}

export default Logout;
