import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Joi from 'joi';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';

import TextField from '~/components/Inputs/TextField';
import CheckboxInput from '~/components/Inputs/Checkbox';
import Button from '~/components/Button';
import { login } from '~/redux/authSlice/apiCall';
import logo from '~/assets/images/black_logo.svg';
import styles from './styles.module.scss';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const { isFetching } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleInputState = (name, value) => {
        setData({ ...data, [name]: value });
    };

    const handleErrorState = (name, value) => {
        value === '' ? delete errors[name] : setErrors({ ...errors, [name]: value });
    };

    const schema = {
        email: Joi.string().email({ tlds: false }).required().label('Email'),
        password: Joi.string().required().label('Password'),
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            login(data, dispatch);
        } else {
            console.log('Please fill out properly.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo_container}>
                <Link to='/'>
                    <img src={logo} alt='logo' />
                </Link>
            </div>
            <main className={styles.main}>
                <h1 className={styles.heading}>To continue, log in to Spotify.</h1>
                <button className={styles.contained_btn} style={{ background: '#3b5998' }}>
                    <FacebookRoundedIcon /> continue with facebook
                </button>
                <button className={styles.contained_btn} style={{ background: 'var(--black)' }}>
                    <AppleIcon />
                    continue with apple
                </button>
                <button className={styles.outline_btn}>
                    <GoogleIcon /> continue with google
                </button>
                <button className={styles.outline_btn}>Continue with phone number</button>
                <p className={styles.or_container}>or</p>
                <form onSubmit={handleSubmit} className={styles.form_container}>
                    <div className={styles.input_container}>
                        <TextField
                            label='Email'
                            placeholder='Enter your email'
                            name='email'
                            value={data.email}
                            schema={schema.email}
                            error={errors.email}
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            required
                        />
                    </div>
                    <div className={styles.input_container}>
                        <TextField
                            label='Password'
                            placeholder='Enter your password'
                            name='password'
                            type='password'
                            value={data.password}
                            schema={schema.password}
                            error={errors.password}
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            required
                        />
                    </div>
                    <p className={styles.forgot_password}>Forgot your password?</p>
                    <div className={styles.form_bottom}>
                        <CheckboxInput label='Remember me' />
                        <Button
                            type='submit'
                            label='LOG IN'
                            isFetching={isFetching}
                            style={{ color: 'white', background: 'var(--dark-green)' }}
                        />
                    </div>
                </form>
                <h1 className={styles.dont_have_account}>Don't have an account</h1>
                <Link to='/signup'>
                    <button className={styles.outline_btn}>sign up for spotify</button>
                </Link>
            </main>
        </div>
    );
};

export default Login;
