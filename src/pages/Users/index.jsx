import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';

import Button from '~/components/Button';
import styles from './styles.module.scss';
import UserTable from '~/components/Tables/UserTable';

const Users = () => {
    const { users } = useSelector((state) => state.users);

    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1>
                    Users <PeopleAltIcon />
                </h1>
                <Link to='/users/new'>
                    <Button startIcon={<AddIcon />} label='Add new user' />
                </Link>
            </div>
            <UserTable users={users} />
        </div>
    );
};

export default Users;
