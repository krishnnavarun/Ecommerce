import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { toast } from "react-toastify";

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const passwordRef = useRef('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name || !email || !passwordRef.current.value) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://13.51.161.113:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: passwordRef.current.value
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Registration successful! Please login');
                navigate('/login');
            } else {
                setError(data.error || 'Registration failed');
                toast.error(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Register error:', error);
            setError('Error registering. Please try again.');
            toast.error('Error registering. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="mt-10 w-[400px] flex flex-col justify-center items-center mx-auto mt-50 p-2 bg-white shadow-lg rounded-xl">
                <h1 className="font-bold text-4xl mb-5 pt-5">Register</h1>
                <input 
                    type="text" 
                    placeholder="Name" 
                    className="border m-3 p-2 rounded-[5px] w-[90%]"
                    value={name} 
                    onChange={handleNameChange} 
                />
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <p className="text-gray-600 mb-3 text-sm">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
                <Link to="/" className="text-blue-600 hover:underline mb-5">Home</Link>
            </div>
        </>
    )
}

export default RegisterForm;
