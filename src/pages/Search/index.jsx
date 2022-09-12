import { useState, Fragment } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import Song from '~/components/Song';
import Playlists from '~/components/Playlists';
import axiosInstance from '~/redux/axiosInstance';
import styles from './styles.module.scss';

const Search = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    const handleSearch = async ({ currentTarget: input }) => {
        setSearch(input.value);
        setResults({});
        try {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + `/?search=${input.value}`;
            const { data } = await axiosInstance.get(url);
            setResults(data);
            console.log(data);
            setIsFetching(false);
        } catch (error) {
            console.log(error);
            setIsFetching(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.search_input_container}>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <input
                    type='text'
                    placeholder='Search for songs, artists and playlists'
                    value={search}
                    onChange={handleSearch}
                />
                <IconButton onClick={() => setSearch('')}>
                    <ClearIcon />
                </IconButton>
            </div>
            {isFetching && (
                <div className={styles.progress_container}>
                    <CircularProgress style={{ color: 'var(--primary)' }} size='5rem' />
                </div>
            )}
            {Object.keys(results)?.length !== 0 && (
                <div className={styles.results_container}>
                    {results.songs?.length !== 0 && (
                        <div className={styles.songs_container}>
                            {results.songs.map((song) => (
                                <Fragment key={song._id}>
                                    <Song song={song} />
                                </Fragment>
                            ))}
                        </div>
                    )}
                    {results.playlists?.length !== 0 && (
                        <div className={styles.playlists_container}>
                            <Playlists playlists={results.playlists} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Search;
