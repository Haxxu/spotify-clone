import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import TextField from '~/components/Inputs/TextField';
import FileInput from '~/components/Inputs/FileInput';
import Button from '~/components/Button';
import defaultImg from '~/assets/images/music.png';
import styles from './styles.module.scss';
import axiosInstance from '~/redux/axiosInstance';
import { toast } from 'react-toastify';

const PlaylistModel = ({ closeModel, playlist }) => {
    const [data, setData] = useState({
        name: '',
        description: '',
        img: '',
    });
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        setData({ name: playlist.name, description: playlist.description, img: playlist.img });
    }, [playlist]);

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsFetching(true);
            const url = process.env.REACT_APP_API_URL + `/playlists/edit/${playlist._id}`;
            const { data: res } = await axiosInstance.put(url, data);
            toast.success(res.message);
            setIsFetching(false);
            window.location.reload();
        } catch (error) {
            setIsFetching(false);
            console.log(error);
        }
    };

    return (
        <div className={styles.model_container}>
            <IconButton className={styles.close_btn} onClick={closeModel}>
                <CloseIcon />
            </IconButton>
            <div className={styles.form_container}>
                <h1>Edit Details</h1>
                <div className={styles.input_container}>
                    <TextField label='Name' name='name' value={data.name} handleInputState={handleInputState} />
                </div>
                <div className={styles.input_container}>
                    <TextField
                        label='Description'
                        name='description'
                        value={data.description}
                        handleInputState={handleInputState}
                    />
                </div>
                <div className={styles.input_container}>
                    <FileInput
                        label='Choose Image'
                        type='image'
                        name='img'
                        value={data.img === '' ? defaultImg : data.img}
                        handleInputState={handleInputState}
                    />
                </div>
                <Button
                    label='Submit'
                    style={{ position: 'absolute', bottom: '0', right: '0', margin: '1rem' }}
                    isFetching={isFetching}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
};

export default PlaylistModel;
