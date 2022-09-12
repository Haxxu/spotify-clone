import { Fragment, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getAllSongs } from '~/redux/songsSlice/apiCalls';
import { getAllUsers } from '~/redux/usersSlice/apiCalls';
import { getAllPlaylists } from '~/redux/playlistSlice/apiCalls';
import Login from '~/pages/Login';
import Users from '~/pages/Users';
import Songs from '~/pages/Songs';
import Navbar from '~/components/Navbar';
import Sidebar from '~/components/Sidebar';
import Dashboard from '~/components/Dashboard';
import UserForm from '~/components/Forms/UserForm';
import SongForm from '~/components/Forms/SongForm';

import PrivateRoutes from '~/routes/PrivateRoute';

function App() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = null;
        const root = JSON.parse(window.localStorage.getItem('persist:root'));

        if (root) {
            const { auth } = root;
            const { user } = JSON.parse(auth);
            if (user) token = user.token;
        }

        if (user && token) {
            getAllSongs(dispatch);
            getAllUsers(dispatch);
            getAllPlaylists(dispatch);
        }
    }, [dispatch, user]);

    return (
        <Fragment>
            {user && user.isAdmin && (
                <Fragment>
                    <Navbar />
                    <Sidebar />
                </Fragment>
            )}
            <main className='main'>
                <Routes>
                    <Route element={<PrivateRoutes user={user} />} />
                    {!user && <Route path='*' element={<Navigate to='/login' />} />}
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/songs/:id' element={<SongForm />} />
                    <Route path='/users/:id' element={<UserForm />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/songs' element={<Songs />} />
                </Routes>
            </main>
        </Fragment>
    );
}

export default App;
