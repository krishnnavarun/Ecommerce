import {Link, useNavigate} from "react-router";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin';
            
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('guestCart');
        toast.success('Logged out successfully');
        navigate('/');
    };

    
    return(
        <> 
            <div className="w-full bg-orange-600 shadow-xl shadow-gray-400">
                <div className="mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Left Section - Logo & Main Links */}
                        <div className="flex space-x-10 text-white">
                            <h1 className="text-lg font-semibold text-black mr-20 mt-2 px-3 py-1 rounded">Fashions-Web</h1>
                            <div className="flex items-center space-x-8 text-lg font-semibold">
                                <Link to="/" className="text-xl font-semibold hover:underline transition">
                                    Home
                                </Link>
                                <Link to="/products" className="text-xl font-semibold hover:underline transition">
                                    Products
                                </Link>
                                <Link to="/cart" className="text-xl font-semibold hover:underline transition">
                                    Cart
                                </Link>
                                <Link to="/orders" className="text-xl font-semibold hover:underline transition">
                                    Orders
                                </Link>
                                {isAdmin && (
                                    <Link to="/addProductsForm" className="text-xl font-semibold hover:underline transition ml-10 px-3 py-1 rounded">
                                        Add Products
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Middle Section - Search */}
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="border-2 border-white rounded-lg text-gray-900 h-10 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                        />

                        {/* Right Section - User Links */}
                        <div className="flex items-center space-x-6 text-lg font-semibold text-white pr-10">
                            {token ? (
                                <>
                                    <span className="font-semibold">{user.name || 'User'}</span>
                                    <button 
                                        onClick={handleLogout}
                                        className="px-4 py-2 rounded font-semibold bg-red-700 transition text-white hover:bg-red-800 hover:shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="hover:underline font-semibold">Login</Link>
                                    <Link to="/register" className="px-4 py-2 rounded font-semibold hover:underline">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;