
export default function Donate() {
    return (
        <section className="bg-blue-400 py-12">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    Support Us
                </h2>
                <p className="text-lg text-white text-center mb-6 max-w-3xl mx-auto">
                    Although we are currently unable to process real donations, we are dedicated to supporting animals in need. This simulated donation process is for demonstration purposes only.
                </p>

             
                <div className="text-center mt-10">
                    <a
                        href="https://dari.four-paws.bg/s/?_ga=2.50020911.802577102.1630308141-1149300567.1591961121"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 text-white bg-pink-500 rounded-lg hover:bg-pink-600 transition duration-300 ease-in-out"
                    >
                        Support Four Paws
                    </a>
                </div>
            </div>
        </section>
    );
}