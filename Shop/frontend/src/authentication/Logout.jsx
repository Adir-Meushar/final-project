import { useContext } from 'react';
import { GeneralContext } from '../App';
function Logout() {
    const{setUser,snackbar}=useContext(GeneralContext)

    const logout=()=>{
        localStorage.clear();
        setUser(null)
        snackbar('Until you Next Time 😁')
    }
    return (
       <>
       <button className='nav-logout' onClick={logout}>Logout</button>
       </>
    )
}

export default Logout
