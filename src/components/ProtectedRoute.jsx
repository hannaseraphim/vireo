import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = localStorage.getItem('vireoAccessToken');
    const [valid, setValid] = useState(null);

    useEffect(() => {
        if(!isAuthenticated) return setValid(false);
        axios.get('http://localhost:4000/users/me', {headers: { Authorization: `Bearer ${isAuthenticated}`}})
        .then(res => {if (res.data && res.data._id) {setValid(true);}else{localStorage.removeItem('vireoAccessToken');setValid(false);}})
        .catch(() => {localStorage.removeItem('vireoAccessToken');setValid(false);});
    }, [])

    if (valid === null) return <h1>Loading...</h1>
    if (!valid) return <Navigate to='/signup'/>;
    return children;
}

export default ProtectedRoute;