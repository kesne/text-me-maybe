import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import UserButton from './UserButton';
import HasUserContext from '../HasUserContext';

export default function Header() {
    const { hasUser } = useContext(HasUserContext);

    return (
        <Layout.Header>
            <div style={{ float: 'left', color: 'white' }}>Text Me Maybe</div>

            <div style={{ float: 'right' }}>
                {hasUser ? (
                    <UserButton />
                ) : (
                    <Menu theme="dark" mode="horizontal" selectedKeys={[]} style={{ lineHeight: '64px' }}>
                        <Menu.Item>
                            <Link to="/signin">Sign In</Link>
                        </Menu.Item>
                    </Menu>
                )}
            </div>
        </Layout.Header>
    );
}
