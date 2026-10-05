const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
        <p className="text-lg mb-8">Please register or log in to continue.</p>
        <div className="flex space-x-4">
            <a href="/register/customer" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Register as Customer
            </a>
            <a href="/register/professional" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Register as Professional
            </a>
            <a href="/register/vendor" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                Register as Vendor
            </a>
        </div>
    </div>
  );
}

export default LandingPage;