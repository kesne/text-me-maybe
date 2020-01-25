import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
// import { useHistory } from 'react-router-dom';
import { useMeQuery } from '../queries';
import HasUserContext from '../HasUserContext';

export default function UserButton() {
    // const history = useHistory();
    const { data, loading } = useMeQuery();
    const { setHasUser } = useContext(HasUserContext);

    // TODO: We can implement this better probably:
    function signOut() {
        setHasUser(false);
        // history.push('/');
    }

    if (loading || !data || !data.me) {
        return null;
    }

    return (
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }}>
            <Menu.SubMenu title={data.me.name}>
                <Menu.Item><Link to="/account">My account</Link></Menu.Item>
                <Menu.Item onClick={signOut}>Sign out</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    );
}
