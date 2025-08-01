import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin, userSignUp } from '../services/AuthServices';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';

export default function Auth() {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '', surname: '', email: '', password: '',
    dob: '', gender: '', mobile: '', country: '', language: ''
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await userLogin(loginData);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await userSignUp(registerData);
      toast.success('Registered successfully');
      setActiveTab('login');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-[520px] mx-auto px-6 pt-40 pb-20 text-[#1c1b1b] font-['Helvetica']">
      <h2 className="text-center text-2xl font-light tracking-wide mb-8 uppercase">
        Welcome to <span className="font-bold">Guess World</span>
      </h2>

      <div className="flex justify-center border-b border-[#dcdcdc] mb-10">
        <button
          onClick={() => setActiveTab('login')}
          className={`uppercase text-sm px-6 pb-2 tracking-wider ${
            activeTab === 'login' ? 'border-b-2 border-black text-black' : 'text-[#a5a5a5]'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`uppercase text-sm px-6 pb-2 tracking-wider ${
            activeTab === 'register' ? 'border-b-2 border-black text-black' : 'text-[#a5a5a5]'
          }`}
        >
          Register
        </button>
      </div>

      {activeTab === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <p className="text-sm text-center mb-3 text-[#444]">
            Enter your email and password to login.
          </p>

          <input
            type="email"
            placeholder="E-mail*"
            required
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password*"
              required
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full border border-[#ccc] py-3 px-4 text-sm pr-12 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[50%] -translate-y-1/2 text-gray-500"
            >
              <Eye size={18} />
            </button>
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-[#888] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 tracking-wide text-sm uppercase"
          >
            Sign in
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <p className="text-sm text-center mb-2 text-[#444]">
            Complete all sections to track your online orders and enjoy a faster checkout.
          </p>

          <input
            type="text"
            placeholder="Name*"
            required
            value={registerData.name}
            onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <input
            type="text"
            placeholder="Surname"
            value={registerData.surname}
            onChange={(e) => setRegisterData({ ...registerData, surname: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <input
            type="email"
            placeholder="Email*"
            required
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <input
            type="password"
            placeholder="Password*"
            required
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <input
            type="date"
            value={registerData.dob}
            onChange={(e) => setRegisterData({ ...registerData, dob: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <select
            value={registerData.gender}
            onChange={(e) => setRegisterData({ ...registerData, gender: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm text-[#555]"
          >
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
          <input
            type="text"
            placeholder="Mobile"
            value={registerData.mobile}
            onChange={(e) => setRegisterData({ ...registerData, mobile: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <input
            type="text"
            placeholder="Country"
            value={registerData.country}
            onChange={(e) => setRegisterData({ ...registerData, country: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />
          <input
            type="text"
            placeholder="Language"
            value={registerData.language}
            onChange={(e) => setRegisterData({ ...registerData, language: e.target.value })}
            className="w-full border border-[#ccc] py-3 px-4 text-sm"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 tracking-wide text-sm uppercase"
          >
            Sign up
          </button>
        </form>
      )}
    </div>
  );
}
