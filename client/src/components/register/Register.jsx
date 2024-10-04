import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function Register() {

    const { registerSubmitHandler } = useContext(AuthContext)
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const onChange = (e) => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    }

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        registerSubmitHandler(formData);
    }

    return (
        <section className="bg-login-bg bg-cover bg-center">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white bg-opacity-80 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white-50 dark:border-white-50">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray">
                            Create an account
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
                                <input
                                    onChange={onChange}
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    placeholder="••••••••"
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-white-50 focus:border-white-50 block w-full p-2.5 dark:bg-white-50 dark:border-white-50 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-white-50 dark:focus:border-white-50"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                                >
                                    Confirm password
                                </label>
                                <input
                                    onChange={onChange}
                                    type="password"
                                    name="confirmPassword"
                                    id="confirm-password"
                                    value={formData.confirmPassword}
                                    placeholder="••••••••"
                                    className="bg-blue-50 border border-blue-300 text-gray-900 text-sm rounded-lg focus:ring-white-50 focus:border-white-50 block w-full p-2.5 dark:bg-white-50 dark:border-white-50 dark:placeholder-gray-500 dark:text-dark dark:focus:ring-white-50 dark:focus:border-white-50"
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
                                        className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-300 dark:bg-blue-600 dark:border-blue-400 dark:focus:ring-blue-400 dark:ring-offset-blue-800"
                                        required=""
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="terms"
                                        className="font-light text-gray-500 dark:text-gray-500"
                                    >
                                        I accept the{" "}
                                        <a
                                    href="/terms" // Link to your Terms of Service
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Terms of Service
                                </a>
                                    </label>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className={`w-full text-white ${termsAccepted ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800`}                                disabled={!termsAccepted} // Step 3: Disable button based on checkbox
                            >
                                Create an account
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-500">
                                Already have an account?{" "}
                                <Link to='/login'
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    Login here
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}