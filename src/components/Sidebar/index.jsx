import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';

import { createPlaylist } from '~/redux/playlistSlice/apiCall';
import logo from '~/assets/images/white_logo.svg';
import likeImg from '~/assets/images/like.jpg';
import styles from './styles.module.scss';

const Sidebar = () => {
    const { playlists, getPlaylistProgress, createPlaylistProgress } = useSelector((state) => state.playlists);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const checkActiveLinkClass = ({ isActive }) =>
        [styles.menu_link, isActive ? styles.active_menu : null].filter(Boolean).join(' ');

    const checkActivePlaylistClass = ({ isActive }) =>
        [styles.playlist_link, isActive ? styles.active_link : null].filter(Boolean).join(' ');

    const handleCreatePlaylist = () => {
        const data = {
            name: 'My Playlist #' + (playlists.length + 1),
            user: user._id,
            description: 'By ' + user.name,
            songs: [],
            img: '',
        };
        createPlaylist(data, dispatch);
    };

    return (
        <div className={styles.container}>
            <Link to='/home'>
                <img className={styles.logo_img} src={logo} alt='logo' />
            </Link>
            <NavLink to='/home' className={checkActiveLinkClass}>
                <HomeIcon />
                <span>Home</span>
            </NavLink>
            <NavLink to='/search' className={checkActiveLinkClass}>
                <SearchIcon />
                <span>Search</span>
            </NavLink>
            <NavLink to='/collection/playlists' className={checkActiveLinkClass}>
                <LibraryMusicIcon />
                <span>Your Library</span>
            </NavLink>

            <div className={styles.create_playlist_btn} onClick={handleCreatePlaylist}>
                <AddIcon />
                <span>Create Playlist</span>
            </div>
            <NavLink to='/collection/tracks' className={checkActiveLinkClass}>
                <img src={likeImg} alt='jfo' />
                <span>Liked Songs</span>
            </NavLink>

            <div className={styles.underline}></div>
            {getPlaylistProgress || createPlaylistProgress ? (
                <div className={styles.progress_container}>
                    <CircularProgress style={{ color: 'var(--primary)' }} size='3rem' />
                </div>
            ) : (
                <>
                    {playlists.map((playlist) => (
                        <NavLink
                            key={playlist._id}
                            to={`/playlist/${playlist._id}`}
                            className={checkActivePlaylistClass}
                        >
                            {playlist.name}
                        </NavLink>
                    ))}
                </>
            )}
        </div>
    );
};

export default Sidebar;
