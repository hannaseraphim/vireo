import axios from 'axios';
import { useState, useEffect } from 'react';

function Home() {
    const [nickName, setNickName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const token = localStorage.getItem('vireoAccessToken');
                if(!token) return;

                const res = await axios.get('http://localhost:4000/users/me', {
                    headers: { Authorization: `Bearer ${token}`}
                });

                setNickName(res.data.nickName);
                localStorage.setItem('vireoPreferedTheme', res.data.preferedTheme)
                let userTheme = localStorage.getItem('vireoPreferedTheme')
                document.documentElement.setAttribute('data-theme', userTheme || 'dark')
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