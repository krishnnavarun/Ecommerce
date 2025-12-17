import { Navigate } from "react-router";
import { toast } from "react-toastify";

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
        toast.error('Please login to access this page');
        return <Navigate to="/login" />;
    }
    
    if (user.role !== 'admin') {
        toast.error('Admin access required');
        return <Navigate to="/" />;
    }
    
    return children;
};

export default PrivateRoute;