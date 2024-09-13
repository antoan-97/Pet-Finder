import { useState, useEffect } from 'react'
export default function TermsOfCondition() {
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        // Dynamically generate the current date for "Last updated"
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        setLastUpdated(formattedDate);
    }, []);
    return (
        <section className="bg-gray-100 dark:bg-blue-500 py-8 px-4">
            <div className="max-w-screen-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Terms and Conditions</h1>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Welcome to PawFinder! These terms and conditions outline the rules and regulations for the use of our website.
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    By accessing this website, you agree to comply with and be bound by these terms and conditions. If you disagree with any part of the terms, you may not use our services.
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">2. User Responsibilities</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    You must not use this website in any way that causes damage to the website or impairs its accessibility.
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">3. Limitation of Liability</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    PawFinder will not be liable for any damages arising in connection with the use of this website.
                </p>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-4">4. Changes to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    We reserve the right to make changes to these terms at any time. It is your responsibility to review these terms periodically.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-8">
                <span className="font-semibold">{lastUpdated}</span>
                </p>
            </div>
        </section>
    );
}
