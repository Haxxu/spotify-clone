import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

import Playlists from '~/components/Playlists';
import axiosInstance from '~/redux/axiosInstance';
import styles from './styles.module.scss';
// import playlistImg from '~/assets/images/rock.jpg';

const Home = () => {
    const [firstPlaylists, setFirstPlaylists] = useState([]);
    const [secondPlaylists, setSecondPlaylists] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const getRandomPlaylists = async () => {
        try {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + '/playlists/random';
            const { data } = await axiosInstance.get(url);
            const arr1 = data.data.splice(0, 4);
            const arr2 = data.data;
            setFirstPlaylists(arr1);
            setSecondPlaylists(arr2);
            setIsFetching(false);
        } catch (error) {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        getRandomPlaylists();
    }, []);

    return (
        <>
            {isFetching ? (
                <div className={styles.progress_container}>
                    <CircularProgress style={{ color: 'var(--primary)' }} size='5rem' />
                </div>
            ) : (
                <div className={styles.container}>
                    <h1>Good afternoon</h1>
                    <div className={styles.playlists_container}>
                        <Playlists playlists={firstPlaylists} />
                    </div>
                    <h1>Just the hits</h1>
                    <div className={styles.playlists_container}>
                        <Playlists playlists={secondPlaylists} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
