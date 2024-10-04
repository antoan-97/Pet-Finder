import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Login() {
    const { loginSubmitHandler } = useContext(AuthContext);

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

    const onSubmit = (e) => {
        e.preventDefault();
        loginSubmitHandler(formData, rememberMe);
        if (rememberMe) {
            localStorage.setItem('savedEmail', formData.email); // Save only the email
        } else {
            localStorage.removeItem('savedEmail');
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
                                <input onChange={onChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-white-50 focus:border-white-50 block w-full p-2.5 dark:bg-white-50 dark:border-white-50 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-white-50 dark:focus:border-white-50"
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
                                <input onChange={onChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder="••••••••"
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-white-50 focus:border-white-50 block w-full p-2.5 dark:bg-white-50 dark:border-blue-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-white-50 dark:focus:border-white-50"
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
                                            className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-300 dark:bg-blue-600 dark:border-blue-400 dark:focus:ring-blue-400 dark:ring-offset-blue-800"
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
                                <a
                                    href="#"
                                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                                Don’t have an account yet?{" "}
                                <Link to='/register'
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
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