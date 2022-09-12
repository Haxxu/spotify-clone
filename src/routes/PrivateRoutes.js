import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = ({ user }) => {
    const styles = {
        padding: '6rem 0 0 26rem',
        backgroundColor: 'var(--mini-black)',
        color: 'var(--white)',
        minHeight: 'calc(100vh - 6rem)',
    };

    return user ? (
        <div style={styles}>
            <Outlet />
        </div>
    ) : (
        <Navigate to='/login' />
    );
};

export default PrivateRoutes;
