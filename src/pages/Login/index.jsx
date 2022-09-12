import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Joi from 'joi';
import { Paper } from '@mui/material';

import { login } from '~/redux/authSlice/apiCalls';
import TextField from '~/components/Inputs/TextField';
import Button from '~/components/Button';
import styles from './styles.module.scss';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const { isFetching } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const schema = {
        email: Joi.string().email({ tlds: false }).required().label('Email'),
        password: Joi.string().required().label('Password'),
    };

    const handleInputState = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handleErrorState = (name, value) => {
        value === '' ? delete errors[name] : setErrors({ ...errors, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            login(data, dispatch);
        } else {
            console.log('Please fill out properly');
        }
    };

    return (
        <div className={styles.container}>
            <Paper className={styles.form_container}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.heading}>Login</div>
                    <div className={styles.input_container}>
                        <TextField
                            label='Email'
                            placeholder='Enter your email'
                            name='email'
                            value={data.email}
                            error={errors.email}
                            schema={schema.email}
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            required
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TextField
                            name='password'
                            label='Password'
                            placeholder='Enter your password'
                            value={data.password}
                            error={errors.password}
                            schema={schema.password}
                            type='password'
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            required
                        />
                    </div>
                    <div className={styles.btn_wrapper}>
                        <Button type='submit' label='Submit' isFetching={isFetching} />
                    </div>
                </form>
            </Paper>
        </div>
    );
};

export default Login;
