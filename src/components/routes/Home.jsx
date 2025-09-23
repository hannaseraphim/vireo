import axios from 'axios';
import { useState, useEffect } from 'react';

function Home() {
    const [nickName, setNickName] = useState('');

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

    return(
        <div className="h1">Welcome, {nickName}</div>
    )
}

export default Home;