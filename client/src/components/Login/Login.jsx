import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoading } from "../../contexts/LoadingContext";
import AuthContext from "../../contexts/AuthContext";
import Spinner from "../common/Spinner";


export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);
    const { isLoading, setIsLoading } = useLoading()

    const [rememberMe, setRememberMe] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        // Check local storage for saved users
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
            setFormData({ email: savedEmail });
            setRememberMe(true);
        }
    }, []);


    const onChange = (e) => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const onRememberMeChange = (e) => {
        setRememberMe(e.target.checked); // Update rememberMe state based on checkbox
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await loginSubmitHandler(formData, rememberMe);
            
            if (rememberMe) {
                localStorage.setItem('savedEmail', formData.email);
            } else {
                localStorage.removeItem('savedEmail');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <section className="bg-login-bg bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-50 dark:border-white-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                            Sign in to your account
                        </h1>
                        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={onChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-100 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-100"
                                    placeholder="name@example.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    Password
                                </label>
                                <input
                                    onChange={onChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder="••••••••"
                                    className="bg-green-50 border border-green-300 text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-100"
                                    required=""
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={onRememberMeChange}
                                            className="w-4 h-4 border border-green-300 rounded bg-green-50 focus:ring-3 focus:ring-green-300 dark:bg-green-600 dark:border-green-400 dark:focus:ring-green-400 dark:ring-offset-green-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-500"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                            >
                                {isLoading ? <Spinner /> : 'Sign in'}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                                Don’t have an account yet?{" "}
                                <Link to='/register'
                                    className="font-medium text-green-600 hover:underline dark:text-green-500"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}