import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function TermsOfCondition() {
    const [lastUpdated, setLastUpdated] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const fromRegister = location.state?.from === '/register';

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setLastUpdated(formattedDate);
    }, []);

    const handleBack = () => {
        if (fromRegister) {
            navigate('/register');
        } else {
            navigate(-1);
        }
    };

    return (
        <section className="bg-login-bg bg-cover bg-center min-h-screen py-8 px-4">
            <div className="max-w-screen-md mx-auto bg-white bg-opacity-80 rounded-lg shadow p-8 dark:bg-white-50 dark:border-white-600">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray mb-6">Terms and Conditions</h1>
                
                <div className="space-y-6">
                    <div>
                        <p className="text-gray-700 dark:text-gray-500">
                            Welcome to PawFinder! These terms and conditions outline the rules and regulations for the use of our website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray mb-3">1. Acceptance of Terms</h2>
                        <p className="text-gray-700 dark:text-gray-500">
                            By accessing this website, you agree to comply with and be bound by these terms and conditions. If you disagree with any part of the terms, you may not use our services.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray mb-3">2. User Responsibilities</h2>
                        <p className="text-gray-700 dark:text-gray-500">
                            You must not use this website in any way that causes damage to the website or impairs its accessibility.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray mb-3">3. Limitation of Liability</h2>
                        <p className="text-gray-700 dark:text-gray-500">
                            PawFinder will not be liable for any damages arising in connection with the use of this website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray mb-3">4. Changes to Terms</h2>
                        <p className="text-gray-700 dark:text-gray-500">
                            We reserve the right to make changes to these terms at any time. It is your responsibility to review these terms periodically.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-green-200">
                        <p className="text-gray-700 dark:text-gray-500">
                            Last updated: <span className="font-semibold text-green-600 dark:text-green-500">{lastUpdated}</span>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleBack}
                        className="bg-green-600 text-white px-6 py-2 rounded-md text-sm hover:bg-green-700 transition-colors focus:ring-4 focus:outline-none focus:ring-green-300"
                    >
                        Back to Register
                    </button>
                </div>
            </div>
        </section>
    );
}
