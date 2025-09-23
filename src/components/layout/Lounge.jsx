import { useState, useEffect } from "react";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

function Lounge() {
    const [nickName, setNickName] = useState('');
    const {t} = useTranslation();
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await axios.post(`${apiUrl}/auth/logout`, {}, {withCredentials: true})
            navigate('/login')
        } catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const apiUrl = import.meta.env.VITE_API_URL
                
                const res = await axios.get(`${apiUrl}/users/me`, {withCredentials: true});
                setNickName(res.data.nickName);
                let userTheme = res.data.preferedTheme || 'dark'
                document.documentElement.setAttribute('data-theme', userTheme)
            } catch(err) {
                console.error('Error while searching for user:', err.response?.data || err.message);
            }
        }
        fetchUser();
    }, [])

    return (
        <div className="--grid-lounge">
            <h1>{t('welcomeMessage', {user: nickName})}!</h1>
            <p>{t('howsGoingToday')}</p>
            <button className="lounge-logoff-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}


export default Lounge;

