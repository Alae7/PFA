import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../authContext/AuthContext';

const PrivateRoutes = ({ allowedRoles }) => {
    const auth = useAuth();

    if (auth.loading) {
        return <div>Loading...</div>;
    }

    if (!auth.isLoggedIn) {
        return <Navigate to="/" />;
    }

    const rol = auth.user?.role;

    if (!allowedRoles.includes(rol)) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoutes;