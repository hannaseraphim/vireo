import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import 'primeicons/primeicons.css'
import './Signup.css'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Login() {
    const navigate = useNavigate();
    const [mismatchMessage, setMismatchMessage] = useState(null)
    const [showPassword, setShowPassword] = useState({main: true});
    const [passwordMain, setPasswordMain] = useState('');
    const [credential, setCredential] = useState('')

    const {t} = useTranslation();

    const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
        ...prev,
        [field]: !prev[field],
    }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailOrUsername = credential
        const passwordHash = passwordMain;
        const formData = {
            emailOrUsername, passwordHash
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        axios.post(`${apiUrl}/auth/login`, formData, {withCredentials: true})
        .then(res => {
            navigate('/')
        }).catch(error => {
            const msg = error.response?.data?.message;
            if(msg === 'USER_NOT_FOUND') {
                setMismatchMessage(t('errorUserNotFound'))
            } else if (msg === 'PASSWORD_INCORRECT') {
                setMismatchMessage(t('errorEmailInUse'))
            }
        })
    }
    return(
        <div className="--container-auth-form" onSubmit={handleSubmit}>

        <div className="--error-message" style={{opacity: mismatchMessage? '1' : '0'}}>
            <p>{mismatchMessage}</p>
        </div>
        <form className="--form-content">
            <img src="/assets/brand/vireo-brand-green.png" alt="" className='--form-logo' />
            <div className="--input-content">
                <input name="emailOrUsername" type="text" placeholder={t('formUserName')} required onChange={((e) => setCredential(e.target.value))}/>
            </div>
            <div className="--input-content">
                <input name="passwordHash" type={showPassword.main? 'password' : 'text'} placeholder={t('formPassword')} required aria-autocomplete='password' onChange={(e) => setPasswordMain(e.target.value)}/>
                <i className={`pi ${showPassword.main? 'pi-eye-slash' : 'pi-eye' }`} onClick={() => toggleVisibility('main')}/>
            </div>
            <button className='--submit-button'>{t('formSignIn')}</button>
            <p className='--have-account'>{t('formUserDontHaveAccount')} <a href="/signup">{t('formSignUp')}</a></p>
            <p className='--have-account'><a href="/reset-password">{t('formForgotPassword')}</a></p>
        </form>

        <div className="--footer">
            <p>&copy; Hanna 2025. {t('footerCopyright')}</p>
        </div>
        </div>


        // <div className="--container-auth-form">
        //     <div className="--container-header">
        //         <img src="/assets/brand/vireo-brand-green.png" alt="Vireo Logo with Green Bird and Name" draggable="false" />
        //     </div>
        //     <div className="--container-form">
        //         <h1>{t('formLogInTitle')}</h1>
        //         <form className="--form-content" onSubmit={handleSubmit}>
        //             <div className="--form-input-container">
        //                 <label htmlFor="emailOrUsername">{t('formEmail')}</label>
        //                 <div className="--form-input-style">
        //                     <input type="text" id="inp-email" name="emailOrUsername" placeholder="youremail@example.com" onChange={((e) => setCredential(e.target.value))}/>
        //                 </div>
        //             </div>
        //             <div className="--form-input-container">
        //                 <label htmlFor="inp-passwordHash">{t('formPassword')}</label>
        //                 <div className="--form-input-style">
        //                     <input type={showPassword.main? 'password' : 'text'} id="inp-passwordHash" name="passwordHash" className='--form-input' required aria-autocomplete='password' onChange={(e) => setPasswordMain(e.target.value)} style={{position: 'relative'}}/> 
        //                     <i className={`pi ${showPassword.main? 'pi-eye-slash' : 'pi-eye' }`} onClick={() => toggleVisibility('main')}/>
        //                 </div>
        //             </div>
        //             <div className="--form-input-container">
        //                 <button type="submit" className='--form-button'>{t('formLogin')}</button>
        //             </div>
        //             {setMismatchMessage && <p className='error-message'>{mismatchMessage}</p>}
        //         </form>
        //         <div className="--form-links">
        //             <a href="/signup">{t('formSignUpTitle')}</a>
        //             <a href="/forgot-password">{t('formForgotPassword')}</a>
        //         </div>
        //     </div>
        //     <div className="--container-footer">
        //         <p>&copy; 2025 Hanna. {t('footerCopyright')}</p>
        //     </div>
        // </div>
    )
}

export default Login;