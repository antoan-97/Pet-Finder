import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Spinner from "../common/Spinner";
import { useLogin } from "../../hooks/login/useLogin";

export default function Login() {
    const {
        t,
        isLoading,
        rememberMe,
        formData,
        errors,
        loginError,
        isLocked,
        passwordIcon,
        onChange,
        onRememberMeChange,
        onSubmit,
        togglePasswordVisibility
    } = useLogin();

    return (
        <section className="bg-login-bg bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-50 dark:border-white-600">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                            {t('login.title')}
                        </h1>
                        {errors.server && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                {errors.server}
                            </div>
                        )}
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
                                    disabled={isLocked}
                                    className={`bg-green-50 border ${errors.email ? 'border-red-500' : 'border-green-300'} text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-100 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-100 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    placeholder="name@example.com"
                                    required=""
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    {t('login.password')}
                                </label>
                                <div className="relative">
                                    <input
                                        onChange={onChange}
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        disabled={isLocked}
                                        placeholder="••••••••"
                                        className={`bg-green-50 border ${errors.password ? 'border-red-500' : 'border-green-300'} text-gray-900 text-sm rounded-lg focus:ring-green-100 focus:border-green-100 block w-full p-2.5 dark:bg-white-50 dark:border-green-400 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-green-100 dark:focus:border-green-100 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        required=""
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                                        onClick={togglePasswordVisibility}
                                    >
                                        <FontAwesomeIcon icon={passwordIcon} />
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                                )}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={onRememberMeChange}
                                            disabled={isLocked}
                                            className={`w-4 h-4 border border-green-300 rounded bg-green-50 focus:ring-3 focus:ring-green-300 dark:bg-green-600 dark:border-green-400 dark:focus:ring-green-400 dark:ring-offset-green-800 ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                disabled={isLoading || isLocked}
                                className={`w-full text-white ${
                                    isLocked ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                                } focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800`}
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