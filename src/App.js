import { Fragment, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Main from '~/pages/Main';
import SignUp from '~/pages/SignUp';
import Login from '~/pages/Login';
import NotFound from './pages/NotFound';
import Home from '~/pages/Home';
import Library from '~/pages/Library';
import Playlist from '~/pages/Playlist';
import Search from '~/pages/Search';
import LikedSongs from '~/pages/LikedSongs';
import Profile from '~/pages/Profile';

import Sidebar from '~/components/Sidebar';
import Navbar from '~/components/Navbar';
import AudioPlayer from '~/components/AudioPlayer';
import PrivateRoutes from '~/routes/PrivateRoutes';
import { getUser } from '~/redux/userSlice/apiCall';
import { getPlaylists } from '~/redux/playlistSlice/apiCall';

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);
    const { currentSong } = useSelector((state) => state.audioPlayer);

    useEffect(() => {
        let token = null;
        const root = JSON.parse(window.localStorage.getItem('persist:root'));

        if (root) {
            const { auth } = root;
            const { user } = JSON.parse(auth);
            if (user) token = user.token;
        }

        if (user && token) {
            getUser(user._id, dispatch);
            getPlaylists(dispatch);
        }
    }, [dispatch, user]);

    return (
        <Fragment>
            {user &&
                location.pathname !== '/login' &&
                location.pathname !== '/' &&
                location.pathname !== '/signup' &&
                location.pathname !== '/not-found' && (
                    <Fragment>
                        <Navbar />
                        <Sidebar />
                        {currentSong && <AudioPlayer />}
                    </Fragment>
                )}

            <Routes>
                <Route exact path='/' element={<Main />} />
                <Route element={<PrivateRoutes user={user} />}>
                    <Route path='/collection/tracks' element={<LikedSongs user={user} />} />
                    <Route path='/collection/playlists' element={<Library user={user} />} />
                    <Route path='/search' element={<Search user={user} />} />
                    <Route path='/playlist/:id' element={<Playlist user={user} />} />
                    <Route path='/me' element={<Profile user={user} />} />
                    <Route path='/home' element={<Home user={user} />} />
                </Route>
                {user && <Route path='/signup' element={<Navigate to='/home' replace />} />}
                {user && <Route path='/login' element={<Navigate to='/home' replace />} />}
                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<Login />} />
                <Route path='/not-found' element={<NotFound />} />
            </Routes>
        </Fragment>
    );
};

export default App;
