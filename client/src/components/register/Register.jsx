import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import { useTranslation } from "react-i18next";

import Spinner from "../common/Spinner";
import AuthContext from "../../contexts/AuthContext";

export default function Register() {
    const { t } = useTranslation();
    const { registerSubmitHandler } = useContext(AuthContext)
    const { isLoading, setIsLoading } = useLoading()
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const generatePassword = () => {
        const length = 12;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let password = "";
        
        // Ensure at least one of each character type
        password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // Uppercase
        password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // Lowercase
        password += "0123456789"[Math.floor(Math.random() * 10)]; // Number
        password += "!@#$%^&*"[Math.floor(Math.random() * 8)]; // Special char
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += charset[Math.floor(Math.random() * charset.length)];
        }

        // Shuffle the password
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        setFormData(prev => ({
            ...prev,
            password: password,
            confirmPassword: password
        }));
    };

    const onChange = (e) => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    }

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await registerSubmitHandler(formData);
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="bg-login-bg bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-50 dark:border-white-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                            {t('register.title')}
                        </h1>
                        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    {t('register.email')}
                                </label>
                                <input
                                    onChange={onChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                    placeholder="name@example.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    {t('register.password')}
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={onChange}
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        placeholder="••••••••"
                                        className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                        required=""
                                    />
                                    <button
                                        type="button"
                                        onClick={generatePassword}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700 transition-colors"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    {t('register.confirmPassword')}
                                </label>
                                <input
                                    onChange={onChange}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    value={formData.confirmPassword}
                                    placeholder="••••••••"
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-400"
                                    required=""
                                />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="terms"
                                        aria-describedby="terms"
                                        type="checkbox"
                                        onChange={handleCheckboxChange}
                                        className="w-4 h-4 border border-green-300 rounded bg-green-50 focus:ring-3 focus:ring-green-300 dark:bg-green-600 dark:border-green-400 dark:focus:ring-green-400 dark:ring-offset-green-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500 dark:text-gray-500"
                                    >
                                        {t('register.checkBox')}
                                        <a
                                            href="/terms" // Link to your Terms of Service
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-green-600 hover:underline dark:text-green-500"
                                        >
                                            {t('register.termsLink')}
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`w-full text-white ${termsAccepted ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'} focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800`}
                                disabled={!termsAccepted} // Step 3: Disable button based on checkbox
                            >
                                {t('register.registerButton')}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                                {t('register.alreadyHaveAccount')} 
                                <Link to='/login'
                                    className="font-medium text-green-600 hover:underline dark:text-green-500"
                                >
                                    {isLoading ? <Spinner /> : t('register.loginLink')}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );

}