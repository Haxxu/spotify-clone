import { useDispatch, useSelector } from 'react-redux';
import { ClickAwayListener } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { addSongToPlaylist } from '~/redux/playlistSlice/apiCall';
import styles from './styles.module.scss';

const PlaylistMenu = ({ closeMenu, playlist, song, handleRemoveSong }) => {
    const { playlists } = useSelector((state) => state.playlists);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleAddToPlaylist = (playlistId, songId) => {
        const payload = {
            playlistId,
            songId,
        };
        addSongToPlaylist(payload, dispatch);
    };

    return (
        <ClickAwayListener onClickAway={closeMenu}>
            <div className={styles.menu} onClick={closeMenu}>
                <div className={styles.playlist_option}>
                    <p>Add to Playlist</p>
                    <>
                        <ArrowRightIcon />
                        <div className={styles.playlists}>
                            {playlists.map((playlist) => (
                                <div
                                    className={styles.option}
                                    key={playlist._id}
                                    onClick={() => handleAddToPlaylist(playlist._id, song._id)}
                                >
                                    <p>{playlist.name}</p>
                                </div>
                            ))}
                        </div>
                    </>
                </div>

                {playlist && playlist.user === user._id && (
                    <div className={styles.option}>
                        <p onClick={() => handleRemoveSong(song._id)}>Remove from Playlist</p>
                    </div>
                )}
                <div className={styles.option}>
                    <p>Go to artist</p>
                </div>
                <div className={styles.option}>
                    <p>Share</p>
                </div>
            </div>
        </ClickAwayListener>
    );
};

export default PlaylistMenu;
