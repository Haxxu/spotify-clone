import { toast } from 'react-toastify';

import * as actions from './index';
import axiosInstance from '~/redux/axiosInstance';

const apiUrl = process.env.REACT_APP_API_URL;

export const createUser = async (user, dispatch) => {
    dispatch(actions.createUserStart());
    try {
        const { data } = await axiosInstance.post(apiUrl + '/users', user);
        dispatch(actions.createUserSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.createUserFailure());
        return false;
    }
};

export const getAllUsers = async (dispatch) => {
    dispatch(actions.getUsersStart());
    try {
        const { data } = await axiosInstance.get(apiUrl + '/users');
        dispatch(actions.getUsersSuccess(data.data));
        return true;
    } catch (error) {
        dispatch(actions.getUsersFailure());
        return false;
    }
};

export const updateUser = async (id, user, dispatch) => {
    dispatch(actions.updateUserStart());
    try {
        const { data } = await axiosInstance.put(apiUrl + `/users/${id}`, user);
        dispatch(actions.updateUserSuccess(data.data));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.updateUserFailure());
        return false;
    }
};

export const deleteUser = async (id, dispatch) => {
    dispatch(actions.deleteUserStart());
    try {
        const { data } = await axiosInstance.delete(apiUrl + `/users/${id}`);
        dispatch(actions.deleteUserSuccess(id));
        toast.success(data.message);
        return true;
    } catch (error) {
        dispatch(actions.deleteUserFailure());
        return false;
    }
};
