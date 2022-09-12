import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PeopleIcon from '@mui/icons-material/People';
import { ExitToApp } from '@mui/icons-material';

import { logout } from '~/redux/authSlice';
import styles from './styles.module.scss';

const options = [
    { name: 'dashboard', path: '/', icon: <DashboardIcon /> },
    { name: 'users', path: '/users', icon: <PeopleIcon /> },
    { name: 'songs', path: '/songs', icon: <MusicNoteIcon /> },
];

const Sidebar = () => {
    const dispatch = useDispatch();

    const checkActiveClass = ({ isActive }) =>
        [styles.option, isActive ? styles.sidebar_active : null].filter(Boolean).join(' ');

    const handleLogout = () => {
        dispatch(logout());
        window.location = '/login';
    };

    return (
        <div className={styles.sidebar}>
            <h1 className={styles.logo}>Admin panel</h1>
            <ul>
                {options.map((option) => (
                    <li key={option.name}>
                        <NavLink
                            className={checkActiveClass}
                            // exact={option.path === '/' ? true : false}
                            to={option.path}
                        >
                            {option.icon}
                            <span>{option.name}</span>
                        </NavLink>
                    </li>
                ))}
                <li className={styles.logout_link} onClick={handleLogout}>
                    <div className={styles.option}>
                        <ExitToApp />
                        <span>Logout</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};
export default Sidebar;
