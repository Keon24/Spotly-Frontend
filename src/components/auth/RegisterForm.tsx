import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate();
    
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
         navigate('/login')
        } catch (err:any) {
            setError(err.response?.data?.message || 'Registered Successfully')  
        }
    }
    const passwordScore = zxcvbn(formData.password).score;
        return (
           
            <form
            onSubmit={handleSubmit}
            className="space-y-4 text-gray-800"
          >
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{error}</p>}
          
            <input
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          
            {formData.password && (
              <small className="text-gray-500 block">
                Password Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordScore]}
              </small>
            )}
          
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
              <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
            >
              Register
            </button>
          </form>
          
   
        );
    };
    export default RegisterForm;
