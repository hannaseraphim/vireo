import { Navigate } from "react-router-dom";

const PublicRoute = ({children}) => {
    const token = localStorage.getItem('vireoAccessToken');
    return token ? <Navigate to="/"/>  : children
}

export default PublicRoute;