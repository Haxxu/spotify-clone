import { toast } from 'react-toastify';

import axiosInstance from '~/redux/axiosInstance';
import * as actions from './index';

const apiUrl = process.env.REACT_APP_API_URL + '/playlists';

export const createPlaylist = async (payload, dispatch) => {
    dispatch(actions.createPlaylistStart());
    try {
        const { data } = await axiosInstance.post(apiUrl, payload);
        dispatch(actions.createPlaylistSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.createPlaylistFailure());
        return false;
    }
};

export const addSongToPlaylist = async (payload, dispatch) => {
    dispatch(actions.addSongStart());
    try {
        const { data } = await axiosInstance.put(apiUrl + '/add-song', payload);
        dispatch(actions.addSongSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.addSongFailure());
        return false;
    }
};

export const removeSongFromPlaylist = async (payload, dispatch) => {
    dispatch(actions.removeSongStart());
    try {
        const { data } = await axiosInstance.put(apiUrl + '/remove-song', payload);
        dispatch(actions.removeSongSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.removeSongFailure());
        return false;
    }
};

export const getPlaylists = async (dispatch) => {
    dispatch(actions.getPlaylistStart());
    try {
        const { data } = await axiosInstance.get(apiUrl + '/favourite');
        dispatch(actions.getPlaylistSuccess(data.data));
        return true;
    } catch (error) {
        dispatch(actions.getPlaylistFailure());
        return false;
    }
};

export const deletePlaylist = async (id, dispatch) => {
    dispatch(actions.deletePlaylistStart());
    try {
        const { data } = await axiosInstance.delete(apiUrl + '/' + id);
        dispatch(actions.deletePlaylistSuccess());
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.deletePlaylistFailure());
        return false;
    }
};
