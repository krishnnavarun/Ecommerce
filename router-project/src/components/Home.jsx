import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import NavbarLayout from "../layout/NavbarLayout";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
        toast.info("Welcome to e-Shop!");
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://13.51.161.113:3000/products');
            const data = await response.json();
            setProducts(data.slice(0, 3));
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        }
    };

    const handleAddToCart = async (product) => {
        try {
            const token = localStorage.getItem('token');
            
            // If user is not logged in, store in localStorage as guest cart
            if (!token) {
                const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
                const existingItem = guestCart.find(item => item.productId === product._id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    guestCart.push({
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                
                localStorage.setItem('guestCart', JSON.stringify(guestCart));
                toast.success('Product added to cart!');
                return;
            }
            
            // If user is logged in, add to server cart
            const response = await fetch('http://13.51.161.113:3000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                })
            });
            if (response.ok) {
                toast.success('Product added to cart!');
            } else {
                const error = await response.json();
                toast.error(error.error || 'Error adding to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Error adding to cart');
        }
    };

    return(
        <>
            {/* Popular Categories Section */}

            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8 text-gray-900">Popular Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
                                <div className="w-full h-[300px] overflow-hidden bg-gray-100">
                                    <img src={product.image} alt={product.name} className="h-full w-full hover:scale-105 object-cover transition-transform duration-300"/>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                                    <p className="text-2xl font-bold text-blue-600 mb-6">₹{product.price} Only</p>
                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-10">Loading products...</div>
                    )}

                </div>
                <div className="text-right">
                    <Link to="/products" className="text-blue-600 hover:text-blue-800 font-bold text-lg inline-flex items-center gap-2">
                        View All Products <span>→</span>
                    </Link>
                </div>
            </div>




            {/* Footer */}

            <div className = "flex bg-gray-900 p-10 mt-30 flex-wrap">
            <div className = "mx-5 flex-grow">
                <h1 className = "text-gray-400 text-lg">ABOUT</h1>
                <div className = "space-y-1 mt-5 text-white flex flex-col font-bold text-md">
                    <a href = "#">Contact Us</a>
                    <a href = "#">About Us</a>
                    <a href = "#">Careers</a>
                    <a href = "#">e-Shop Stories</a>
                    <a href = "#">Corporate Information</a>
                </div>
            </div>

            <div className = "mx-7 flex-grow">
                <h1 className = "text-gray-400 text-lg">HELP</h1>
                <div className = "space-y-1 mt-5 text-white flex flex-col font-bold text-md">
                    <a href = "#">Payments</a>
                    <a href = "#">Shipping</a>
                    <a href = "#">Cancellation & Returns</a>
                    <a href = "#">FAQ</a>
                </div>
            </div>

            <div className = "mx-7 flex-grow">
                <h1 className = "text-gray-400 text-lg">CONSUMER POLICY</h1>
                <div className = "space-y-1 mt-5 text-white flex flex-col font-bold text-md">
                    <a href = "#">Cancellation & Returns</a>
                    <a href = "#">Terms Of Use</a>
                    <a href = "#">Security</a>
                    <a href = "#">Privacy</a>
                </div>
            </div>

            <div className = "mx-7 flex-grow">
                <h1 className = "text-gray-400 text-lg">MAIL US</h1>
                <div className = "space-y-1 mt-5 text-white flex flex-col font-bold text-md">
                    <a href = "#">E-Shop Corporate Office</a>
                    <a href = "#">Bengaluru</a>
                    <a href = "#">Hyderabad</a>
                    <a href = "#">New Delhi</a>
                </div>
            </div>

            <div className = "mx-7 flex-grow">
                <h1 className = "text-gray-400 text-lg">MAKE MONEY WITH US</h1>
                <div className = "space-y-1 mt-5 text-white flex flex-col font-bold text-md">
                    <a href = "#">Sell On e-Shop</a>
                    <a href = "#">Become a Logistic Partner</a>
                    <a href = "#">Become a delivery Partner</a>
                </div>
            </div>
            </div>
        </>
    )
};



export default Home;
