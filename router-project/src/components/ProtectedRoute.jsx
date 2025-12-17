import { Navigate } from "react-router";
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        toast.error('Please login to continue');
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default ProtectedRoute;