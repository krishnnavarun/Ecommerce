import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { toast } from "react-toastify";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const passwordRef = useRef('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://13.51.161.113:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: passwordRef.current.value
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                // Migrate guest cart to server cart if it exists
                const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
                if (guestCart.length > 0) {
                    for (const item of guestCart) {
                        await fetch('http://13.51.161.113:3000/api/cart', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${data.token}`
                            },
                            body: JSON.stringify({
                                productId: item.productId,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                quantity: item.quantity
                            })
                        });
                    }
                    // Clear guest cart after migrating
                    localStorage.removeItem('guestCart');
                }
                
                toast.success('Login successful!');
                navigate('/');
            } else {
                setError(data.error || 'Login failed');
                toast.error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Error logging in. Please try again.');
            toast.error('Error logging in. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mt-10 w-[400px] flex flex-col justify-center items-center mx-auto mt-50 p-2 bg-white shadow-lg rounded-xl">
                <h1 className="font-bold text-4xl mb-5 pt-5">Login</h1>
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="border m-3 p-2 rounded-[5px] w-[90%]"
                    value={email} 
                    onChange={handleEmailChange} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="border m-3 p-2 rounded-[5px] my-5 w-[90%]"
                    ref={passwordRef} 
                />
                {error && <p className="text-red-500 text-lg">{error}</p>}
                <button 
                    className="bg-blue-600 text-white text-lg px-5 py-2 mt-3 rounded-lg mb-4 hover:shadow-lg disabled:bg-gray-400"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="text-gray-600 mb-3 text-sm">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
                <Link to="/" className="text-blue-600 hover:underline mb-5">Home</Link>
            </div>
        </>
    )
}

export default LoginForm;