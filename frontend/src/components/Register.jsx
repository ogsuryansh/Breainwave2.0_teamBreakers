import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

// InputField component moved outside to prevent re-creation on every render
const InputField = ({ name, type, placeholder, icon, value, onChange, onFocus, onBlur, isFocused }) => {
    const hasValue = value.length > 0;

    return (
        <div className="group relative">
            <label
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${isFocused || hasValue
                    ? '-top-2.5 text-xs text-[#00D1FF] bg-[#0A0A0B] px-2'
                    : 'top-3.5 text-gray-500'
                    }`}
            >
                {placeholder}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete={
                    name === 'email' ? 'email' :
                        name === 'password' || name === 'confirmPassword' ? 'new-password' :
                            name === 'username' ? 'username' :
                                'off'
                }
                className="w-full bg-[#1A1A1E] border border-gray-800 rounded-xl px-4 py-3.5 text-white outline-none focus:border-[#00D1FF] focus:shadow-[0_0_20px_rgba(0,209,255,0.3)] transition-all duration-300"
                required
            />
            {icon && (
                <div className="absolute right-4 top-3.5 text-gray-600">
                    {icon}
                </div>
            )}
        </div>
    );
};

const Register = () => {
    const navigate = useNavigate();
    const { loginWithRedirect } = useAuth0();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        college: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const colleges = [
        "DTU (Delhi Technological University)",
        "NSUT (Netaji Subhas University of Technology)",
        "IIT (Indian Institute of Technology)",
        "Other"
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        console.log('Input changed:', name, value); // Debug log
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleCollegeSelect = (college) => {
        setFormData({ ...formData, college: college.split(' ')[0] }); // Just taking the abbr for state, or full if you prefer
        setIsDropdownOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: formData.fullName,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            } else {
                alert(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        loginWithRedirect({
            authorizationParams: {
                connection: 'google-oauth2'
            }
        });
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0A0A0B] p-4 relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#7000FF]/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#00D1FF]/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative w-full max-w-6xl mx-auto flex flex-col-reverse lg:flex-row rounded-3xl overflow-hidden shadow-2xl shadow-[#7000FF]/10 backdrop-blur-xl border border-white/10 z-10 bg-[#0A0A0B]/60">

                {/* Left Side - Form Section */}
                <div className="w-full lg:w-3/5 p-8 md:p-12 flex flex-col justify-center relative z-20">
                    <div className="mb-8">
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D1FF] to-[#7000FF]">Hustle</span>
                        </h2>
                        <p className="text-gray-400">Create your account to begin the journey.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField
                                name="fullName"
                                type="text"
                                placeholder="Full Name"
                                value={formData.fullName ?? ''}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput('fullName')}
                                onBlur={() => setFocusedInput(null)}
                                isFocused={focusedInput === 'fullName'}
                            />
                            <InputField
                                name="username"
                                type="text"
                                placeholder="Username"
                                value={formData.username ?? ''}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput('username')}
                                onBlur={() => setFocusedInput(null)}
                                isFocused={focusedInput === 'username'}
                            />
                        </div>

                        <InputField
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={formData.email ?? ''}
                            onChange={handleChange}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                            isFocused={focusedInput === 'email'}
                        />

                        {/* Custom Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <label
                                className={`absolute left-4 transition-all duration-300 pointer-events-none z-10 ${isDropdownOpen || formData.college ? '-top-2.5 text-xs text-[#00D1FF] bg-[#0A0A0B] px-2' : 'top-3.5 text-gray-500'
                                    }`}
                            >
                                Select College
                            </label>
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full bg-[#1A1A1E] border rounded-xl px-4 py-3.5 text-white cursor-pointer flex justify-between items-center transition-all duration-300 ${isDropdownOpen ? 'border-[#00D1FF] shadow-[0_0_20px_rgba(0,209,255,0.3)]' : 'border-gray-800'
                                    }`}
                            >
                                <span className={formData.college ? 'text-white' : 'text-transparent'}>
                                    {formData.college || 'Select College'}
                                </span>
                                <svg
                                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00D1FF]' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {/* Dropdown Options */}
                            <div className={`absolute top-full left-0 right-0 mt-2 bg-[#1A1A1E] border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 z-50 origin-top shadow-xl ${isDropdownOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-0 -translate-y-4 pointer-events-none'
                                }`}>
                                {colleges.map((college, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleCollegeSelect(college)}
                                        className="px-4 py-3 text-gray-300 hover:text-white hover:bg-[#00D1FF]/20 cursor-pointer transition-colors border-b border-gray-800 last:border-0"
                                    >
                                        {college}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password ?? ''}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                                isFocused={focusedInput === 'password'}
                            />
                            <InputField
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword ?? ''}
                                onChange={handleChange}
                                onFocus={() => setFocusedInput('confirmPassword')}
                                onBlur={() => setFocusedInput(null)}
                                isFocused={focusedInput === 'confirmPassword'}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 mt-4 bg-gradient-to-r from-[#7000FF] to-[#00D1FF] text-white font-bold rounded-xl hover:shadow-[0_0_40px_rgba(112,0,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative flex items-center justify-center gap-2">
                                {isLoading ? 'Initializing Profile...' : 'Create Account'}
                                {!isLoading && (
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-gray-800 flex-1"></div>
                        <span className="text-gray-500 text-sm">OR REGISTER WITH</span>
                        <div className="h-px bg-gray-800 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={handleGoogleRegister}
                            className="flex items-center justify-center gap-2 py-3 bg-[#1A1A1E] border border-gray-800 rounded-xl hover:bg-[#25252A] hover:border-gray-700 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-gray-300 font-medium">Google</span>
                        </button>
                        <button
                            onClick={() => alert("Coming soon!")}
                            className="flex items-center justify-center gap-2 py-3 bg-[#1A1A1E] border border-gray-800 rounded-xl hover:bg-[#25252A] hover:border-gray-700 transition-all duration-300 group"
                        >
                            <svg className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-gray-300 font-medium">Facebook</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#00D1FF] hover:text-[#7000FF] font-semibold transition-colors">
                            Login Now
                        </Link>
                    </p>
                </div>

                {/* Right Side - Animated Visual */}
                <div className="hidden lg:flex w-full lg:w-2/5 bg-[#0F0F12] relative overflow-hidden items-center justify-center min-h-[300px] lg:min-h-auto border-l border-white/5">
                    {/* Animated Solar System / Atom Visual */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Orbit 1 */}
                        <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-dashed border-[#7000FF]/40 animate-[spin_20s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-[#7000FF] rounded-full blur-[2px] shadow-[0_0_10px_#7000FF]"></div>
                        </div>

                        {/* Orbit 2 */}
                        <div className="absolute w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-[#00D1FF]/30 animate-[spin_15s_linear_infinite_reverse]">
                            <div className="absolute bottom-0 left-1/2 -ml-1.5 w-3 h-3 bg-[#00D1FF] rounded-full blur-[1px] shadow-[0_0_8px_#00D1FF]"></div>
                        </div>

                        {/* Central Core */}
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#7000FF] to-[#00D1FF] rounded-full blur-sm animate-pulse flex items-center justify-center z-10">
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20"></div>
                        </div>

                        <div className="absolute bottom-10 text-center z-10 w-full px-4">
                            <h3 className="text-white font-bold text-lg mb-1 tracking-wider">INITIATE SEQUENCE</h3>
                            <p className="text-gray-500 text-xs font-mono">SYSTEM READY . . .</p>
                        </div>
                    </div>

                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
