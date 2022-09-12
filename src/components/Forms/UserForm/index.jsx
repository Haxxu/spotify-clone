import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';
import { Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { createUser, updateUser } from '~/redux/usersSlice/apiCalls';
import Button from '~/components/Button';
import TextField from '~/components/Inputs/TextField';
import Select from '~/components/Inputs/Select';
import Radio from '~/components/Inputs/Radio';
import styles from './styles.module.scss';

const months = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'Apirl', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'Augest', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
];

const genders = ['male', 'female', 'non-binary'];

const UserForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        month: '',
        year: '',
        date: '',
        gender: '',
    });
    const [errors, setErrors] = useState({});
    const { users, createUserProgress, updateUserProgress } = useSelector((state) => state.users);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputState = (name, value) => {
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleErrorState = (name, value) => {
        value === '' ? delete errors[name] : setErrors((prev) => ({ ...prev, [name]: value }));
    };

    const schema = {
        email: Joi.string().email({ tlds: false }).required().label('Email'),
        password: passwordComplexity().required().label('Password'),
        name: Joi.string().min(3).max(15).required().label('Name'),
    };

    useEffect(() => {
        if (id !== 'new' && users) {
            const user = users.filter((user) => user._id === id);
            setData({
                email: user[0].email,
                name: user[0].name,
                month: user[0].month,
                year: user[0].year,
                date: user[0].date,
                gender: user[0].gender,
            });
        }
    }, [id, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            if (id !== 'new') {
                const res = await updateUser(id, data, dispatch);
                res && navigate('/users');
                window.location.reload();
            } else {
                const res = await createUser(data, dispatch);
                res && navigate('/users');
                window.location.reload();
            }
        } else {
            console.log('Please fill out properly');
        }
    };

    return (
        <div className={styles.container}>
            <Paper className={styles.form_container}>
                <h1 className={styles.heading}>
                    {id === 'new' ? 'Adding new user' : 'Edit user'}
                    <PersonIcon />
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.input_container}>
                        <TextField
                            label="What's your email?"
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
                    {id === 'new' && (
                        <div className={styles.input_container}>
                            <TextField
                                label='Create a password'
                                placeholder='Create a password'
                                type='password'
                                name='password'
                                schema={schema.password}
                                value={data.password}
                                error={errors.password}
                                handleInputState={handleInputState}
                                handleErrorState={handleErrorState}
                                required
                            />
                        </div>
                    )}
                    <div className={styles.input_container}>
                        <TextField
                            label='What should we call you?'
                            placeholder='Enter a profile name'
                            name='name'
                            schema={schema.name}
                            value={data.name}
                            error={errors.name}
                            handleInputState={handleInputState}
                            handleErrorState={handleErrorState}
                            required={true}
                        />
                    </div>
                    <div className={styles.date_of_birth_container}>
                        <p>What's your date of birth?</p>
                        <div className={styles.date_of_birth}>
                            <div className={styles.month}>
                                <Select
                                    name='month'
                                    handleInputState={handleInputState}
                                    label='Month'
                                    placeholder='Months'
                                    options={months}
                                    value={data.month}
                                    required={true}
                                />
                            </div>
                            <div className={styles.date}>
                                <TextField
                                    label='Date'
                                    placeholder='DD'
                                    name='date'
                                    value={data.date}
                                    handleInputState={handleInputState}
                                    required={true}
                                />
                            </div>
                            <div className={styles.year}>
                                <TextField
                                    label='Year'
                                    placeholder='YYYY'
                                    name='year'
                                    value={data.year}
                                    handleInputState={handleInputState}
                                    required={true}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.input_container}>
                        <Radio
                            label="What's your gender?"
                            name='gender'
                            handleInputState={handleInputState}
                            options={genders}
                            value={data.gender}
                            required={true}
                        />
                    </div>
                    <Button
                        type='submit'
                        label={id === 'new' ? 'Submit' : 'Update'}
                        isFetching={id === 'new' ? createUserProgress : updateUserProgress}
                        style={{ marginLeft: 'auto' }}
                    />
                </form>
            </Paper>
        </div>
    );
};

export default UserForm;
