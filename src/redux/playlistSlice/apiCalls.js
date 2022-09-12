import axiosInstance from '~/redux/axiosInstance';
import * as actions from './index';

const apiUrl = process.env.REACT_APP_API_URL;

export const getAllPlaylists = async (dispatch) => {
    dispatch(actions.getAllPlaylistsStart());
    try {
        const { data } = await axiosInstance.get(apiUrl + '/playlists');
        dispatch(actions.getAllPlaylistsSuccess(data.data));
        return true;
    } catch (error) {
        dispatch(actions.getAllPlaylistsFailure());
        return false;
    }
};
