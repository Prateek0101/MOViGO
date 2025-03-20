import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({Children}) => {
    const{ user } = useAuth();
    return user ? Children : <navigate to = '/login' />; 
} 

export default ProtectedRoute; 