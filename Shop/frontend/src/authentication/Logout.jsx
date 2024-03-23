import { useContext } from 'react';
import { GeneralContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { setUser, snackbar, user, setLoader } = useContext(GeneralContext)
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        setLoader(true)
        snackbar(`Until Next Time ${user.firstName} 😁`)
        setUser(null)
        navigate('/')
        setTimeout(() => {
            setLoader(false)
        }, 500)
    }

    return (
        <>
            <div onClick={logout} class="icon icon-collapse"><i class="fa fa-sign-in"></i></div>
        </>
    )
}

export default Logout;
