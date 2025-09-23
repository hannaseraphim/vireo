import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({children}) => {
    const [valid, setValid] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        axios.get(`${apiUrl}/users/me`, {withCredentials: true})
        .then(res => {if (res.data && res.data._id) {setValid(true);}else{setValid(false);}})
        .catch(() => {setValid(false);});
    }, [])

    if (valid === null) return <h1>Loading...</h1>
    if (!valid) return <Navigate to='/login'/>;
    return children;
}

export default ProtectedRoute;