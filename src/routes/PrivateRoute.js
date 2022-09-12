import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ user }) => {
    return user && user.isAdmin ? <Outlet /> : <Navigate to='/login' replace />;
};

export default PrivateRoutes;
