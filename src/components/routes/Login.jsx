import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'primeicons/primeicons.css'
import './Signup.css'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Login() {
    const navigate = useNavigate();
    const [mismatchMessage, setMismatchMessage] = useState('')
    const [showPassword, setShowPassword] = useState({main: true});
    const [passwordMain, setPasswordMain] = useState('');

    const {t} = useTranslation();

    const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
        ...prev,
        [field]: !prev[field],
    }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = (e.target.email.value).toLowerCase()
        const passwordHash = passwordMain;
        const formData = {
            email, passwordHash
        }
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.post(`${apiUrl}/auth/login`, formData)
        .then(res => {
            console.log('User logged in:', res.data);
            localStorage.setItem('vireoAccessToken', res.data.token);
            navigate('/')
        }).catch(error => {
            console.error('Error during login:', error.response?.data || error.message)
        })
    }
    return(
        <div className="--container-auth-form">
            <div className="--container-header">
                <img src="/assets/brand/vireo-brand-green.png" alt="Vireo Logo with Green Bird and Name" draggable="false" />
            </div>
            <div className="--container-form">
                <h1>{t('formLogInTitle')}</h1>
                <form className="--form-content" onSubmit={handleSubmit}>
                    <div className="--form-input-container">
                        <label htmlFor="inp-email">{t('formEmail')}</label>
                        <div className="--form-input-style">
                            <input type="text" id="inp-email" name="email"placeholder="youremail@example.com"/>
                        </div>
                    </div>
                    <div className="--form-input-container">
                        <label htmlFor="inp-passwordHash">{t('formPassword')}</label>
                        <div className="--form-input-style">
                            <input type={showPassword.main? 'password' : 'text'} id="inp-passwordHash" name="passwordHash" className='--form-input' required aria-autocomplete='password' onChange={(e) => setPasswordMain(e.target.value)} style={{position: 'relative'}}/> 
                            <i className={`pi ${showPassword.main? 'pi-eye-slash' : 'pi-eye' }`} onClick={() => toggleVisibility('main')}/>
                        </div>
                    </div>
                    <div className="--form-input-container">
                        <button type="submit" className='--form-button'>{t('formLogin')}</button>
                    </div>
                    {setMismatchMessage && <p>{mismatchMessage}</p>}
                </form>
            </div>
            <div className="--container-footer">
                <p>&copy; 2025 Hanna. {t('footerCopyright')}</p>
            </div>
        </div>
    )
}

export default Login;