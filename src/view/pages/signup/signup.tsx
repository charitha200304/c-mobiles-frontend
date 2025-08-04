import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import logo from '../assets/logo-main.svg'

function Signup() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })

    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [signupSuccess, setSignupSuccess] = useState<boolean>(false)
    const [signupError, setSignupError] = useState<string | null>(null)
    const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null)
    const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false)

    const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000';

    const checkUsernameAvailability = async (username: string) => {
        if (!username) {
            setUsernameAvailable(null)
            return
        }
        
        setIsCheckingUsername(true)
        try {
            // This assumes your backend has an endpoint to check username availability
            const response = await axios.get(`${BACKEND_API_URL}/api/users/check-username?username=${encodeURIComponent(username)}`)
            setUsernameAvailable(response.data.available)
        } catch (error) {
            console.error('Error checking username:', error)
            setUsernameAvailable(null)
        } finally {
            setIsCheckingUsername(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        
        // Check username availability when the name field changes
        if (name === 'name') {
            checkUsernameAvailability(value)
        }
    }

    const handleAcceptTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptTerms(e.target.checked)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignupError(null);
        setSignupSuccess(false);

        if (!acceptTerms) {
            setSignupError("You must agree to the terms and conditions");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setSignupError("Passwords do not match");
            return;
        }

        // Check if username is already taken
        if (usernameAvailable === false) {
            setSignupError("Please choose a different username");
            return;
        }

        // If username hasn't been checked yet, check it now
        if (usernameAvailable === null && formData.name) {
            await checkUsernameAvailability(formData.name);
            if (usernameAvailable === false) {
                setSignupError("Please choose a different username");
                return;
            }
        }

        setIsLoading(true)
        try {
            const response = await axios.post(`${BACKEND_API_URL}/api/users/save-user`, formData);

            console.log("Signup successful:", response.data)
            setSignupSuccess(true)

            setTimeout(() => {
                navigate('/signin')
            }, 3000)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    // Show the exact error message from the backend
                    setSignupError(error.response.data.message || "Username or email already in use.");
                } else {
                    console.error("Signup failed (Axios error):", error.response?.data || error.message);
                    setSignupError(error.response?.data?.message || "Network error. Please try again.");
                }
            } else {
                console.error("Signup failed (unexpected error):", error);
                setSignupError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
            <div className='w-full max-w-lg bg-white p-8 rounded-lg shadow-md'>
                <div className='flex justify-center mb-6'>
                    <img src={logo} alt="Logo" className="h-10" />
                </div>
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Sign Up for an Account</h2>

                {signupSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Success!</p>
                        <p>Your account has been created. Redirecting to sign in...</p>
                    </div>
                )}

                {signupError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p className="font-bold">Error!</p>
                        <p>{signupError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                            Name
                        </label>
                        <div className="relative">
                            <input
                                type='text'
                                name='name'
                                id='name'
                                value={formData.name}
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                    formData.name && usernameAvailable === false ? 'border-red-500' : ''
                                } ${
                                    formData.name && usernameAvailable === true ? 'border-green-500' : ''
                                }`}
                                required
                            />
                            {isCheckingUsername && formData.name && (
                                <p className='absolute text-xs text-gray-500 mt-1'>Checking username availability...</p>
                            )}
                            {formData.name && usernameAvailable === false && (
                                <p className='absolute text-xs text-red-500 mt-1'>Username is already taken</p>
                            )}
                            {formData.name && usernameAvailable === true && (
                                <p className='absolute text-xs text-green-500 mt-1'>Username is available</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phone'>
                            Phone
                        </label>
                        <input
                            type='tel'
                            name='phone'
                            id='phone'
                            value={formData.phone}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            value={formData.password}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='confirmPassword'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            name='confirmPassword'
                            id='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            required
                        />
                    </div>
                    <div className='flex items-center space-x-2'>
                        <input
                            type='checkbox'
                            id='acceptTerms'
                            checked={acceptTerms}
                            onChange={handleAcceptTerms}
                            className='form-checkbox h-4 w-4 text-primary rounded focus:ring-0 cursor-pointer'
                        />
                        <label htmlFor='acceptTerms' className='text-sm text-gray-700 cursor-pointer'>
                            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </label>
                    </div>
                    <button
                        type='submit'
                        className='bg-primary w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ease-in-out hover:bg-opacity-80'
                        disabled={isLoading || (formData.name && usernameAvailable === false) || isCheckingUsername}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <div className='mt-6 text-center text-sm'>
                    <span className='text-gray-600'>Already have an account? </span>
                    <Link to='/signin' className='text-primary hover:underline font-bold'>
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup