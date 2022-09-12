import { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import Song from '~/components/Song';
import likeImg from '~/assets/images/like.jpg';
import peaches from '~/assets/images/peaches.jpg';
import styles from './styles.module.scss';
import axiosInstance from '~/redux/axiosInstance';
import { CircularProgress } from '@mui/material';

const songs = [
    { _id: 1, img: peaches, name: 'Peaches', artist: 'Justin Beiber' },
    { _id: 1, img: peaches, name: 'To my younger self', artist: 'Britton' },
    { _id: 2, img: peaches, name: 'Liberated', artist: 'Britton' },
];

const LikedSongs = () => {
    const [songs, setSongs] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const { user } = useSelector((state) => state.user);

    const getLikedSongs = async () => {
        try {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + `/songs/like`;
            const { data } = await axiosInstance.get(url);
            setSongs(data.data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getLikedSongs();
        console.log(songs);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles.head_gradient}></div>
                <img src={likeImg} alt='liked songs' />
                <div className={styles.playlist_info}>
                    <p>Playlist</p>
                    <h1>Liked Songs</h1>
                    <span>By {user && user.name}</span>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.body_nav}>
                    <div className={styles.left}>
                        <span>#</span>
                        <p>Title</p>
                    </div>
                    <div className={styles.center}>
                        <p>Artist</p>
                    </div>
                    <div className={styles.right}>
                        <AccessTimeIcon />
                    </div>
                </div>
                {isFetching ? (
                    <div className={styles.progress_container}>
                        <CircularProgress style={{ color: 'var(--primary)' }} size='5rem' />
                    </div>
                ) : (
                    <>
                        {songs.map((song) => (
                            <Fragment key={song._id}>
                                {user.likedSongs.indexOf(song._id) !== -1 && <Song song={song} />}
                            </Fragment>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default LikedSongs;
