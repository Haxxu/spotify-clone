import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from './styles.module.scss';
import { likeSong } from '~/redux/userSlice/apiCall';

const Like = ({ songId }) => {
    const { user, likeSongProgress } = useSelector((state) => state.user);
    const [progress, setProgress] = useState(false);
    const dispatch = useDispatch();

    const handleLikeSong = async (songid) => {
        setProgress(true);
        const res = await likeSong(songId, dispatch);
        res && setProgress(false);
    };

    return (
        <IconButton className={styles.like_btn} onClick={() => handleLikeSong(songId)}>
            {likeSongProgress && progress ? (
                <CircularProgress style={{ color: 'var(--primary)' }} size='2rem' />
            ) : (
                <>
                    {user && user.likedSongs.indexOf(songId) === -1 ? (
                        <FavoriteBorderIcon className={styles.like_outlined} />
                    ) : (
                        <FavoriteIcon className={styles.like_filled} />
                    )}
                </>
            )}
        </IconButton>
    );
};

export default Like;
