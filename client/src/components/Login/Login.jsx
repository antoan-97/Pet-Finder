import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from "../common/Spinner";
import { useLogin } from "../../hooks/login/useLogin";

export default function Login() {
    const {
        t,
        isLoading,
        rememberMe,
        formData,
        onChange,
        onRememberMeChange,
        onSubmit
    } = useLogin();

    return (
        <section className="bg-login-bg bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-50 dark:border-white-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                            {t('login.title')}
                        </h1>
                        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    {t('login.email')}
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
                                    {t('login.password')}
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
                                            {t('login.checkBox')}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800"
                            >
                                {isLoading ? <Spinner /> : t('login.loginButton')}
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                                {t('login.signUp')}
                                <Link 
                                    to='/register'
                                    className="font-medium text-green-600 hover:underline dark:text-green-500"
                                >
                                    {t('login.signUpLink')}
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}