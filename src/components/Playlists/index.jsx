import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

const Playlists = ({ playlists }) => {
    return (
        <>
            {playlists.map((playlist) => (
                <Link key={playlist._id} to={`/playlist/${playlist._id}`}>
                    <div className={styles.playlist}>
                        {playlist.img === '' ? (
                            <img
                                src='https://static.thenounproject.com/png/17849-200.png'
                                alt={playlist.name}
                                style={{ background: 'var(--light-white)' }}
                            />
                        ) : (
                            <img src={playlist.img} alt={playlist.name} />
                        )}
                        <p>{playlist.name}</p>
                        <span>{playlist.description}</span>
                    </div>
                </Link>
            ))}
        </>
    );
};

export default Playlists;
