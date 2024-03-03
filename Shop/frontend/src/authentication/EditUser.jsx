import { useContext } from "react"
import { GeneralContext } from "../App"

function EditUser() {
    const { user } = useContext(GeneralContext)

    return (
        <div>
            <button className="nav-account">{user.firstName}</button>
        </div>
    )
}

export default EditUser
