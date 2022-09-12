import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/authSlice';
import { setCurrentSong } from '~/redux/audioPlayer';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(setCurrentSong(null));
        window.location = '/login';
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.icon}>
                    <ArrowBackIosRoundedIcon onClick={() => navigate(-1)} />
                </div>
                <div className={styles.icon}>
                    <ArrowForwardIosRoundedIcon onClick={() => navigate(1)} />
                </div>
            </div>
            <div className={styles.right}>
                <div
                    className={styles.profile_menu}
                    style={{ backgroundColor: `${menu ? 'var(--light-black)' : 'var(--black)'}` }}
                    onClick={() => setMenu(!menu)}
                >
                    <AccountCircleIcon />
                    <p>{user && user.name}</p>
                    {menu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </div>
            </div>
            {menu && (
                <ClickAwayListener onClickAway={() => setMenu(false)}>
                    <div className={styles.menu} onClick={() => setMenu(false)}>
                        <Link to='/me'>
                            <div className={styles.options}>
                                <p>Profile</p>
                                <PersonIcon />
                            </div>
                        </Link>
                        <div className={styles.options}>
                            <p>Settings</p>
                            <SettingsIcon />
                        </div>
                        <div className={styles.options} onClick={handleLogout}>
                            <p>Logout</p>
                            <LogoutIcon />
                        </div>
                    </div>
                </ClickAwayListener>
            )}
        </div>
    );
};

export default Navbar;
