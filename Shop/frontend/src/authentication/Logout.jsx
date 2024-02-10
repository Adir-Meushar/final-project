import { useContext } from 'react';
import { GeneralContext } from '../App';
function Logout() {
    const{setUser}=useContext(GeneralContext)

    const logout=()=>{
        localStorage.clear();
        setUser(null)
    }
    return (
       <>
       <button onClick={logout}>Logout</button>
       </>
    )
}

export default Logout
