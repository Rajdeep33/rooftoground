import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Our Application</h1>
        <p className="text-lg mb-8 text-center">Please register or log in to continue.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/login" className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition">
                Log in
            </Link>
            <Link to="/register/customer" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Register as Customer
            </Link>
            <Link to="/register/professional" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Register as Professional
            </Link>
            <Link to="/register/vendor" className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition">
                Register as Vendor
            </Link>
        </div>
    </div>
  );
}

export default LandingPage;
