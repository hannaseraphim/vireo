import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'primeicons/primeicons.css'
import './Signup.css'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Signup() {
    const navigate = useNavigate();
    const [mismatchMessage, setMismatchMessage] = useState('')
    const [showPassword, setShowPassword] = useState({
    main: true,
    confirm: true,
    });
    const [passwordMain, setPasswordMain] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const {t} = useTranslation();

    const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
        ...prev,
        [field]: !prev[field],
    }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(passwordMain !== passwordConfirm) {setMismatchMessage('The passwords are not the same');return;}

        const accountName = (e.target.accountName.value).toLowerCase()
        const nickName = accountName
        const email = (e.target.email.value).toLowerCase()
        const passwordHash = passwordMain;
        const formData = {
            accountName, nickName, email, passwordHash
        }
        const apiUrl = import.meta.env.VITE_API_URL;
        axios.post(`${apiUrl}/auth/signup`, formData)
        .then(res => {
            console.log('User sent to database:', res.data);
            localStorage.setItem('vireoAccessToken', res.data.token);
            navigate('/')
        }).catch(error => {
            const msg = error.response?.data?.message
            if(msg === 'USERNAME_EXISTS') {
                setMismatchMessage(t('errorUserInUse'))
            } else if (msg === 'EMAIL_EXISTS') {
                setMismatchMessage(t('errorEmailInUse'))
            } else {
                setMismatchMessage(t('errorInternalError'))
            }
        })
    }
    return(
        <div className="--container-auth-form">
            <div className="--container-header">
                <img src="/assets/brand/vireo-brand-green.png" alt="Vireo Logo with Green Bird and Name" draggable="false" />
            </div>
            <div className="--container-form">
                <h1>{t('formSignUpTitle')}</h1>
                <form className="--form-content" onSubmit={handleSubmit}>



                    <div className="--form-input-container">
                        <label htmlFor="inp-accountName">{t('formUserName')}</label>
                        <div className="--form-input-style">
                            <input type="text" id="inp-accountName" name="accountName" required/>
                        </div>
                    </div>
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
                        <label htmlFor="inp-passwordHashConfirm">{t('formConfirmPassword')}</label>
                        <div className="--form-input-style">
                            <input type={showPassword.confirm? 'password' : 'text'} id="inp-passwordHashConfirm" name="passwordHashConfirm" className='--form-pass' required aria-autocomplete='password' onChange={(e) => setPasswordConfirm(e.target.value)}/> 
                            <i className={`pi ${showPassword.confirm? 'pi-eye-slash' : 'pi-eye'}`} onClick={() => toggleVisibility('confirm')}/>
                        </div>
                    </div>
                    <div className="--form-input-container">
                        <button type="submit" className='--form-button'>{t('formCreateAccount')}</button>
                    </div>
                    {setMismatchMessage && <p>{mismatchMessage}</p>}
                </form>
                <div className="--form-links">
                    <a href="/login">{t('formLogInTitle')}</a>
                    <a href="/forgot-password">{t('formForgotPassword')}</a>
                </div>
            </div>
            <div className="--container-footer">
                <p>&copy; 2025 Hanna. {t('footerCopyright')}</p>
            </div>
        </div>
    )
}

export default Signup;