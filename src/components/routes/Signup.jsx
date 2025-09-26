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
        if(passwordMain !== passwordConfirm) {setMismatchMessage(t('errorPasswordsMismatch'));return;}

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
        <div className="--container-auth-form" onSubmit={handleSubmit}>

        <div className="--error-message" style={{opacity: mismatchMessage? '1' : '0'}}>
            <p>{mismatchMessage}</p>
        </div>
        <form className="--form-content">
            <img src="/assets/brand/vireo-brand-green.png" alt="" className='--form-logo'/>
            <div className="--input-content">
                <input name="accountName" type="text" placeholder={t('formUserName')} required/>
            </div>
            <div className="--input-content">
                <input name='email' type="email" placeholder={t('formEmail')} required/>
            </div>
            <div className="--input-content">
                <input name="passwordHash" type={showPassword.main? 'password' : 'text'} placeholder={t('formPassword')} required aria-autocomplete='password' onChange={(e) => setPasswordMain(e.target.value)}/>
                <i className={`pi ${showPassword.main? 'pi-eye-slash' : 'pi-eye' }`} onClick={() => toggleVisibility('main')}/>
            </div>
            <div className="--input-content">
                <input name="passwordHashConfirm" type={showPassword.confirm? 'password' : 'text'} placeholder={t('formConfirmPassword')} required aria-autocomplete='password' onChange={(e) => setPasswordConfirm(e.target.value)}/>
                <i className={`pi ${showPassword.confirm? 'pi-eye-slash' : 'pi-eye'}`} onClick={() => toggleVisibility('confirm')}/>
            </div>

            <div className="--terms-agreement">
                <input type="checkbox" name="agreeWithTerms" id="" required/>
                <p>{t('formAgreeWithTerms')} <a href="/terms-of-use-and-service">{t('UITOUS')}</a></p>
            </div>
            <button className='--submit-button'>{t('formCreateAccount')}</button>
            <p className='--have-account'>{t('formUserHaveAccount')} <a href="/login">{t('formLogin')}</a></p>
        </form>

        <div className="--footer">
            <p>&copy; Hanna 2025. {t('footerCopyright')}</p>
        </div>
        </div>
    )
}

export default Signup;