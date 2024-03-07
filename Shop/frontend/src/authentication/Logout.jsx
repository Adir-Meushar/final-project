import { useContext } from 'react';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';
function Logout() {
    const{setUser,snackbar}=useContext(GeneralContext)
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.clear();
        setUser(null)
        navigate('/')
        snackbar('Until you Next Time 😁')
    }
    return (
       <>
       <button className='nav-logout' onClick={logout}>Logout</button>
       </>
    )
}

export default Logout
