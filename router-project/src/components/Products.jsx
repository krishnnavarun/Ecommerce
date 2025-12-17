import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
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
            const response = await fetch('http://localhost:3000/api/cart', {
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

    if (loading) {
        return <div className="text-center p-10">Loading products...</div>;
    }

    return(
        <>
        <div className = "m-10">
        <h1 className = "text-4xl font-bold hover:text-purple-700">Products</h1>
        <div className = "my-5">
            <div className = "flex space-x-4 space-y-4 flex-wrap">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className = "bg-white p-5 w-[17vw]">
                            <img src = {product.image} className = "h-[30vh] w-[20vw]"/>
                            <div className = "text-center my-3">
                                <h1 className = "text-2xl">{product.name}</h1>
                                <h1 className = "text-gray-900 text-xl font-bold">₹ {product.price} Only</h1>
                                <button 
                                    onClick={() => handleAddToCart(product)}
                                    className = "mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No products available</div>
                )}
            </div>
        </div>
        </div>
        </>
    );
};

export default Products;
