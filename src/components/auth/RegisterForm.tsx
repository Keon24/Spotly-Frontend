import React, { useState } from 'react'
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from 'react-google-recaptcha'

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const [captchaToken, setCaptchaToken] = useState<string |null>(null);
    const [error, setError ] = useState('');
    const [success, setSucess] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!captchaToken) {
            setError("please complete the captcha")
            return;
        }
        try {
         await axios.post('/api/users/register/', {
         ...formData, captcha: captchaToken,
         });
         setSucess(true);
         setError(''); 
        } catch (err:any) {
            setError(err.response?.data?.message || 'Registered Successfully')  
        }
    }
    const passwordScore = zxcvbn(formData.password).score;
        return (
          <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            {error && <p style={{color: 'red'}}>{error}</p>},
            {success && <p style={{color: 'green'}}>{error}</p>}
            <input name="first_name" placeholder="First Name"onChange={handleChange}required/>
            <input name="last_name" placeholder="Last Name" onChange={handleChange}required/>
            <input name="email" placeholder="Email" onChange={handleChange}required/>
            <input name="password" placeholder="Password" onChange={handleChange}required/>
            {formData.password && (
                <small>
                    Password Strength{['Very Weak', 'Weak','Fair','Good','String'][passwordScore]}
                </small>
            )}
            <br /><br />
            <ReCAPTCHA
                sitekey=""
                onChange={(token) => setCaptchaToken(token)}
            />
            <br/>
            <button type="submit">Register</button>
          </form>   
        )
    };
    export default RegisterForm;
